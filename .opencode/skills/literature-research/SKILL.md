---
name: literature-research
description: 当用户要求文献调研、学术论文搜索、Literature Review或提出"帮我调研XXX相关论文"时触发。适用于学术论文汇总、技术调研，不适用于日常问答和具体代码问题。
allowed-tools:
  - websearch
  - webfetch
version: 1.0.0
---

## 概述

搜索学术论文（arXiv、PubMed、Google Scholar等），下载并阅读论文，提取关键信息，生成结构化的文献综述报告。对比不同论文的技术方法和研究结论，识别研究空白和机会。

## 前置要求

- 输入：用户提供的调研主题或关键词
- 工具：paper-search-mcp（优先）、websearch（备选）
- 输出目录：`{baseDir}/literature-reviews/`

## 执行流程

| 步骤 | 名称 | 输入 | 输出 | 说明 |
|------|------|------|------|------|
| 1 | 主题分析 | 调研主题 | 关键词列表、搜索策略 | 解析主题，提取3-5个关键词，设置时间范围 |
| 2 | 多源搜索 | 关键词列表 | 论文列表 | 并行搜索arXiv/PubMed/Google Scholar等数据库 |
| 3 | 论文筛选 | 论文列表 | 精选论文集(10-20篇) | 按相关性排序，过滤，优先新论文 |
| 4 | 信息提取 | 精选论文集 | 论文特征表 | 提取标题/作者/方法/结果/局限性 |
| 5 | 分析与报告生成 | 论文特征表 | 文献综述报告 | 分类、对比、趋势分析、输出Markdown |

### 工具使用说明

**优先工具 - paper-search系列**（结构化数据，更快更准）：
| 工具 | 来源 | 适用场景 |
|------|------|----------|
| `paper-search_search_arxiv` | arXiv | CS、物理、数学预印本 |
| `paper-search_search_pubmed` | PubMed | 生物医学文献 |
| `paper-search_search_google_scholar` | Google Scholar | 跨学科搜索 |
| `paper-search_search_semantic` | Semantic Scholar | AI增强搜索 |
| `paper-search_read_arxiv_paper` | arXiv | 提取论文正文 |

**备选工具 - websearch**：当paper-search工具不可用时，使用`site:arxiv.org`等语法搜索

## 输出格式

生成包含以下结构的Markdown文件：

```markdown
# Literature Review: [主题]

## Metadata
- **Topic**: [用户调研主题]
- **Date**: [YYYY-MM-DD]
- **Papers Reviewed**: [数量]
- **Time Range**: [时间范围]

## Executive Summary
[2-3段关键发现概述]

## Papers
| # | Title | Authors | Source | Year | Key Contribution |
|---|-------|---------|--------|------|------------------|

## Detailed Analysis
### Theme 1: [类别名称]
- Paper 1: [贡献和发现总结]

### Theme 2: [类别名称]

## Technology Comparison
| Method/Technology | Advantages | Limitations | Best Use Case |

## Research Trends
- [趋势1：描述及支持论文]
- [趋势2：描述及支持论文]

## Research Gaps & Opportunities
- [空白1：描述及潜在研究方向]

## Recommended Next Steps
- [ ] [具体下一步行动]

## References
1. [完整引用1]
```

## Gotchas

- ⚠️ **引用规范**：始终正确引用来源，区分同行评审论文和技术博客
- ⚠️ **全文获取**：注意PDF全文可能无法获取，提前检查可用性
- ⚠️ **客观分析**：呈现正反两面，既要总结优势也要说明局限性
- ⚠️ **论文数量**：论文少于10篇时，自动扩展时间范围
- ⚠️ **保存路径**：报告保存至`{baseDir}/literature-reviews/[topic-slug]-[date].md`，如目录不存在则先创建
- ⚠️ **并行搜索**：多个数据源并行搜索以提高效率，但注意API调用限制

## 术语表

| 术语 | 说明 |
|------|------|
| 文献综述 | 对某一领域已有研究的系统梳理和评价 |
| 预印本 | 尚未经过同行评审的学术论文（如arXiv） |
| DOI | 数字对象标识符，唯一标识学术论文 |
| 影响因子 | 期刊学术影响力的评价指标 |

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
- `news-check` - 技术动态（可结合使用）