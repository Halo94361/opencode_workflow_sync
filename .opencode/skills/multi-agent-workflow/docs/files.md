# 状态文件格式详细说明

---

## 一、文件目录结构

```
.agent_workflow/
├── meta.md              # 工作流元数据
├── task_list.md         # 任务列表
├── execution_plan.md     # 执行计划
├── context.md           # 共享上下文
├── scores.md            # 评分记录
├── iterations/
│   ├── iteration_1.md
│   ├── iteration_2.md
│   └── iteration_3.md
└── output/
    ├── final_code/      # 最终代码产出
    └── final_doc/       # 最终文档产出
```

---

## 二、meta.md 格式

### 2.1 模板

```markdown
# Workflow Meta

## Basic Info
- Workflow: <需求摘要>
- Start Time: <YYYY-MM-DD HH:MM:SS>
- Status: IN_PROGRESS / COMPLETED / TERMINATED
- Current Iteration: <N>
- Max Iterations: 3
- Termination Score: 90

## 执行阶段
- [x] Architect 任务拆解 - <时间>
- [x] 用户确认 - <时间>
- [ ] 执行循环
  - [ ] 迭代 1
  - [ ] 迭代 2
  - [ ] 迭代 3
```

### 2.2 字段说明

| 字段 | 说明 | 可选值 |
|------|------|--------|
| Status | 工作流状态 | IN_PROGRESS, COMPLETED, TERMINATED |
| Current Iteration | 当前迭代次数 | 1, 2, 3 |
| Termination Score | 终止阈值 | 90 |

### 2.3 状态转换规则

| 当前状态 | 触发条件 | 下一状态 |
|----------|----------|----------|
| INIT | Master完成初始化 | EXPLORING |
| EXPLORING | ProjectExplorer完成探索 | PLANNING |
| PLANNING | Architect完成任务拆解 | WAITING_CONFIRM |
| WAITING_CONFIRM | 用户确认计划 | EXECUTING |
| EXECUTING | 所有执行者完成任务 | REVIEWING |
| REVIEWING | Reviewer+Reflector完成评分且评分<90且迭代<3 | EXECUTING |
| REVIEWING | Reviewer+Reflector完成评分且评分≥90或迭代=3 | TERMINATED |

---

## 三、task_list.md 格式

### 3.1 模板

```markdown
# Task List

## T1 - <任务名>
- Status: PENDING / IN_PROGRESS / COMPLETED / FAILED
- Assigned: <执行者>
- Tag: [<标签>]
- Description: <详细描述>
- Input: <仓库根目录相对路径>  # 仓库内：src/utils.py，仓库外：C:\Users\...\config.yaml
- Output: <仓库根目录相对路径> # 仓库内：src/utils.py，仓库外：C:\Users\...\config.yaml
- Start Time: <YYYY-MM-DD HH:MM:SS>
- End Time: <YYYY-MM-DD HH:MM:SS>
- Duration: <耗时(秒)>

## T2 - <任务名>
...
```

### 3.2 状态说明

| 状态 | 说明 |
|------|------|
| PENDING | 等待执行 |
| IN_PROGRESS | 执行中 |
| COMPLETED | 已完成 |
| FAILED | 执行失败 |

### 3.3 Input/Output 路径规范

| 字段 | 说明 | 必填 | 路径规则 |
|------|------|------|----------|
| Input | 输入文件路径 | 是 | 仓库内用相对路径，仓库外用绝对路径 |
| Output | 输出文件路径 | 是 | 仓库内用相对路径，仓库外用绝对路径 |

**路径格式规则**：

| 文件位置 | 路径格式 | 示例 |
|----------|----------|------|
| 仓库内 | 根目录相对路径 | `src/utils/parser.py`、`lib/config.yaml` |
| 仓库外 | 绝对路径 | `C:\Users\Halo\Documents\config.yaml`、`/home/user/settings.json` |

**路径规范约束**：
- 路径必须指向具体文件，禁止使用裸文件名（如 `utils.py`）
- Agent 执行任务前，自动将裸文件名修正为相对路径并记录
- 修正规则：优先从 project_exploration.md 中查找匹配路径

