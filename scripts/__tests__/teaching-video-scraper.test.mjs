import test from 'node:test';
import assert from 'node:assert/strict';
import {extractBilibiliVideoMetadata} from '../lib/teaching-video-scraper.mjs';

const singleVideoHtml = String.raw`<!doctype html>
<html lang="zh-CN">
  <head>
    <title>Github Copilot 使用技巧系列 一｜GitHub Copilot 入门_哔哩哔哩_bilibili</title>
    <meta itemprop="keywords" name="keywords" content="Github Copilot 使用技巧系列 一｜GitHub Copilot 入门,科技猎手,视频教程,AI,教学视频,教程,Copilot,使用技巧,GitHub,GitHub Copilot,哔哩哔哩,bilibili,B站,弹幕">
    <meta itemprop="description" name="description" content="Github Copilot 使用技巧系列 一｜GitHub Copilot 入门 GitHub Copilot Free 现已正式推出。">
    <meta itemprop="author" name="author" content="微软Reactor">
    <meta itemprop="uploadDate" content="2024-12-30 09:43:18">
    <link rel="canonical" href="https://www.bilibili.com/video/BV1LZ6eYYEK6/">
  </head>
  <body>
    <script>
      window.__INITIAL_STATE__={"videoData":{"title":"Github Copilot 使用技巧系列 一｜GitHub Copilot 入门","owner":{"name":"微软Reactor_SH"},"pubdate":1735551798,"bvid":"BV1LZ6eYYEK6","desc":"Github Copilot 使用技巧系列 一｜GitHub Copilot 入门 GitHub Copilot Free 现已正式推出。","pic":"//i1.hdslb.com/bfs/archive/dffd7a24d0b9dc7037b739326147a6ba822c6abd.jpg","videos":1}};
    </script>
  </body>
</html>`;

const seriesVideoHtml = String.raw`<!doctype html>
<html lang="zh-CN">
  <head>
    <title>Cursor-AI编程完整版入门教程_哔哩哔哩_bilibili</title>
    <meta itemprop="keywords" name="keywords" content="AI,Cursor,Trae,ChatGPT,Claude3.7,AI编程,DeepSeek">
    <meta itemprop="description" name="description" content="Cursor-AI编程完整版入门教程共计18条视频，包括：01-CursorAI编程工具介绍、02-下载安装Cursor。">
    <meta itemprop="author" name="author" content="SiKi老师">
    <meta itemprop="uploadDate" content="2025-04-22 19:00:00">
    <link rel="canonical" href="https://www.bilibili.com/video/BV18j5DzyEmD/">
  </head>
  <body>
    <script>
      window.__INITIAL_STATE__={"videoData":{"title":"Cursor-AI编程完整版入门教程","owner":{"name":"SiKi老师"},"pubdate":1745329200,"bvid":"BV18j5DzyEmD","desc":"Cursor-AI编程完整版入门教程共计18条视频，包括：01-CursorAI编程工具介绍、02-下载安装Cursor。","pic":"//i1.hdslb.com/bfs/archive/8dda41f4a16fb1b3265b25f5406c4f69db628885.jpg","videos":18}};
    </script>
  </body>
</html>`;

test('extractBilibiliVideoMetadata parses a normal video page', () => {
  const metadata = extractBilibiliVideoMetadata(
    singleVideoHtml,
    'https://www.bilibili.com/video/BV1LZ6eYYEK6/',
  );

  assert.equal(metadata.title, 'Github Copilot 使用技巧系列 一｜GitHub Copilot 入门');
  assert.equal(metadata.creator, '微软Reactor_SH');
  assert.equal(metadata.publishedAt, '2024-12-30');
  assert.equal(metadata.href, 'https://www.bilibili.com/video/BV1LZ6eYYEK6/');
  assert.equal(
    metadata.description,
    'Github Copilot 使用技巧系列 一｜GitHub Copilot 入门 GitHub Copilot Free 现已正式推出。',
  );
  assert.equal(
    metadata.thumbnailUrl,
    'https://i1.hdslb.com/bfs/archive/dffd7a24d0b9dc7037b739326147a6ba822c6abd.jpg',
  );
  assert.equal(metadata.episodeCount, null);
  assert.deepEqual([...metadata.keywords].sort(), [
    'AI',
    'Copilot',
    'GitHub',
    'GitHub Copilot',
    '科技猎手',
    '教程',
    '使用技巧',
  ].sort());
});

test('extractBilibiliVideoMetadata recognizes series-style episode counts', () => {
  const metadata = extractBilibiliVideoMetadata(
    seriesVideoHtml,
    'https://www.bilibili.com/video/BV18j5DzyEmD/',
  );

  assert.equal(metadata.title, 'Cursor-AI编程完整版入门教程');
  assert.equal(metadata.creator, 'SiKi老师');
  assert.equal(metadata.publishedAt, '2025-04-22');
  assert.equal(metadata.href, 'https://www.bilibili.com/video/BV18j5DzyEmD/');
  assert.equal(metadata.episodeCount, 18);
  assert.deepEqual([...metadata.keywords].sort(), [
    'AI',
    'AI编程',
    'ChatGPT',
    'Claude3.7',
    'Cursor',
    'DeepSeek',
    'Trae',
  ].sort());
});
