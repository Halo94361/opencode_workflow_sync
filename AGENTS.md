# OpenCode Agent & Skill 机制

## 参考文档

| 文档 | 路径 | 说明 |
|------|------|------|
| **优秀Skill写作指导** | `docs/skill-writing-guide.md` | Skill编写规范和最佳实践 |
| **Agent编写规范** | `docs/agent-build-assist.md` | Agent文件详细编写指南 |
| **Multi-Agent工作流框架** | `docs/multi-agent-workflow-framework.md` | 协同工作流完整规范 |

---

## Agent 类型

| 类型 | 说明 |
|------|------|
| **Primary Agent** | 主交互代理，可通过 Tab 键切换 |
| **Subagent** | 专精任务代理，可通过 @ 提及调用 |

### 内置 Agent

| Agent | 类型 | 说明 |
|--------|------|------|
| `build` | primary | 全工具启用，默认开发代理 |
| `plan` | primary | 只读分析，禁止文件修改和 bash |
| `general` | subagent | 通用任务，可并行执行多步工作 |
| `explore` | subagent | 代码探索，只读快速搜索 |
| `compaction` | primary | 隐藏系统代理，长上下文压缩 |
| `title` | primary | 隐藏系统代理，生成会话标题 |
| `summary` | primary | 隐藏系统代理，创建会话摘要 |

## Skill 机制

### 存放位置

| 位置 | 说明 |
|------|------|
| `.opencode/skills/<name>/SKILL.md` | 项目级 |
| `~/.config/opencode/skills/<name>/SKILL.md` | 全局级 |
| `.claude/skills/<name>/SKILL.md` | Claude 兼容（项目级） |
| `.agents/skills/<name>/SKILL.md` | Agent 兼容（项目级） |

### 格式要求

```markdown
---
name: skill-name
description: 当用户要求[动作]或提出[关键词]时触发。适用于[场景]，不适用于[排除场景]。
allowed-tools:
  - read
  - write
version: 1.0.0
---

## 技能名称

### 概述
简要说明技能用途和边界

### 执行流程
1. 步骤一
2. 步骤二

### Gotchas
- ⚠️ 踩坑点一
- ⚠️ 踩坑点二
```

> **注意**：description 是**触发条件描述**，不是功能简介。详见 [优秀Skill写作指导](docs/skill-writing-guide.md)。

### 命名规则

- 1-64 字符
- 小写字母 + 单连字符分隔
- 正则验证：`^[a-z0-9]+(-[a-z0-9]+)*$`
- 不以 `-` 开头/结尾

## Agent 配置

### Markdown 配置示例

```markdown
---
description: 代码审查代理
mode: subagent
model: anthropic/claude-sonnet-4-20250514
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
---

你是一个代码审查专家，专注于安全、性能和可维护性。
```

详细编写规范请参考 [Agent编写规范](docs/agent-build-assist.md)

### 核心配置项

| 配置项 | 说明 | 可选值 |
|--------|------|--------|
| `mode` | 代理模式 | `primary`、`subagent`、`all` |
| `description` | 代理描述（必填） | 字符串 |
| `model` | 指定模型 | provider/model-id |
| `temperature` | 随机性 | 0.0-1.0 |
| `steps` | 最大迭代次数 | 整数 |
| `hidden` | 隐藏代理 | true/false |
| `tools` | 工具权限 | true/false |
| `permission` | 操作权限 | `"allow"`、`"ask"`、`"deny"` |

## 关键约束

1. Skill 文件必须为 `SKILL.md`（全大写）
2. Agent 文件名即为 agent 名称
3. Permission 规则最后匹配项生效
4. Subagent 可通过 `hidden: true` 隐藏

## 工作流框架映射

| 框架角色 | OpenCode 配置 | hidden |
|----------|---------------|--------|
| Master | primary | false |
| Architect | primary | false |
| Coder | subagent | true |
| Reviewer | subagent | true |
| Reflector | subagent | true |
| 工作流规则 | Skill | - |

详见 [Multi-Agent工作流框架](docs/multi-agent-workflow-framework.md)
