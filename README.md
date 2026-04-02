# OpenCode Multi-Agent Workflow

Multi-Agent 协同工作流框架，支持任务自动拆解、并行执行、评分迭代。

---

## 目录结构

```
.
├── AGENTS.md                          # Agent 与 Skill 机制定义
├── MULTI_AGENT_WORKFLOW.md            # 工作流框架详细文档
├── _archived_business_code/           # 暂存区（历史业务代码）
└── .opencode/
    ├── agents/                        # Agent 角色配置
    │   ├── master.md                  # 主调度代理
    │   ├── architect.md                # 任务拆解代理
    │   ├── coder.md                    # 代码实现代理
    │   ├── researcher.md               # 技术调研代理
    │   ├── tester.md                   # 测试执行代理
    │   ├── reviewer.md                 # 质量评分代理
    │   ├── reflector.md                # 复盘建议代理
    │   ├── devops.md                  # 部署配置代理
    │   ├── data-processor.md           # 数据处理代理
    │   ├── security-expert.md          # 安全审查代理
    │   └── docer.md                   # 文档生成代理
    └── skills/
        └── multi-agent-workflow/
            └── SKILL.md                # 工作流框架 Skill
```

---

## 核心概念

### Agent 角色

| 角色 | 职责 |
|------|------|
| **Master** | 接收需求、协调调度、用户交互 |
| **Architect** | 任务拆解、标签标注、并行规划 |
| **Coder** | 业务代码实现 |
| **Researcher** | 技术调研、方案分析 |
| **Tester** | 测试编写与执行 |
| **DevOps** | 部署、CI/CD 配置 |
| **DataProcessor** | 数据处理任务 |
| **SecurityExpert** | 安全审查 |
| **Reviewer** | 质量评分（权重 0.7） |
| **Reflector** | 复盘建议（权重 0.3） |
| **Docer** | 技术文档生成 |

### 任务标签匹配

| 标签 | 执行者 | 并行上限 |
|------|--------|----------|
| `[data]` | DataProcessor | 3 |
| `[security]` | SecurityExpert | 3 |
| `[test]` | Tester | 3 |
| `[deploy]` | DevOps | 3 |
| `[research]` | Researcher | 3 |
| `[default]` | Coder | 3 |

---

## 工作流流程

```
用户需求
    │
    ▼
┌──────────────┐
│   Master     │ ◄── 接收需求
└──────┬───────┘
       ▼
┌──────────────┐
│  Architect   │ ◄── 任务拆解、标签标注
└──────┬───────┘
       ▼
   用户确认计划
       │
       ▼
┌─────────────────────────┐
│     执行循环 (最多3次)    │
│                          │
│  并行调度专业执行者        │
│         │                │
│  Reviewer(0.7) +        │
│  Reflector(0.3) 评分    │
│         │                │
│    评分≥90? ──[否]──►迭代│
│    [是]                  │
└─────────────────────────┘
```

---

## 评分机制

### 评分维度

| 维度 | 满分 |
|------|------|
| 正确性 | 25 |
| 可读性 | 20 |
| 完整性 | 20 |
| 性能 | 15 |
| 安全性 | 10 |
| 规范性 | 10 |

### 加权计算

```
最终评分 = Reviewer得分 × 0.7 + Reflector得分 × 0.3
```

### 终止条件

- **通过**：最终评分 ≥ 90
- **强制终止**：达到 3 次迭代

---

## 快速开始

### 1. 加载工作流 Skill

在工作流执行时，系统会自动加载 `.opencode/skills/multi-agent-workflow/SKILL.md`。

> **提示**：调用 Master 时，请明确指明「使用协同工作流」或「使用 multi-agent-workflow」，以确保正确触发 Skill 执行。

### 2. 提出需求

向 Master Agent 提出你的需求（请指明使用协同工作流），例如：

```
使用协同工作流，实现一个用户认证模块，包含注册、登录、JWT token 生成
```

### 3. 确认执行计划

Architect 会拆解任务并输出执行计划，确认后自动调度执行。

### 4. 迭代优化

执行后 Reviewer 和 Reflector 会评分，根据反馈迭代优化。

---

## 跨目录使用配置

本工作流配置支持在任何目录下使用，通过 **Junction（目录联接）** 将仓库配置链接到全局目录。

### Junction 简介

Junction 是 Windows 的目录链接技术，特点：
- 不需要管理员权限
- 仓库修改后全局自动生效
- 删除链接不会影响原文件

