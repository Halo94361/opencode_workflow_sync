# OpenCode Agent & Skill 机制

## 一、Agent 类型

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

---

## 二、Skill 机制

### 存放位置

| 位置 | 说明 |
|------|------|
| `.opencode/skills/<name>/SKILL.md` | 项目级 |
| `~/.config/opencode/skills/<name>/SKILL.md` | 全局级 |
| `.claude/skills/<name>/SKILL.md` | Claude 兼容（项目级） |
| `~/.claude/skills/<name>/SKILL.md` | Claude 兼容（全局级） |
| `.agents/skills/<name>/SKILL.md` | Agent 兼容（项目级） |
| `~/.agents/skills/<name>/SKILL.md` | Agent 兼容（全局级） |

### 格式要求

```
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
- 不含连续 `--`

---

## 三、Agent 配置方式

### JSON 配置（opencode.json）

```json
{
  "agent": {
    "build": {
      "mode": "primary",
      "model": "provider/model-id",
      "prompt": "{file:./prompts/build.txt}"
    },
    "custom-agent": {
      "description": "自定义代理描述",
      "mode": "subagent",
      "model": "provider/model-id",
      "temperature": 0.1,
      "steps": 10,
      "permission": {
        "edit": "ask",
        "bash": "allow"
      }
    }
  }
}
```

### Markdown 配置

存放路径：
- 全局：`~/.config/opencode/agents/<name>.md`
- 项目级：`.opencode/agents/<name>.md`

示例：

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

---

## 四、Agent 核心配置项

| 配置项 | 说明 | 可选值 |
|--------|------|--------|
| `mode` | 代理模式 | `primary`、`subagent`、`all` |
| `description` | 代理描述（必填） | 字符串 |
| `model` | 指定模型 | provider/model-id |
| `temperature` | 随机性 | 0.0-1.0 |
| `steps` | 最大迭代次数 | 整数 |
| `hidden` | 隐藏代理 | true/false |
| `color` | UI 颜色 | hex 或主题色 |
| `prompt` | 系统提示文件路径 | 文件路径 |
| `permission` | 工具权限 | `allow`、`ask`、`deny` |

### Permission 权限控制

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

---

## 五、Skill 与 Agent 关系

| 组件 | 职责 |
|------|------|
| **Skill** | 定义可复用的行为指令集，通过 skill 工具加载 |
| **Agent** | 定义具有特定权限、模型的专属角色 |
| **Task 工具** | Agent 调用 Subagent 的方式 |

```
Primary Agent → Task 工具 → Subagent
                           ↓
                      可加载 Skill
```

---

## 六、工作流框架中的映射

| 框架角色 | OpenCode 配置 | hidden |
|----------|---------------|--------|
| Master | primary | false |
| Architect | primary | false |
| Coder | subagent | true |
| Researcher | subagent | true |
| Tester | subagent | true |
| DevOps | subagent | true |
| DataProcessor | subagent | true |
| SecurityExpert | subagent | true |
| PerformanceEngineer | subagent | true |
| IntegrationEngineer | subagent | true |
| UXUIDesigner | subagent | true |
| Reviewer | subagent | true |
| Reflector | subagent | true |
| Docer | subagent | true |
| 工作流规则 | Skill | - |

---

## 七、关键约束

1. Skill 文件必须为 `SKILL.md`（全大写）
2. Agent 文件名即为 agent 名称
3. Primary/Subagent 可通过 Tab / @ 切换调用
4. Permission 规则最后匹配项生效
5. Subagent 可通过 `hidden: true` 隐藏

---

## 附录：Agent 与 Skill 编写规范

### A.1 Agent 文件编写规范

#### A.1.1 文件位置

- 项目级：`.opencode/agents/<name>.md`
- 文件名即为 Agent 名称（使用连字符分隔）

#### A.1.2 YAML Front Matter（必填）

```yaml
---
description: Agent描述（简洁明了）
mode: subagent           # primary | subagent
hidden: true             # true | false（是否在UI中隐藏）
permission:
  edit: allow           # allow | deny | ask
  bash: allow           # allow | deny | ask
---
```

#### A.1.3 文件结构模板

```markdown
---
description: <职责描述>
mode: subagent
hidden: true
permission:
  edit: allow/deny
  bash: allow/deny
---

# <Agent名称> Agent

