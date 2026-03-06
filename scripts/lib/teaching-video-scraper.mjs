const BILIBILI_TITLE_SUFFIX = /_哔哩哔哩_bilibili$/u;

const GENERIC_KEYWORDS = new Set([
  'bilibili',
  '哔哩哔哩',
  'b站',
  '视频',
  '视频教程',
  '教学视频',
  '弹幕',
]);

const keywordCollator = new Intl.Collator('zh-CN', {
  numeric: true,
  sensitivity: 'base',
});

function decodeHtmlEntities(value) {
  if (!value) {
    return '';
  }

  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (entity, token) => {
    if (token[0] === '#') {
      const isHex = token[1]?.toLowerCase() === 'x';
      const codePoint = Number.parseInt(token.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint);
    }

    switch (token) {
      case 'amp':
        return '&';
      case 'lt':
        return '<';
      case 'gt':
        return '>';
      case 'quot':
        return '"';
      case 'apos':
        return "'";
      case 'nbsp':
        return ' ';
      default:
        return entity;
    }
  });
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/gu, ' ').trim();
}

function parseTagAttributes(tagSource) {
  const attributes = {};

  tagSource.replace(/([:\w-]+)\s*=\s*("([^"]*)"|'([^']*)')/gu, (_, name, _quoted, doubleQuoted, singleQuoted) => {
    attributes[name.toLowerCase()] = decodeHtmlEntities(doubleQuoted ?? singleQuoted ?? '').trim();
    return '';
  });

  return attributes;
}

function findTagAttributes(html, tagName, predicate) {
  const tagPattern = new RegExp(`<${tagName}\\b[^>]*>`, 'giu');

  for (const match of html.matchAll(tagPattern)) {
    const attributes = parseTagAttributes(match[0]);
    if (predicate(attributes)) {
      return attributes;
    }
  }

  return null;
}

function extractTagText(html, tagName) {
  const match = html.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)</${tagName}>`, 'iu'));
  if (!match) {
    return null;
  }

  return normalizeWhitespace(decodeHtmlEntities(match[1]));
}

function extractMetaContent(html, predicate) {
  const attributes = findTagAttributes(html, 'meta', (candidate) => candidate.content && predicate(candidate));
  return attributes?.content ?? null;
}

function extractCanonicalHref(html) {
  const attributes = findTagAttributes(
    html,
    'link',
    (candidate) => candidate.rel?.toLowerCase() === 'canonical' && candidate.href,
  );

  return attributes?.href ?? null;
}

function stripBilibiliTitleSuffix(value) {
  return normalizeWhitespace(value.replace(BILIBILI_TITLE_SUFFIX, ''));
}

function normalizeHref(value) {
  if (!value) {
    return null;
  }

  if (value.startsWith('//')) {
    return `https:${value}`;
  }

  if (value.startsWith('http://')) {
    return value.replace(/^http:\/\//u, 'https://');
  }

  return value;
}

function normalizeDateString(value) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  const explicitDateMatch = trimmed.match(/^(\d{4}-\d{2}-\d{2})/u);
  if (explicitDateMatch) {
    return explicitDateMatch[1];
  }

  const parsedDate = new Date(trimmed);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toISOString().slice(0, 10);
}

function normalizeUnixDate(value) {
  if (!Number.isFinite(value)) {
    return null;
  }

  return new Date(value * 1000).toISOString().slice(0, 10);
}

function extractJsonAssignment(html, variableName) {
  const marker = `${variableName}=`;
  const markerIndex = html.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  const objectStart = html.indexOf('{', markerIndex + marker.length);
  if (objectStart === -1) {
    return null;
  }

  let depth = 0;
  let stringQuote = null;
  let escaped = false;

  for (let index = objectStart; index < html.length; index += 1) {
    const character = html[index];

    if (stringQuote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (character === '\\') {
        escaped = true;
        continue;
      }

      if (character === stringQuote) {
        stringQuote = null;
      }

      continue;
    }

    if (character === '"' || character === "'" || character === '`') {
      stringQuote = character;
      continue;
    }

    if (character === '{') {
      depth += 1;
      continue;
    }

    if (character === '}') {
      depth -= 1;

      if (depth === 0) {
        return html.slice(objectStart, index + 1);
      }
    }
  }

  return null;
}