### 创建链接

**重要**：如果你已有 `~/.config/opencode/agents` 或 `~/.config/opencode/skills` 目录，说明你已经在使用 OpenCode 并有自己的 Agent/Skill 配置。此 Junction 方案会覆盖你的现有配置，请选择适合你的方案：

#### 方案 A：全局使用（会覆盖现有配置）

如果你的现有配置不再需要，可以执行以下命令：

```powershell
# 仓库路径（替换为你本地的仓库路径）
$REPO_PATH = "D:\GitLab\opencode_workflow_sync"
$CONFIG_DIR = "$env:USERPROFILE\.config\opencode"

# 创建 agents 链接（会覆盖现有目录）
cmd /c mklink /J "$CONFIG_DIR\agents" "$REPO_PATH\.opencode\agents"

# 创建 skills 链接（会覆盖现有目录）
cmd /c mklink /J "$CONFIG_DIR\skills" "$REPO_PATH\.opencode\skills"

# 创建 tools 链接（数学计算工具）
cmd /c mklink /J "$CONFIG_DIR\tools" "$REPO_PATH\.opencode\tools"
```

#### 方案 B：项目级使用（不破坏现有配置）

如果你有自己的项目仓库，希望在该项目中启用此工作流，执行以下脚本：

```powershell
# 工作流仓库路径（替换为你本地的仓库路径）
$WORKFLOW_REPO = "D:\GitLab\opencode_workflow_sync"

# 当前项目路径（替换为你的项目路径）
$CURRENT_PROJECT = "D:\GitLab\my_project"

# 在当前项目中创建 .opencode 目录（如果不存在）
if (-not (Test-Path "$CURRENT_PROJECT\.opencode")) {
    New-Item -ItemType Directory -Path "$CURRENT_PROJECT\.opencode" | Out-Null
}

# 链接 agents、skills 和 tools 到当前项目的 .opencode 下
cmd /c mklink /J "$CURRENT_PROJECT\.opencode\agents" "$WORKFLOW_REPO\.opencode\agents"
cmd /c mklink /J "$CURRENT_PROJECT\.opencode\skills" "$WORKFLOW_REPO\.opencode\skills"
cmd /c mklink /J "$CURRENT_PROJECT\.opencode\tools" "$WORKFLOW_REPO\.opencode\tools"

Write-Host "✓ 已完成！在该项目目录下使用 OpenCode 即可加载此工作流配置。"
```

此方案不影响你的全局配置 `~/.config/opencode/`，也不会覆盖任何现有内容。

### 验证链接

```powershell
# 验证 agents 链接（替换为你的实际路径）
Get-Item "<你的 agents 路径>" | Select-Object Target, LinkType

# 验证 skills 链接（替换为你的实际路径）
Get-Item "<你的 skills 路径>" | Select-Object Target, LinkType
```

### 删除链接

直接删除链接图标即可，不会影响原文件：

```powershell
# 删除链接（替换为你的实际路径）
Remove-Item "<链接路径>" -Force
```

