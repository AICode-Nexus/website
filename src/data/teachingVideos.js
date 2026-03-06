import {defineTeachingVideoCatalog} from '@site/src/utils/teachingVideos';

export const teachingVideoCatalog = defineTeachingVideoCatalog({
  title: 'AI Code 教学视频库',
  description:
    '优先收录 B 站公开视频，并把标题、UP 主、发布时间、链接、标签和摘要固化为站内稳定元数据。',
  sources: [
    {
      id: 'bilibili-public-video',
      title: 'Bilibili 公开视频详情页',
      description:
        '以单视频详情页公开元数据为主源，人工校验标题、UP 主、发布时间与链接，避免依赖搜索排序页或未公开接口。',
    },
    {
      id: 'bilibili-public-series',
      title: 'Bilibili 公开合集/系列页',
      description:
        '当视频属于系列课程时，补充记录系列页上下文，帮助站内后续做专题页或按工具聚合。',
    },
  ],
  items: [
    {
      id: 'github-copilot-intro-reactor',
      platform: 'Bilibili',
      title: 'Github Copilot 使用技巧系列 一｜GitHub Copilot 入门',
      creator: '微软Reactor_SH',
      publishedAt: '2024-12-30',
      href: 'https://www.bilibili.com/video/BV1LZ6eYYEK6/',
      tags: ['GitHub Copilot', '入门', '系列课'],
      summary:
        '适合作为 Copilot 入门起点，覆盖免费版上手、VS Code 集成与基础交互方式，适合建立平台级认知。',
      sourceId: 'bilibili-public-series',
      sourceNote: '公开视频详情页与系列课目录页均可公开访问。',
    },
    {
      id: 'github-copilot-devops-reactor',
      platform: 'Bilibili',
      title: 'GitHub Copilot 使用技巧 - DevOps',
      creator: '微软Reactor_SH',
      publishedAt: '2025-01-24',
      href: 'https://www.bilibili.com/video/BV17Xf7YqEhL/',
      tags: ['GitHub Copilot', 'DevOps', '工作流'],
      summary:
        '偏进阶，展示 Copilot 如何进入真实交付链路，适合补齐从代码生成到 DevOps 场景的流程理解。',
      sourceId: 'bilibili-public-video',
    },
    {
      id: 'cursor-full-course-siki',
      platform: 'Bilibili',
      title: 'Cursor-AI编程完整版入门教程',
      creator: 'SiKi老师',
      publishedAt: '2025-04-22',
      href: 'https://www.bilibili.com/video/BV18j5DzyEmD/',
      tags: ['Cursor', '入门到实战', 'Rules'],
      summary:
        '覆盖安装、基础设置、Chat/Composer、规则配置与项目实战，适合做 Cursor 的完整入门素材。',
      sourceId: 'bilibili-public-series',
      sourceNote: '公开视频详情页可直接看到 18 集选集目录。',
    },
    {
      id: 'openai-codex-quickstart',
      platform: 'Bilibili',
      title: 'OpenAI Codex 快速入门',
      creator: '艾伦Tech',
      publishedAt: '2025-05-20',
      href: 'https://www.bilibili.com/video/BV1e4JtzTESc/',
      tags: ['OpenAI Codex', '快速入门', 'Agent'],
      summary:
        '用短视频形式概览 Codex 的核心定位，强调云端软件工程 Agent 的使用场景，适合首页入口级推荐。',
      sourceId: 'bilibili-public-video',
    },
    {
      id: 'claude-code-beginner-guide',
      platform: 'Bilibili',
      title: '最强 AI 编程工具 Claude Code 保姆级新手教程！小白友好！',
      creator: '万物研究所',
      publishedAt: '2025-07-19',
      href: 'https://www.bilibili.com/video/BV1S8u2zDE5p/',
      tags: ['Claude Code', '新手教程', '工作流'],
      summary:
        '覆盖安装、基础使用和实战感知，强调降低门槛，适合补齐 Claude Code 的普及型教学内容。',
      sourceId: 'bilibili-public-video',
    },
    {
      id: 'anthropic-claude-code-practice',
      platform: 'Bilibili',
      title: 'Anthropic官方教程中文（二）实操详解ClaudeCode使用',
      creator: '一蛙AI',
      publishedAt: '2025-08-22',
      href: 'https://www.bilibili.com/video/BV1ARYZzqEjZ/',
      tags: ['Claude Code', 'Anthropic', '实操'],
      summary:
        '基于 Anthropic 官方课程做中文整理，重点覆盖上手实操与工具使用细节，适合作为进阶补充。',
      sourceId: 'bilibili-public-series',
    },
  ],
});