---

## 四、execution_plan.md 格式

### 4.1 模板

```markdown
# Execution Plan

## 基本信息
- 创建时间: <YYYY-MM-DD HH:MM:SS>
- 创建者: Architect
- 迭代次数: <N>

## 路径检查清单

### 检查结果
- [ ] 所有 Input 路径格式正确
- [ ] 所有 Output 路径格式正确
- [ ] 无裸文件名

### 路径映射表
| 任务 | Input | Output | 状态 |
|------|-------|--------|------|
| T1 | src/utils/parser.py | src/utils/validator.py | ✓ |
| T2 | C:\Users\Halo\config.yaml | src/config/app.yaml | ✓ |

### 修正记录（如有）
- T3 Input: `utils.py` → `src/module/utils.py` (已修正)

## 任务并行组

### 并行组 1
- T1, T2, T3 (互不依赖)

### 并行组 2
- T4 (依赖 T1)
- T5 (依赖 T1)

## 执行顺序
1. T1, T2, T3 并行执行
2. T4, T5 等待 T1 完成
3. T6 并行执行
```

### 4.2 字段说明

| 字段 | 说明 |
|------|------|
| 路径检查清单 | Architect 预先检查任务路径格式是否正确 |
| 路径映射表 | 任务与文件路径的对应关系 |
| 修正记录 | 裸文件名被修正为正确路径的记录 |
| 任务并行组 | 可并行执行的任务分组 |
| 执行顺序 | 任务的执行先后依赖关系 |

### 4.3 路径检查流程

1. **预检查**：Architect 创建执行计划时，检查所有 Input/Output 路径格式
2. **修正**：将裸文件名修正为仓库根目录相对路径
3. **记录**：在修正记录中标注原始值和修正后值
4. **确认**：Master 调度前再次确认路径正确性

---

## 五、context.md 格式

### 5.1 模板

```markdown
# Context

## 当前状态
- 活跃任务: T1, T2
- 已完成任务: T3, T4
- 失败任务: T5

## 历史决策
- <YYYY-MM-DD HH:MM:SS>: T1 改为 Coder 执行（原为 Researcher）
- <YYYY-MM-DD HH:MM:SS>: T5 因资源不足延后

## 共享数据
- API版本: v1.0
- 数据库配置: 已确定
- <其他执行者需要的信息>
```

### 5.2 更新规则

- 执行者完成任务后更新
- 状态变更时更新
- 重要决策时更新

---

## 六、scores.md 格式

### 6.1 模板

```markdown
# Workflow 评分记录

## 评分历史

| 迭代 | Reviewer | Reflector | 最终得分 | 通过 |
|------|----------|-----------|----------|------|
| 1 | 85 | 88 | 86.0 | 否 |
| 2 | 92 | 90 | 91.4 | 是 |

## 最终结果
- 最终迭代次数: 2
- 最终得分: 91.4
- 通过状态: 通过 (≥90)
- 验证时间: <时间>
```

---

## 七、iterations/iteration_N.md 格式

### 7.1 模板

```markdown
# Iteration N

## 基本信息（Master写入）
- 开始时间: <时间>
- 结束时间: <时间>
- 持续时间: <时长>

## 任务执行（Master写入）
| 任务 | 执行者 | 状态 | 耗时 | 输出 |
|------|--------|------|------|------|
| T1 | Coder | completed | 120s | file.py |
| T2 | Tester | failed | 60s | - |

## 评分区域（Reviewer写入，禁止其他Agent修改）
- 正确性: X/25 [扣分理由]
- 可读性: X/20 [扣分理由]
- 完整性: X/20 [扣分理由]
- 性能: X/15 [扣分理由]
- 安全性: X/10 [扣分理由]
- 规范性: X/10 [扣分理由]
- **Reviewer总分: XX/100**
- 改进建议:
  1. <建议1>
  2. <建议2>

## 复盘区域（Reflector写入，禁止其他Agent修改）
- 流程效率: X/100 [说明]
- 协作质量: X/100 [说明]
- 问题预防: X/100 [说明]
- 经验沉淀: X/100 [说明]
- **Reflector总分: XX/100**
- 改进建议:
  1. <建议1> (优先级：高/中/低)
  2. <建议2>

## 迭代结论（Master写入）
- 最终得分: XX/100（Reviewer得分×0.7 + Reflector得分×0.3）
- 通过/未通过
- 是否继续迭代
```

