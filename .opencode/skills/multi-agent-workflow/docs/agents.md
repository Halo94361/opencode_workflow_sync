# Agent 角色详细说明

---

## 一、Agent 角色

| 角色 | Mode | 职责 | 触发时机 | 输出产物 |
|------|------|------|----------|----------|
| Master | primary | 接收需求、调度协调、用户交互 | 用户提交需求时 | meta.md |
| Architect | primary | 任务拆解、标签匹配、API结构审查 | Master调用时 | task_list.md |
| ProjectExplorer | subagent | 项目探索、结构分析、技术栈识别 | 自动触发(已有项目) | project_exploration.md |
| Coder | subagent | 代码实现(多语言) | Architect分配任务时 | 代码文件 |
| Researcher | subagent | 技术调研、方案分析 | Architect分配任务时 | 调研报告 |
| Tester | subagent | 测试编写与执行 | Architect分配任务时 | 测试报告 |
| DevOps | subagent | 部署配置、环境设置 | Architect分配任务时 | 部署脚本 |
| DataProcessor | subagent | 数据处理、格式转换 | Architect分配任务时 | 处理数据 |
| SecurityExpert | subagent | 安全审查、漏洞检测 | Architect分配任务时 | 安全报告 |
| PerformanceEngineer | subagent | 性能分析、瓶颈定位、优化建议 | Architect分配任务时 | 性能报告 |
| IntegrationEngineer | subagent | API设计、接口规范、系统集成 | Architect分配任务时 | api_contract.md |
| UXUIDesigner | subagent | 界面设计、用户体验优化 | Architect分配任务时 | 设计文档 |
| Reviewer | subagent | 质量评分（权重0.7） | 执行循环结束时 | scores.md |
| Reflector | subagent | 复盘建议（权重0.3） | Reviewer评分后 | 复盘报告 |
| Docer | subagent | 文档生成 | 需要文档时 | 技术文档 |

---

## 二、Master Agent 详细说明

### 职责
- 接收并解析用户需求
- 调用 Architect 进行任务拆解
- 向用户展示执行计划，等待确认
- 根据计划调度执行者
- 监控执行状态，处理异常

### 项目检测
- 检测是否为已有项目
- 已有项目自动触发项目探索流程

### 调度原则
- 同一标签任务可并行执行（上限3个）
- 独立任务优先调度
- 依赖任务按顺序调度

### 输出格式

```markdown
## 调度报告

### 任务分配
| 任务 | 执行者 | 状态 | 备注 |
|------|--------|------|------|
| T1 | Coder | pending | |
| T2 | Researcher | running | |
```

---

## 三、Architect Agent 详细说明

### 职责
- 分析用户需求，理解业务目标
- 按模块拆解任务
- 标注任务标签
- 规划并行策略
- 审查 API 结构

### 项目探索任务分配
- 根据项目规模分配探索任务
- 大型项目分段探索
- 防止上下文溢出

### 输出格式

```markdown
## task_list.md 格式

# Task List

## T1 - <任务名>
- Status: PENDING / IN_PROGRESS / COMPLETED / FAILED
- Assigned: <执行者>
- Tag: [<标签>]
- Description: <详细描述>
- Input: <仓库根目录相对路径>  # 仓库内：src/utils.py，仓库外：C:\Users\...\config.yaml
- Output: <仓库根目录相对路径> # 仓库内：src/utils.py，仓库外：C:\Users\...\config.yaml
- Start Time: <时间>
- End Time: <时间>
- Duration: <耗时>
```

---

## 四、ProjectExplorer Agent 详细说明

### 职责
- 探索项目目录结构
- 识别技术栈和框架
- 分析代码架构和模块关系
- 识别依赖关系
- 生成项目探索报告

### 触发条件
- 项目目录存在非空 src/、lib/、drivers/ 等目录
- 存在构建文件（Makefile/CMakeLists.txt/build.gradle等）
- 存在版本控制（.git目录）
- 用户未明确说明是新项目

### 输出格式

```markdown
## 项目探索报告

### 项目基本信息
- 项目名称:
- 项目类型:
- 技术栈:

### 目录结构
<目录树>

### 核心模块分析
| 模块 | 路径 | 职责 |
|------|------|------|

### 依赖关系
<依赖图>

### 探索者工作分配建议
| 区域 | 执行者 | 优先级 |
|------|--------|--------|
```

---

## 五、Coder Agent 详细说明

### 职责
- 根据 execution_plan.md 执行代码任务
- 编写清晰、可维护的业务代码
- 遵守项目代码规范
- 完成指派的任务后报告给 Master

### 支持的语言

| 语言 | 典型场景 | 关键技能 |
|------|----------|----------|
| Python | 后端服务、数据处理、脚本 | Django/Flask, pandas, asyncio |
| C | 系统编程、嵌入式、驱动 | 指针、内存管理、寄存器配置 |
| C++ | 高性能、游戏引擎 | STL、模板、设计模式 |
| 嵌入式C | 裸机开发、RTOS、驱动 | HAL, FreeRTOS, STM32, ESP32 |
| JavaScript/TS | 前端、Node.js, Electron | React/Vue/Express |
| Go | 云原生、微服务 | Gin, k8s客户端 |
| Rust | 系统编程、WebAssembly | 所有权、生命周期 |

### 输出格式

```markdown
## 执行报告

### T1 - 任务名
- Status: completed / failed
- 执行者: <name>
- 耗时: <时间>
- Input: <实际使用的完整路径>
- Output: <实际使用的完整路径>
```

---

## 六、执行者 Agent 通用说明

### 执行动作

1. **读取上下文**
   - 读取 execution_plan.md
   - 读取 context.md（共享状态）

2. **执行任务**
   - 按质完成指派任务
   - 记录执行进度

3. **更新状态**
   - 更新 context.md
   - 如实报告给 Master

### 输出格式

```markdown
## 执行报告

### T1 - 任务名
- Status: completed / failed
- 执行者: <name>
- 耗时: <时间>
- Input: <实际使用的完整路径>
- Output: <实际使用的完整路径>
- 问题: <如有>
```

---

## 七、Reviewer Agent 详细说明

### 职责
- 收集产物（代码、测试报告、文档）
- 逐维度评分

### 评分维度

| 维度 | 满分 | 评分要点 |
|------|------|----------|
| 正确性 | 25 | 代码逻辑正确、符合需求、边界处理 |
| 可读性 | 20 | 结构清晰、命名规范、注释适当 |
| 完整性 | 20 | 功能覆盖完整、异常处理、边界条件 |
| 性能 | 15 | 时间效率、空间效率、资源占用 |
| 安全性 | 10 | 无注入风险、无敏感泄露、安全加固 |
| 规范性 | 10 | 符合项目惯例，最佳实践，编码规范 |

### 输出格式

```markdown
## Reviewer 评分报告

### 各维度评分
- 正确性: X/25 [扣分理由]
- 可读性: X/20 [扣分理由]
- 完整性: X/20 [扣分理由]
- 性能: X/15 [扣分理由]
- 安全性: X/10 [扣分理由]
- 规范性: X/10 [扣分理由]

### 总分: XX/100

### 改进建议
1. [建议1]
2. [建议2]
```

---

## 八、Reflector Agent 详细说明

### 职责
- 流程评估（执行效率、规范性）
- 问题识别（流程问题、协作问题）
- 改进建议（针对性建议、优先级排序）

### 输出格式

```markdown
## Reflector 复盘报告

### 流程评估
- 执行效率: X/100
- 规范性: X/100

### 改进建议
1. [建议1] (优先级：高/中/低)
2. [建议2]

### 最终评分: XX/100
```
