---
name: multi-agent-workflow
description: Multi-Agent 协同工作流框架规范，定义 Agent 角色、状态文件、评分机制和执行循环
---

# Multi-Agent 协同工作流 Skill

这是一个工作流调度框架，所有 Agent 必须遵循本规范。

---

## 一、Agent 角色（详细见 docs/agents.md）

| 角色 | Mode | 职责 | 触发时机 | 输出产物 |
|------|------|------|----------|----------|
| Master | primary | 接收需求、调度协调 | 用户提交需求时 | meta.md |
| Architect | primary | 任务拆解、API审查 | Master调用时 | task_list.md |
| ProjectExplorer | subagent | 项目探索、结构分析 | 自动触发(已有项目) | project_exploration.md |
| Coder | subagent | 代码实现(多语言) | 任务分配时 | 代码文件 |
| Researcher | subagent | 技术调研 | 任务分配时 | 调研报告 |
| Tester | subagent | 测试编写执行 | 任务分配时 | 测试报告 |
| DevOps | subagent | 部署配置 | 任务分配时 | 部署脚本 |
| DataProcessor | subagent | 数据处理 | 任务分配时 | 处理数据 |
| SecurityExpert | subagent | 安全审查 | 任务分配时 | 安全报告 |
| PerformanceEngineer | subagent | 性能分析 | 任务分配时 | 性能报告 |
| IntegrationEngineer | subagent | API设计 | 任务分配时 | api_contract.md |
| UXUIDesigner | subagent | 界面设计 | 任务分配时 | 设计文档 |
| Reviewer | subagent | 质量评分(0.7) | 执行结束时 | scores.md |
| Reflector | subagent | 复盘建议(0.3) | 评分后 | 复盘报告 |
| Docer | subagent | 文档生成 | 需要时 | 技术文档 |

---

## 二、任务标签匹配（详细见 docs/tags.md）

| 标签 | 执行者 | 并行上限 |
|------|--------|----------|
| `[explore]` | project-explorer | 3 |
| `[data]` | data-processor | 3 |
| `[security]` | security-expert | 3 |
| `[test]` | tester | 3 |
| `[deploy]` | devops | 3 |
| `[research]` | researcher | 3 |
| `[performance]` | performance-engineer | 3 |
| `[integration]` | integration-engineer | 3 |
| `[ui]`/`[ux]`/`[design]` | ux-ui-designer | 3 |
| `[default]` | coder | 3 |

---

## 三、项目探索流程（详细见 docs/exploration.md）

当检测到是已有项目时，自动触发项目探索。

### 流程图

```
用户需求 → Master检测 → ProjectExplorer探索 → Architect分配 → 任务拆解
```

### 触发条件
- 存在 src/lib/drivers/app 等源代码目录
- 存在构建文件（Makefile/CMakeLists.txt等）
- 存在 .git 目录

### 约束
- **禁止**跳过项目探索直接开始开发
- **禁止**探索范围超出指定区域

---

## 四、API 设计流程（详细见 docs/api-design.md）

```
Architect 拆解 → IntegrationEngineer 设计 → Architect 审查 → Coder 编码
```

### 约束
- **禁止** Coder 在 API 契约未确认前开始编码
- **禁止** 跳过 API 审查环节

---

## 五、执行循环（详细见 docs/execution.md）

```
用户需求 → Master → 项目探索 → Architect拆解 → 用户确认 → 执行循环(最多3次)
                                              ↓
                         Reviewer评分(0.7) + Reflector复盘(0.3)
                                              ↓
                                    评分≥90? → [是]终止 [否]迭代
```

### 迭代规则
- 迭代 1: 执行 → 评分 → 复盘
- 迭代 2: 如评分<90，改进 → 重新评分
- 迭代 3: 最后一次，仍不达标则终止

---

## 六、评分机制（详细见 docs/scoring.md）

### 维度与满分

| 维度 | 满分 |
|------|------|
| 正确性 | 25 |
| 可读性 | 20 |
| 完整性 | 20 |
| 性能 | 15 |
| 安全性 | 10 |
| 规范性 | 10 |

### 计算公式

```
最终评分 = Reviewer得分 × 0.7 + Reflector得分 × 0.3
```

### 终止条件
- **通过**：最终评分 ≥ 90
- **强制终止**：达到 3 次迭代

---

## 七、状态文件（详细见 docs/files.md）

位置：`.agent_workflow/`

| 文件 | 维护者 | 内容 |
|------|--------|------|
| meta.md | Master | 工作流状态、时间 |
| task_list.md | Architect | 任务列表 |
| execution_plan.md | Architect | 执行计划 |
| context.md | 各Agent | 共享上下文 |
| project_exploration.md | ProjectExplorer | 项目探索报告 |
| scores.md | Reviewer | 评分记录 |
| iterations/iteration_N.md | Master | 迭代详情 |

---

## 八、关键约束（详细见各详细文档）

| 约束 | 说明 | 违反处理 |
|------|------|----------|
| 项目探索前置 | 已有项目必须先完成探索 | Master 叫停 |
| 探索任务分配 | 大型项目分段探索，防止上下文溢出 | Architect 重新分配 |
| API 设计前置 | 涉及 API/接口必须先完成设计 | Master 叫停 |
| 执行者并行上限 | 同类执行者最多 3 个并行 | Master 调度调整 |
| 迭代上限 | 3 次，强制终止 | 终止工作流 |
| 评分权重 | Reviewer 70% + Reflector 30% | 按权重计算 |
| 任务粒度 | 拆解到模块级 | Architect 重新拆解 |
| 状态持久化 | 关键状态存入 .agent_workflow/ | Agent 补全 |
| 路径规范 | Input/Output 必须使用正确路径格式；仓库内用相对路径，仓库外用绝对路径；禁止裸文件名 | Agent 自动修正并记录，Master 检查监督 |

---

## 九、详细文档索引

| 文档 | 内容 |
|------|------|
| `docs/agents.md` | Agent 角色详细说明、执行步骤、输出模板 |
| `docs/tags.md` | 任务标签匹配规则、应用示例 |
| `docs/exploration.md` | 项目探索流程、触发条件、报告格式 |
| `docs/api-design.md` | API 设计流程、契约模板、审查要点 |
| `docs/execution.md` | 执行循环详细步骤、主动求助流程 |
| `docs/scoring.md` | 评分维度，加权计算，校准原则 |
| `docs/files.md` | 状态文件格式模板，维护规则 |