# 删除 skills 链接
Remove-Item "$env:USERPROFILE\.config\opencode\skills" -Force
```

### 链接结构（方案 A：全局使用）

```
C:\Users\<用户名>\.config\opencode\
├── agents/  ──────────────────► D:\GitLab\opencode_workflow_sync\.opencode\agents
├── skills/  ──────────────────► D:\GitLab\opencode_workflow_sync\.opencode\skills
├── tools/   ──────────────────► D:\GitLab\opencode_workflow_sync\.opencode\tools
└── opencode.json              # 主配置文件（可选）
```

配置完成后，在**任意目录**打开 OpenCode，都会自动加载本仓库的工作流配置。

### 方案 B：项目级使用

直接在此仓库目录下使用 OpenCode，无需任何配置。它会自动从当前目录的 `.opencode/` 加载 agents 和 skills。

---

## 数学计算工具

本项目提供数学计算工具集，位于 `.opencode/tools/math.ts`，包含以下功能：

### 工具列表

| 工具 | 功能 | 示例 |
|------|------|------|
| `math_add` | 两数相加 | `math_add(a: 2, b: 3)` → `5` |
| `math_subtract` | 两数相减 | `math_subtract(a: 10, b: 3)` → `7` |
| `math_multiply` | 两数相乘 | `math_multiply(a: 4, b: 5)` → `20` |
| `math_divide` | 两数相除 | `math_divide(a: 10, b: 2)` → `5` |
| `math_sqrt` | 平方根 | `math_sqrt(a: 16)` → `4` |
| `math_power` | 幂运算 | `math_power(base: 2, exp: 3)` → `8` |
| `math_log` | 对数运算 | `math_log(a: 100, base: 10)` → `2` |
| `math_exp` | e 的幂 | `math_exp(a: 2)` → `7.389...` |
| `math_sin` | 正弦（弧度） | `math_sin(a: 1.5708)` → `1` |
| `math_cos` | 余弦（弧度） | `math_cos(a: 0)` → `1` |
| `math_tan` | 正切（弧度） | `math_tan(a: 0.7854)` → `1` |
| `math_asin` | 反正弦 | `math_asin(a: 1)` → `1.5708...` |
| `math_acos` | 反余弦 | `math_acos(a: 1)` → `0` |
| `math_atan` | 反正切 | `math_atan(a: 1)` → `0.7854...` |
| `math_floor` | 向下取整 | `math_floor(a: 4.7)` → `4` |
| `math_ceil` | 向上取整 | `math_ceil(a: 4.1)` → `5` |
| `math_round` | 四舍五入 | `math_round(a: 4.5)` → `5` |
| `math_abs` | 绝对值 | `math_abs(a: -5)` → `5` |
| `math_factorial` | 阶乘 | `math_factorial(a: 5)` → `120` |
| `math_gcd` | 最大公约数 | `math_gcd(a: 12, b: 8)` → `4` |
| `math_max` | 最大值 | `math_max(values: [1,5,3])` → `5` |
| `math_min` | 最小值 | `math_min(values: [1,5,3])` → `1` |
| `math_deg2rad` | 度转弧度 | `math_deg2rad(a: 180)` → `3.1415...` |
| `math_rad2deg` | 弧度转度 | `math_rad2deg(a: 3.1416)` → `180` |

### 使用方式

在 OpenCode 对话中直接调用数学工具，例如：

```
计算 2 的平方根
求 5 的阶乘
计算 sin(π/2)
```

> **提示**：三角函数使用弧度制，如需角度转换可使用 `math_deg2rad` 和 `math_rad2deg`。

### 全局/项目级配置

如需在其他项目中使用这些数学工具，可通过 Junction 链接 `.opencode/tools` 目录：

```powershell
# 全局配置
cmd /c mklink /J "$env:USERPROFILE\.config\opencode\tools" "D:\GitLab\opencode_workflow_sync\.opencode\tools"

# 项目级配置
cmd /c mklink /J "你的项目路径\.opencode\tools" "D:\GitLab\opencode_workflow_sync\.opencode\tools"
```

---

## 状态文件

工作流运行时会生成状态文件在 **当前工作目录** 的 `.agent_workflow/` 目录下：

```
你执行 opencode 时所在的目录/
└── .agent_workflow/          # 状态文件目录（位于当前项目下）
    ├── meta.md               # 工作流元数据
    ├── task_list.md          # 任务列表
    ├── execution_plan.md     # 执行计划
    ├── context.md            # 共享上下文
    ├── project_exploration.md  # 项目探索报告
    ├── scores.md             # 评分记录
    └── iterations/            # 迭代详情
        ├── iteration_1.md
        ├── iteration_2.md
        └── iteration_3.md
```

> **说明**：状态文件位于当前工作目录下，每个项目独立管理，便于版本控制和团队共享。

---

## Agent 调用方式

本工作流中的 Agent 角色均为 **Subagent**，且配置为 `hidden: true`，因此：

- **无法通过 @ 调用**
- **无法在 Tab 切换中看到**
- 通过 **Skill 工作流** 自动调度

```markdown
# 切换 Primary Agent
[Tab] 键

# 调用方式：通过 Skill 加载器（Task 工具）自动调度
# 例如：加载 multi-agent-workflow Skill 后，会自动调度各角色 Agent
```

> **注意**：所有 Agent 角色由 `multi-agent-workflow` Skill 统一管理，无需手动调用。

---

## 相关文档

- [AGENTS.md](./AGENTS.md) - Agent 与 Skill 机制详解
- [MULTI_AGENT_WORKFLOW.md](./MULTI_AGENT_WORKFLOW.md) - 工作流框架完整文档

---

## License

MIT
