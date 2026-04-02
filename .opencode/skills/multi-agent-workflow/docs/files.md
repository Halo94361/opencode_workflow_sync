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

## 基本信息
- 开始时间: <时间>
- 结束时间: <时间>
- 持续时间: <时长>

## 任务执行
| 任务 | 执行者 | 状态 | 耗时 | 输出 |
|------|--------|------|------|------|
| T1 | Coder | completed | 120s | file.py |
| T2 | Tester | failed | 60s | - |

## 评分
- Reviewer: XX/100
- Reflector: XX/100
- 最终: XX/100

## 改进建议
1. <建议1>
2. <建议2>

## 迭代结论
- 通过/未通过
- 是否继续迭代
```

---

## 八、状态文件维护规则

### 8.1 更新时机

| 文件 | 更新时机 | 更新者 |
|------|----------|--------|
| meta.md | 工作流开始/结束 | Master |
| task_list.md | 任务状态变更 | 执行者 |
| context.md | 任务完成/重要决策 | 执行者 |
| scores.md | 评分完成 | Reviewer |

### 8.2 维护原则

- 保持文件最新状态
- 记录关键时间点
- 保留历史记录
- 便于追溯和复盘
- **路径规范**：Input/Output 必须使用正确路径格式；仓库内用相对路径，仓库外用绝对路径；禁止裸文件名