你是一个<角色定位>，负责<核心职责>。

## 职责

- <职责1>
- <职责2>
- <职责3>

## 通用禁止项

- **禁止** <禁止行为1>
- **禁止** <禁止行为2>
- **禁止** <禁止行为3>
- **禁止** <禁止行为4>
- **禁止** <禁止行为5>
- **禁止** <禁止行为6>
- **禁止** <禁止行为7>
- **禁止** <禁止行为8>
- **禁止** <禁止行为9>
- **禁止** <禁止行为10>
- **禁止** <禁止行为11>

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

#### A.1.4 禁止项编写要点

1. **数量**：至少 11 条禁止项
2. **格式**：`**禁止** <具体行为>`
3. **内容**：针对角色职责的常见错误
4. **优先级**：
   - 最高：安全性、正确性相关
   - 中等：流程规范性相关
   - 一般：常见错误行为

#### A.1.5 示例禁止项

```markdown
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
```

---

### A.2 Skill 文件编写规范

#### A.2.1 文件位置

- 项目级：`.opencode/skills/<name>/SKILL.md`
- 全局级：`~/.config/opencode/skills/<name>/SKILL.md`

#### A.2.2 YAML Front Matter（必填）

```yaml
---
name: skill-name           # 小写字母+连字符，1-64字符
description: 技能描述（1-1024字符）
---
```

#### A.2.3 文件结构模板

```markdown
---
name: <skill-name>
description: <技能描述>
---

# <Skill名称> Skill

<技能说明>。

---

## 一、<章节1>

|<内容表格或列表>

---

## 二、<章节2>

|<内容表格或列表>

---

## N、关键约束

1. **约束1**：<说明>
2. **约束2**：<说明>
3. **约束3**：<说明>
```

#### A.2.4 命名规则

| 规则 | 要求 |
|------|------|
| 长度 | 1-64 字符 |
| 字符 | 小写字母 + 单连字符分隔 |
| 前缀 | 不以 `-` 开头 |
| 后缀 | 不以 `-` 结尾 |
| 连接 | 不含连续 `--` |

#### A.2.5 按需加载约束（重要）

当 Skill 文件超过 **200-300 行**时，必须进行按需加载拆分：

| 阈值 | 要求 |
|------|------|
| >200 行 | 考虑拆分 |
| >300 行 | 必须拆分 |
| 原因 | 减少 token 消耗，避免上下文溢出 |

**拆分方式**：
- 主 SKILL.md 只保留核心流程图和约束
- 详细内容拆分到 `docs/` 目录下的独立文件
- 在主文件中引用详细文档

**拆分结构示例**：
```
skills/
└── example-skill/
    ├── SKILL.md           # 主文件 (~100行，精简核心)
    └── docs/              # 详细文档（按需加载）
        ├── agents.md      # Agent详细说明
        ├── execution.md   # 执行流程
        ├── scoring.md     # 评分机制
        └── files.md       # 状态文件
```

**主文件精简原则**：
- 只保留流程图、核心约束、简要表格
- 删除详细的执行步骤和示例
- 删除冗余的格式模板（保留引用即可）

#### A.2.6 Skill 内容模块建议

```markdown
---
name: example-skill
description: 示例技能描述
---

# Example Skill

这是技能的详细说明。

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

### A.3 快速检查清单

#### 新增 Agent 前检查

- [ ] YAML front matter 完整（description, mode, hidden, permission）
- [ ] 至少 11 条禁止项
- [ ] 禁止项使用 `**禁止**` 格式
- [ ] 适用场景包含标签和具体场景
- [ ] 输入输出明确
- [ ] 评分维度关联
- [ ] 关键约束清晰

#### 新增 Skill 前检查

- [ ] YAML front matter 完整（name, description）
- [ ] 命名符合规则（小写+连字符）
- [ ] 包含 Agent 角色定义
- [ ] 包含任务标签匹配
- [ ] 包含执行流程
- [ ] 包含评分机制
- [ ] 包含状态文件说明
- [ ] 包含关键约束
- [ ] 超过200-300行时进行按需加载拆分

#### 文件命名检查

- [ ] Agent 文件名：`.opencode/agents/<name>.md`
- [ ] Skill 文件名：`.opencode/skills/<name>/SKILL.md`
- [ ] Skill 文件必须为 `SKILL.md`（全大写）