function extractInitialState(html) {
  const payload = extractJsonAssignment(html, 'window.__INITIAL_STATE__');
  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

function normalizeKeywords(rawKeywords, title, creator) {
  if (!rawKeywords) {
    return [];
  }

  const blockedKeywords = new Set(
    [title, creator].filter(Boolean).map((value) => normalizeWhitespace(value).toLowerCase()),
  );

  const seen = new Set();

  return rawKeywords
    .split(/[，,]/u)
    .map((keyword) => normalizeWhitespace(keyword))
    .filter(Boolean)
    .filter((keyword) => {
      const lowerKeyword = keyword.toLowerCase();
      if (GENERIC_KEYWORDS.has(lowerKeyword) || blockedKeywords.has(lowerKeyword)) {
        return false;
      }

      if (seen.has(lowerKeyword)) {
        return false;
      }

      seen.add(lowerKeyword);
      return true;
    })
    .sort((left, right) => keywordCollator.compare(left, right));
}

function inferEpisodeCount(description, initialState) {
  const fromInitialState =
    initialState?.videoData?.videos ??
    initialState?.videoData?.pages?.length ??
    initialState?.videoData?.ugc_season?.sections?.reduce((total, section) => {
      const episodeTotal = Array.isArray(section?.episodes) ? section.episodes.length : 0;
      return total + episodeTotal;
    }, 0);

  if (Number.isInteger(fromInitialState) && fromInitialState > 1) {
    return fromInitialState;
  }

  const descriptionMatch = description?.match(/共计?\s*(\d+)\s*条视频/u);
  if (descriptionMatch) {
    return Number.parseInt(descriptionMatch[1], 10);
  }

  return null;
}

export function extractBilibiliVideoMetadata(html, sourceUrl) {
  const initialState = extractInitialState(html);
  const videoData = initialState?.videoData ?? {};

  const metaTitle =
    extractMetaContent(
      html,
      (attributes) =>
        attributes.itemprop?.toLowerCase() === 'name' || attributes.name?.toLowerCase() === 'title',
    ) ?? extractTagText(html, 'title');

  const title = normalizeWhitespace(
    videoData.title || (metaTitle ? stripBilibiliTitleSuffix(metaTitle) : ''),
  );
  const creator = normalizeWhitespace(
    videoData.owner?.name ||
      extractMetaContent(
        html,
        (attributes) =>
          attributes.itemprop?.toLowerCase() === 'author' || attributes.name?.toLowerCase() === 'author',
      ) ||
      '',
  );

  const description = normalizeWhitespace(
    videoData.desc ||
      extractMetaContent(
        html,
        (attributes) =>
          attributes.itemprop?.toLowerCase() === 'description' ||
          attributes.name?.toLowerCase() === 'description',
      ) ||
      '',
  );

  const publishedAt =
    normalizeUnixDate(videoData.pubdate) ||
    normalizeDateString(
      extractMetaContent(
        html,
        (attributes) =>
          attributes.itemprop?.toLowerCase() === 'uploaddate' ||
          attributes.itemprop?.toLowerCase() === 'datepublished',
      ),
    );

  const href = normalizeHref(
    extractCanonicalHref(html) ||
      (videoData.bvid ? `https://www.bilibili.com/video/${videoData.bvid}/` : sourceUrl),
  );

  const thumbnailUrl = normalizeHref(
    videoData.pic ||
      extractMetaContent(html, (attributes) => attributes.itemprop?.toLowerCase() === 'image'),
  );
  const keywords = normalizeKeywords(
    extractMetaContent(
      html,
      (attributes) =>
        attributes.itemprop?.toLowerCase() === 'keywords' || attributes.name?.toLowerCase() === 'keywords',
    ) || '',
    title,
    creator,
  );

  const metadata = {
    title,
    creator,
    publishedAt,
    href,
    description,
    thumbnailUrl,
    keywords,
    episodeCount: inferEpisodeCount(description, initialState),
  };

  for (const [fieldName, value] of Object.entries({
    title: metadata.title,
    creator: metadata.creator,
    publishedAt: metadata.publishedAt,
    href: metadata.href,
  })) {
    if (!value) {
      throw new Error(`Missing required Bilibili metadata field "${fieldName}" for ${sourceUrl}.`);
    }
  }

  return metadata;
}

export async function fetchBilibiliVideoMetadata(sourceUrl, fetchImpl = fetch) {
  const response = await fetchImpl(sourceUrl, {
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${sourceUrl}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  return extractBilibiliVideoMetadata(html, sourceUrl);
}
