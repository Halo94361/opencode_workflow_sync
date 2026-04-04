---
name: multi-agent-workflow
description: 当用户提出复杂任务需求、要求多步骤协作、提到"使用协同工作流"、"帮我规划这个项目"或Master Agent接收用户需求时触发。适用于多Agent协同任务，不适用于简单单步问答。
version: 1.0.0
---

## 概述

这是一个多Agent协同工作流调度框架。接收复杂任务需求，协调多个专业Agent（Architect、Coder、Reviewer等）分工协作，通过迭代执行和评分机制确保任务质量。

## 前置要求

- 输入：用户提交的复杂任务需求
- 权限：可创建和修改`.agent_workflow/`目录下的状态文件
- 环境：Git仓库（用于项目探索）

## 执行流程

| 步骤 | 名称 | 输入 | 输出 | 说明 |
|------|------|------|------|------|
| 1 | 接收需求 | 用户需求描述 | 触发判断 | Master判断是否触发协同工作流 |
| 2 | 项目探索 | 项目根目录 | `.agent_workflow/project_exploration.md` | 自动检测已有项目，复用已有报告 |
| 3 | 任务拆解 | 用户需求、project_exploration | `.agent_workflow/task_list.md` | Architect分析并生成任务列表 |
| 4 | 用户确认 | task_list.md | 用户批准/修改/取消 | 展示任务拆解，等待用户确认 |
| 5 | 执行循环 | task_list、用户确认 | 迭代记录、最终产出 | 最多3次迭代 |
| 6 | 结果汇总 | 所有迭代记录 | 执行报告 | 向用户汇报最终结果 |

### 执行循环详细说明

1. 调度执行者执行任务（按architect.md中的任务标签映射表分配）
2. Reviewer评分（权重0.7，评估代码质量）→ Reflector评分（权重0.3，评估流程质量）（串行执行）
3. **评分计算**：`最终评分 = Reviewer得分 × 0.7 + Reflector得分 × 0.3`
4. 评分≥90终止，否则继续迭代
5. **无进展检测**：连续2次迭代评分变化<2分时，触发无进展警告，需向用户求助

### 异常处理

| 异常场景 | 处理方式 |
|----------|----------|
| 执行者任务失败 | Master记录失败原因，继续执行其他并行任务，本轮迭代结束后评估是否重试 |
| 所有执行者任务失败 | 直接终止迭代，向用户报告 |
| 用户确认超时（>30分钟） | Master发送提醒，超过60分钟则暂停工作流 |

## 输出格式

| 迭代 | 评分 | 状态 |
|------|------|------|
| 1 | XX | 通过/需改进 |
| 2 | XX | 通过/需改进 |
| 3 | XX | 终止 |

最终产出：优化后的代码/文档 + 工作流执行报告

## Gotchas

- ⚠️ **任务拆解粒度**：拆解到模块级，避免过细导致上下文溢出，过粗导致质量下降
- ⚠️ **并行任务上限**：同类任务（相同职责Agent）最多3个并行，Master负责调度防止溢出
- ⚠️ **评分阈值**：连续2次迭代评分变化<2分时，触发无进展警告，需向用户求助
- ⚠️ **API设计前置**：涉及API/接口时，必须先完成API契约设计，Coder禁止提前编码
- ⚠️ **项目探索复用**：已有`.agent_workflow/project_exploration.md`时必须先读取复用，禁止直接全量探索
- ⚠️ **changelog由Master写入**：workflow_changelog.md仅Master可写入，Agent通过Master提取关键信息
- ⚠️ **路径规范**：使用`{baseDir}`引用路径，禁止硬编码绝对路径

### 文档实时性强制约束

**⚠️ 禁止跳过文档更新：各环节Agent完成操作后必须立即更新对应状态文件，禁止进入下一阶段后再补写**

| 文件 | 维护者 | 更新时机 | 禁止行为 |
|------|--------|----------|----------|
| `.agent_workflow/meta.md` | Master | 每次迭代开始/结束 | 禁止跳过状态更新 |
| `.agent_workflow/context.md` | 各Agent | 每次任务交接/状态变更 | 各Agent仅追加自身状态，禁止修改其他Agent内容 |
| `.agent_workflow/workflow_changelog.md` | Master | 每次工作流行为后 | 仅Master写入，Agent通过Master提取 |
| `.agent_workflow/iterations/iteration_N.md` | Master统筹 | 每次迭代结束后 | Master写入执行记录，Reviewer写入评分区域，Reflector写入复盘区域，各区域互不覆盖 |

