# OpenCode Agent & Skill 机制

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

## Skill 机制

### 存放位置

| 位置 | 说明 |
|------|------|
| `.opencode/skills/<name>/SKILL.md` | 项目级 |
| `~/.config/opencode/skills/<name>/SKILL.md` | 全局级 |

### 格式要求

```markdown
---
name: skill-name
description: 技能描述（1-1024字符）
---

## 技能内容
...
```

### 命名规则

- 1-64 字符
- 小写字母 + 单连字符分隔
- 不以 `-` 开头/结尾

## Agent 配置

### Markdown 配置示例

```markdown
---
description: 代码审查代理
mode: subagent
model: anthropic/claude-sonnet-4-20250514
temperature: 0.1
permission:
  edit: deny
  bash: false
---

你是一个代码审查专家，专注于安全、性能和可维护性。
```

### 核心配置项

| 配置项 | 说明 | 可选值 |
|--------|------|--------|
| `mode` | 代理模式 | `primary`、`subagent` |
| `description` | 代理描述（必填） | 字符串 |
| `model` | 指定模型 | provider/model-id |
| `temperature` | 随机性 | 0.0-1.0 |
| `hidden` | 隐藏代理 | true/false |
| `permission` | 工具权限 | `allow`、`ask`、`deny` |

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

详见 [.opencode/skills/multi-agent-workflow/SKILL.md](.opencode/skills/multi-agent-workflow/SKILL.md)
