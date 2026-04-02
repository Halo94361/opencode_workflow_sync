# 任务列表：获取优秀 Skill 案例

## 任务概述

从开源社区和官方资源获取优秀 Skill 案例，整理到项目 `skill_ref/` 文件夹中，作为后续 Skill 开发的参考模板。

## 具体任务项

| 优先级 | 任务 | 说明 |
|--------|------|------|
| P0 | 获取 Anthropic Skills 官方仓库案例 | github.com/anthropics/skills (109k ⭐)，包含 code-review、pdf 处理等模板 |
| P1 | 获取 superpowers 等热门 AI 编程 Skill | 14 个技能的完整框架参考 |
| P2 | 获取 find-skills 等高安装量 Skill | 251.5K 安装量排名第一的 Skill 参考 |
| P1 | 获取项目内现有 9 个 Skill 的优化版本 | 与现有 `.opencode/skills/` 对比分析 |
| P2 | 建立 skill_ref 目录结构 | 按类型分类（代码审查、文档处理、Runbook、脚手架等） |

## 执行步骤

### 阶段一：搜索来源确认

1. **Anthropic Skills 官方仓库**
   - 地址：`https://github.com/anthropics/skills`
   - 重点关注：code-review、pdf-xlsx-docx-processing、superpowers 等

2. **GitHub 热门 Skill 项目**
   - 搜索关键词：`SKILL.md agent skill` 
   - 筛选标准：stars > 100、更新时间 < 6 个月

3. **项目内现有 Skill 优化**
   - 对比 `.opencode/skills/` 中 9 个 Skill 与开源优秀案例的差距

### 阶段二：案例获取与分类

建立 `skill_ref/` 目录，按以下分类存放：

```
skill_ref/
├── official/              # Anthropic 官方案例
│   ├── code-review-expert/
│   ├── document-processor/
│   └── runbook-template/
├── community/            # 社区热门案例
│   ├── ai-programming/   # superpowers 等
│   ├── data-analysis/
│   └── scaffolding/
├── internal/             # 项目内部优化参考
│   └── comparison/       # 现有 Skill 优化前后对比
└── catalog.md            # 案例索引目录
```

### 阶段三：案例整理规范

每个案例保存：
- 原始 SKILL.md 文件
- 来源链接（README 或原始仓库地址）
- 亮点说明（200字以内）
- 与项目现有 Skill 的差异分析

## 预期产出

1. `skill_ref/catalog.md` - 所有案例的索引目录
2. `skill_ref/official/` - 官方案例（3-5个）
3. `skill_ref/community/` - 社区案例（5-10个）
4. `skill_ref/internal/` - 内部优化分析报告
5. 每个案例包含：原始文件 + 来源说明 + 亮点标注
