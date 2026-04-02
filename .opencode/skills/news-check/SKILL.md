---
name: news-check
description: 当用户询问技术动态、最新资讯、开源项目、技术趋势、"有什么新消息"、"帮我搜一下AI/嵌入式动态"时触发。适用于科技行业信息汇总，不适用于具体技术问题诊断。
allowed-tools:
  - websearch
version: 1.0.0
---

## 概述

搜索GitHub Trending项目。监控主流技术媒体动态。追踪AI/嵌入式/物联网/芯片等厂商动态。关注科技行业最新资讯和产品发布。输出综合技术动态摘要。

## 前置要求

- 输入：用户的技术领域偏好或关键词
- 工具：websearch可用
- 背景：了解用户关注的特定技术方向

## 执行流程

| 步骤 | 名称 | 输入 | 输出 | 说明 |
|------|------|------|------|------|
| 1 | 并行搜索 | 用户关键词/偏好 | 原始搜索结果 | 多来源并行搜索（GitHub/国内媒体/国际媒体/技术博客） |
| 2 | 内容筛选 | 原始搜索结果 | 精选列表 | 过滤相关性、去重、按热度排序 |
| 3 | 摘要输出 | 精选列表 | 最终摘要报告 | 生成结构化Markdown，附带链接和来源 |

## 输出格式

```markdown
# Tech News: [date]

## AI & 大模型
- **[title]**: [description]
  - Source: [媒体名称]
  - Link: [url]

## GitHub Trending
- **[repo-name]**: [description]
  - Stars: [count] | Language: [lang]
  - Link: [url]

## 科技媒体
- **[title]**
  - Source: [36kr / 虎嗅 / TechCrunch / ...]
  - Summary: [1-2 sentence summary]
  - Link: [url]

## 行业动态
### 芯片 & 半导体
- [update description]
  - Link: [url]

### 终端 & 硬件
- [update description]
  - Link: [url]
```

## Gotchas

- ⚠️ **时效性优先**：科技资讯有很强时效性，优先选择最近一周的内容
- ⚠️ **来源质量**：过滤低质量来源（标题党、非原创），确保信息准确性
- ⚠️ **区域差异**：注意技术趋势的区域差异，国内外热点可能不同（如国内AI监管政策）
- ⚠️ **信息验证**：多个来源交叉验证同一信息，避免单一来源的片面性
- ⚠️ **去重合并**：同一事件多篇报道时，合并为一条简洁摘要
- ⚠️ **链接有效性**：检查URL是否可访问，移除失效链接
- ⚠️ **数量限制**：每个来源最多返回3-5条，避免信息过载

## 术语表

| 术语 | 说明 |
|------|------|
| GitHub Trending | GitHub热门项目排行榜 |
| AI大模型 | 大型语言模型，如GPT、Claude等 |
| 嵌入式 | 面向特定硬件的专用软件系统 |

## 版本规范

采用语义化版本`major.minor.patch`：

| 版本类型 | 适用场景 |
|----------|----------|
| patch | Bug修复、文档更新 |
| minor | 新增搜索来源（向后兼容） |
| major | 破坏性变更 |

当前版本：1.0.0

## 相关资源

### 参考文档
- `docs/skill-writing-guide.md` - 优秀Skill写作指导

### 相关Skill
- `multi-agent-workflow` - 协同工作流框架
- `literature-research` - 文献调研（可结合使用）