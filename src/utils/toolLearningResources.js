import {teachingVideoCatalog} from '@site/src/data/teachingVideos';

function sortResources(items) {
  return [...items].sort((left, right) => {
    if (right.featuredScore !== left.featuredScore) {
      return right.featuredScore - left.featuredScore;
    }

    return right.publishedAt.localeCompare(left.publishedAt, 'zh-CN');
  });
}

function uniqueByCourse(items) {
  const seen = new Set();

  return items.filter((item) => {
    if (seen.has(item.courseId)) {
      return false;
    }

    seen.add(item.courseId);
    return true;
  });
}

function normalizeToolCandidates(toolOrTools) {
  const rawTools = Array.isArray(toolOrTools) ? toolOrTools : [toolOrTools];
  const seen = new Set();

  return rawTools.filter((tool) => {
    if (typeof tool !== 'string' || tool.trim() === '') {
      return false;
    }

    if (seen.has(tool)) {
      return false;
    }

    seen.add(tool);
    return true;
  });
}

export function getToolTeachingVideoResourceSet(toolOrTools, limit = 4) {
  if (!Number.isInteger(limit) || limit < 1) {
    return {
      sourceTool: null,
      items: [],
    };
  }

  const candidates = normalizeToolCandidates(toolOrTools);

  for (const tool of candidates) {
    const filteredItems = teachingVideoCatalog.items.filter((item) => item.tool === tool);
    const items = uniqueByCourse(sortResources(filteredItems)).slice(0, limit);

    if (items.length > 0) {
      return {
        sourceTool: tool,
        items,
      };
    }
  }

  return {
    sourceTool: null,
    items: [],
  };
}

export function getToolTeachingVideoHighlights(toolOrTools, limit = 4) {
  return getToolTeachingVideoResourceSet(toolOrTools, limit).items;
}
