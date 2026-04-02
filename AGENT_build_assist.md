# Agent 编写规范

本文档提供 Agent 文件的详细编写指南，用于创建新 Agent 时的参考。

---

## Agent 文件结构

### 文件位置

- 项目级：`.opencode/agents/<name>.md`
- 全局级：`~/.config/opencode/agents/<name>.md`
- 文件名即为 Agent 名称（使用连字符分隔）

### YAML Front Matter（必填）

```yaml
---
description: Agent描述（简洁明了）
mode: subagent           # primary | subagent
hidden: true             # true | false（是否在UI中隐藏）
permission:
  edit: allow           # allow | deny | ask
  bash: deny            # allow | deny | ask（注意：必须使用 deny，禁止省略）
---
```

### 文件结构模板

```markdown
---
description: <职责描述>
mode: subagent
hidden: true
permission:
  edit: allow
  bash: deny
---

# <Agent名称> Agent

你是一个<角色定位>，负责<核心职责>。

## 职责

- <职责1>
- <职责2>
- <职责3>

## 通用禁止项

- **禁止** 执行未被指派的任务
- **禁止** 自行决定任务执行顺序或优先级
- **禁止** 修改 task_list.md 或 execution_plan.md
- **禁止** 创建不在计划内的文件或模块
- **禁止** 忽略项目的代码规范和风格
- **禁止** 提交包含 TODO/FIXME/HACK 等占位符的代码
- **禁止** 在未理解任务需求时直接开始编码
- **禁止** 修改其他执行者的代码（除非被明确要求）
- **禁止** 在未更新 context.md 状态的情况下完成任务
- **禁止** 忽略错误信息或警告
- **禁止** 在报告中使用模糊表述（如"可能有问题"）

## 适用场景

- `[<tag>]` 标签的任务
- <场景1>
- <场景2>

## 输入

- `.agent_workflow/execution_plan.md` - 执行计划
- `.agent_workflow/context.md` - 共享上下文
- <其他输入>

## 输出

- <产出物1>
- <产出物2>
- 更新 `.agent_workflow/context.md`

## 评分维度关联

- <维度>（主要/部分）

## 关键约束

- <约束1>
- <约束2>
```

---

## 核心配置项详解

### mode（代理模式）

| 值 | 说明 |
|----|------|
| `primary` | 主交互代理，可通过 Tab 键切换 |
| `subagent` | 专精任务代理，可通过 @ 提及调用 |

### hidden（隐藏代理）

| 值 | 说明 |
|----|------|
| `true` | 在 UI 中隐藏，不显示在代理列表 |
| `false` | 正常显示 |

### permission（工具权限）

| 值 | 说明 |
|----|------|
| `allow` | 允许使用 |
| `deny` | 禁止使用 |
| `ask` | 使用前需确认 |

**注意**：`bash` 权限必须使用 `deny`，不能使用 `false`。

```markdown
# 正确
permission:
  bash: deny

# 错误
permission:
  bash: false
```

---

## Skill 文件编写规范

### 文件位置

- 项目级：`.opencode/skills/<name>/SKILL.md`
- 全局级：`~/.config/opencode/skills/<name>/SKILL.md`

### YAML Front Matter

```yaml
---
name: skill-name           # 小写字母+连字符，1-64字符
description: 技能描述（1-1024字符）
---
```

### 命名规则

| 规则 | 要求 |
|------|------|
| 长度 | 1-64 字符 |
| 字符 | 小写字母 + 单连字符分隔 |
| 前缀 | 不以 `-` 开头 |
| 后缀 | 不以 `-` 结尾 |
| 连接 | 不含连续 `--` |

### Skill 结构模板

```markdown
---
name: <skill-name>
description: <技能描述>
---

# <Skill名称> Skill

<技能说明>。

---

## 一、Agent 角色

| 角色 | Mode | 职责 |
|------|------|------|
|      |      |      |

---

## 二、任务标签匹配

| 标签 | 执行者 | 并行上限 |
|------|--------|----------|
|      |        |          |

---

## 三、执行流程

```
流程图或详细步骤
```

---

## 四、评分机制

### 4.1 维度与满分

| 维度 | 满分 |
|------|------|
|      |      |

### 4.2 终止条件

- 通过：<条件>
- 强制终止：<条件>

---

## 五、状态文件

| 文件 | 维护者 | 内容 |
|------|--------|------|
|      |        |      |

---

## 六、关键约束

1. **约束1**：<说明>
2. **约束2**：<说明>
```

---

## 按需加载约束

当 Skill 文件超过 **200-300 行**时，必须进行按需加载拆分：

| 阈值 | 要求 |
|------|------|
| >200 行 | 考虑拆分 |
| >300 行 | 必须拆分 |
| 原因 | 减少 token 消耗，避免上下文溢出 |

**拆分结构示例**：
```
skills/
└── example-skill/
    ├── SKILL.md           # 主文件 (~100行，精简核心)
    └── docs/              # 详细文档（按需加载）
        ├── agents.md      # Agent详细说明
        ├── execution.md   # 执行流程
        └── files.md       # 状态文件
```

---

## 快速检查清单

### 新增 Agent 前检查

- [ ] YAML front matter 完整（description, mode, hidden, permission）
- [ ] 至少 11 条禁止项
- [ ] 禁止项使用 `**禁止**` 格式
- [ ] 适用场景包含标签和具体场景
- [ ] 输入输出明确
- [ ] 评分维度关联
- [ ] 关键约束清晰
- [ ] `bash` 权限使用 `deny` 而非 `false`

### 新增 Skill 前检查

- [ ] YAML front matter 完整（name, description）
- [ ] 命名符合规则（小写+连字符）
- [ ] 包含 Agent 角色定义
- [ ] 包含任务标签匹配
- [ ] 包含执行流程
- [ ] 包含评分机制
- [ ] 包含状态文件说明
- [ ] 包含关键约束
- [ ] 超过200-300行时进行按需加载拆分

### 文件命名检查

- [ ] Agent 文件名：`.opencode/agents/<name>.md`
- [ ] Skill 文件名：`.opencode/skills/<name>/SKILL.md`
- [ ] Skill 文件必须为 `SKILL.md`（全大写）

---

## 权限控制示例

### 基本权限控制

```json
{
  "permission": {
    "edit": "deny",
    "bash": "deny",
    "webfetch": "allow"
  }
}
```

### 细粒度权限控制

```json
{
  "permission": {
    "edit": "deny",
    "bash": {
      "*": "ask",
      "git status *": "allow",
      "git push": "deny"
    },
    "webfetch": "allow"
  }
}
```

### 权限匹配规则

- 最后匹配项生效
- `*` 表示匹配所有
- 特定规则优先于通配符