---

## 八、workflow_changelog.md 格式（只写不读）

### 8.1 定位

- **用途**：记录工作流本身的增量修改历史，供长期追溯
- **写入者**：Master
- **读取者**：**禁止 Agent 读取**（避免上下文溢出）
- **写入方式**：追加，不覆盖历史
- **位置**：`.agent_workflow/workflow_changelog.md`

### 8.2 模板

```markdown
## <YYYY-MM-DD HH:MM:SS> - 迭代N/版本V

### 修改类型
[新增功能] / [缺陷修复] / [流程优化] / [约束变更] / [文档更新]

### 修改范围
- 文件/模块：
- 涉及的 Agent：

### 修改内容
<具体修改描述>

### 修改原因
<触发此次修改的问题或需求>

### 影响评估
<对工作流的影响>

---
（下一条记录追加在此下方）
```

### 8.3 写入时机

| 时机 | 内容 |
|------|------|
| 新功能引入 | 记录功能名称、适用范围 |
| 约束变更 | 记录旧约束 → 新约束 |
| 流程优化 | 记录优化点、预期效果 |
| 缺陷修复 | 记录问题根因、修复方案 |

### 8.4 约束

- **禁止** Agent 读取此文件
- Master 每次写入后自动追加，不删除或修改历史
- 内容保持简洁，避免重复

---

## 九、状态文件维护规则

### 9.1 更新时机

| 文件 | 更新时机 | 更新者 |
|------|----------|--------|
| meta.md | 工作流开始/结束 | Master |
| task_list.md | 任务状态变更 | 执行者 |
| execution_plan.md | 执行计划创建/重大调整 | Architect |
| context.md | 任务完成/重要决策 | 执行者 |
| project_exploration.md | 首次探索生成/增量更新 | ProjectExplorer | Master 检测变动并调度 |
| scores.md | 评分完成 | Reviewer |
| iterations/iteration_N.md | 每次迭代结束时（评分后、决定继续前） | Master |
| workflow_changelog.md | 工作流本身发生修改时（新增功能/约束变更/流程优化/缺陷修复） | Master |

### 8.2 维护原则

- 保持文件最新状态
- 记录关键时间点
- 保留历史记录
- 便于追溯和复盘
- **路径规范**：Input/Output 必须使用正确路径格式；仓库内用相对路径，仓库外用绝对路径；禁止裸文件名

---

## 十、project_exploration.md 维护规则

### 10.1 定位
- **用途**：持久化存储项目结构探索结果，供后续对话复用
- **写入者**：ProjectExplorer
- **读取者**：所有 Agent（推荐优先读取）
- **维护者**：Master（触发检测）、ProjectExplorer（执行更新）

### 10.2 维护时机

| 时机 | 触发者 | 动作 |
|------|--------|------|
| 工作流启动时 | Master | 检查文件存在性和 git_head |
| 执行者任务完成时 | Master | 检测变更，决定是否触发更新 |
| 手动 [explore] 标签 | 任意 | 全面重扫 |

### 10.3 增量更新 vs 全量更新

| 条件 | 更新方式 |
|------|----------|
| 项目首次探索 | 全量更新 |
| git diff 显示显著目录/文件变更 | 全量更新 |
| git diff 显示 ≤阈值文件变更 | 增量更新 |
| 无 git diff（新对话直接复用） | 无需更新 |

### 10.4 约束
- **复用优先**：已有报告时禁止全量重写
- **版本递增**：每次更新必须递增 report_version
- **日志追加**：增量更新必须追加到变更日志，禁止覆盖

### 10.5 读取范围限制
- **增量更新记录**：Agent 读取时**只读取最新一条**（`## 增量更新记录` 中的首条），用于了解当前项目状态
- **完整变更日志**：仅供审计追溯，Agent **禁止**读取
- **原因**：避免上下文溢出和理解冲突