**验证机制**：
- Master在任务交接前必须验证状态文件一致性
- 状态文件时间戳与实际执行时间偏差超过5分钟时，触发警告
- 警告后必须补全文档后才能继续执行

**违反处理**：若文档未实时更新，工作流状态将不一致，后续Agent可能基于过期信息决策，导致任务失败。此时必须回溯并补全文档后才能继续。

### context.md 大小控制

**⚠️ 避免context.md无限膨胀**

- 每次迭代开始时，Master清理上一次迭代的临时数据
- 仅保留：当前任务状态、最近2次迭代的关键决策、共享数据
- 超过500行时，Master必须归档旧内容并创建新文件

### 迭代记录归档规则

**⚠️ 新任务启动时：必须归档旧迭代记录，禁止直接清空**

- 执行时机：用户确认启动新任务后、第一次迭代开始前
- 执行者：Master
- 归档操作：
  1. 确保`.agent_workflow/iterations_archive/`目录存在
  2. 在`iterations_archive/`下创建时间戳子目录：`YYYYMMDD_HHmmss_old_task_name/`
  3. 将`.agent_workflow/iterations/`下的所有文件移动到该子目录
  4. 清空`.agent_workflow/iterations/`目录
- 追溯方式：通过`.agent_workflow/workflow_changelog.md`中的任务ID关联归档目录
- **禁止**：直接删除旧记录或覆盖

### workflow_changelog.md增量更新规则

**⚠️ workflow_changelog.md始终维护增量更新：每次工作流行为后立即写入本次工作总结**

- 写入权限：仅Master
- 读取权限：Agent需要历史信息时，通过Master读取并提取相关部分
- 格式要求：每次写入包含时间戳、代理、操作、结果四要素
- 增量原则：不删除历史记录，仅追加新条目

**文件大小控制**：
- 当文件超过2000行或50KB时，触发归档（放宽阈值，减少频繁重写）
- 归档操作：压缩当前文件为`workflow_changelog_YYYYMMDD.tar.gz`，创建新文件
- 文件头部保留最近10条记录的摘要（预留15行空间）

**快速索引表格式**：
```markdown
| 起始行 | 时间 | 任务 | 评分 | 状态 |
|--------|------|------|------|------|
| XX | YYYY-MM-DD | 任务名 | XX分 | 状态 |
```

**完整记录格式**：
```markdown
### Task: [任务名]
**起始行**: XX | **时间**: YYYY-MM-DD | **评分**: XX分 | **状态**: 状态

#### 执行概要
- **任务类型**: xxx
- **迭代次数**: X
- **最终评分**: XX分

#### 代理调用记录
| 时间 | 代理 | 操作 | 结果 |
|------|------|------|------|
| YYYY-MM-DD | xxx | xxx | xxx |

#### 关键决策
1. 决策点1
2. 决策点2

#### 产出文件
- 文件1
- 文件2
```

## 术语表

| 术语 | 说明 |
|------|------|
| Master | 主调度代理，负责协调整个工作流 |
| Architect | 架构师代理，负责任务拆解和API审查 |
| Project-explorer | 项目探索者，负责项目文件夹的结构和内容探索 |
| Coder | 编码代理，负责代码实现 |
| Reviewer | 审查代理，负责质量评分（权重0.7） |
| Reflector | 复盘代理，负责迭代决策（权重0.3） |
| iteration | 迭代，一次完整的执行-评分循环 |
| task_list | 任务列表，由Architect生成 |
| context | 共享上下文，各Agent维护的状态信息 |

## 版本规范

采用语义化版本`major.minor.patch`：

| 版本类型 | 适用场景 |
|----------|----------|
| patch | Bug修复、文档更新 |
| minor | 新增功能（向后兼容） |
| major | 破坏性变更 |

当前版本：1.0.0

## 相关资源

### 参考文档
- `docs/skill-writing-guide.md` - 优秀Skill写作指导
- `docs/agent-build-assist.md` - Agent编写规范
- `docs/multi-agent-workflow-framework.md` - Multi-Agent工作流框架

### 工作流状态文件
| 文件 | 用途 |
|------|------|
| `.agent_workflow/meta.md` | 工作流元数据 |
| `.agent_workflow/context.md` | 共享上下文 |
| `.agent_workflow/workflow_changelog.md` | 变更日志 |
| `.agent_workflow/iterations/` | 迭代记录 |
| `.agent_workflow/project_exploration.md` | 项目探索报告 |