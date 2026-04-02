---
name: test-generator
description: 当用户提供头文件、函数签名、API接口并要求生成测试用例、测试代码或"帮我写单元测试"时触发。适用于C/Python嵌入式驱动项目，不适用于已经完成测试覆盖的场景。
allowed-tools:
  - read
  - write
version: 1.0.0
---

## 概述

分析API接口（函数签名、参数、返回值）。生成单元测试框架代码。设计边界条件测试用例。生成集成测试场景。

## 前置要求

- 输入：头文件、函数签名或API接口定义
- 环境：测试框架可用（Unity/Google Test等）
- 背景：了解被测代码的功能和用途

## 执行流程

| 步骤 | 名称 | 输入 | 输出 | 说明 |
|------|------|------|------|------|
| 1 | API分析 | 头文件 | 函数列表、参数表 | 分析函数签名、错误码、依赖关系 |
| 2 | 测试用例设计 | 函数列表 | 测试用例集 | 设计正常/边界/异常/错误码测试用例 |
| 3 | 测试代码生成 | 测试用例集 | 测试代码 | 选择框架，生成代码骨架和实现 |

## 输出格式

```markdown
# Test Code: [module_name]

## Test Framework
[Unity / Google Test / Custom]

## Test Cases

### 1. [test_function_name]_normal_flow
- **Description**: 测试正常流程
- **Input**: [输入参数]
- **Expected**: [期望输出]

### 2. [test_function_name]_boundary
- **Description**: 测试边界条件
- **Input**: [边界输入]
- **Expected**: [期望输出]

### 3. [test_function_name]_error
- **Description**: 测试错误处理
- **Input**: [错误输入]
- **Expected**: [期望返回错误码]

## Generated Code
```c
// 测试代码
```
```

## Gotchas

- ⚠️ **嵌入式硬件模拟**：驱动测试中硬件接口需要mock，避免依赖真实硬件
- ⚠️ **时序问题**：嵌入式测试注意时序敏感操作，设置合理的timeout和delay
- ⚠️ **边界条件**：覆盖MAX、MIN、0、NULL、负数等边界值
- ⚠️ **测试独立性**：每个测试用例应独立运行，避免测试间相互依赖
- ⚠️ **异常路径**：测试不仅要覆盖正常路径，也要覆盖错误处理路径
- ⚠️ **覆盖率目标**：争取达到80%以上的代码覆盖率，特别关注分支和异常处理
- ⚠️ **资源释放**：测试中的malloc申请的资源要在teardown中正确释放

## 术语表

| 术语 | 说明 |
|------|------|
| 单元测试 | 对单个函数或模块进行测试 |
| 边界条件 | 最小值、最大值、零值、NULL等特殊输入 |
| mock | 模拟对象，用于替代真实硬件或外部依赖 |
| teardown | 测试清理阶段，用于释放资源 |

## 版本规范

采用语义化版本`major.minor.patch`：

| 版本类型 | 适用场景 |
|----------|----------|
| patch | Bug修复、文档更新 |
| minor | 新增测试用例类型（向后兼容） |
| major | 破坏性变更 |

当前版本：1.0.0

## 相关资源

### 参考文档
- `docs/skill-writing-guide.md` - 优秀Skill写作指导
- `docs/agent-build-assist.md` - Agent编写规范

### 相关Skill
- `multi-agent-workflow` - 协同工作流框架
- `bug-diagnosis` - Bug诊断（发现问题时可触发）
- `code-review` - 代码审查（验证代码质量）