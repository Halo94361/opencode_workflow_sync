---
name: test-generator
description: 分析API接口和函数签名，自动生成单元测试和集成测试代码，覆盖正常流程、边界条件和异常处理
---

## What I do
- 分析 API 接口（函数签名、参数、返回值）
- 生成单元测试框架代码
- 设计边界条件测试用例
- 生成集成测试场景

## When to use me
Use this skill when you need to:
- 为新增 API 生成测试代码
- 补充现有测试覆盖
- 设计边界条件和异常测试
- 验证驱动功能正确性

## Workflow

### Phase 1: API 分析
1. 分析目标头文件
2. 提取信息：
   - 函数签名（参数类型、返回值）
   - 错误码定义
   - 依赖关系

### Phase 2: 测试用例设计
1. 设计测试用例：
   - 正常流程测试
   - 边界条件测试
   - 异常输入测试
   - 错误码验证

### Phase 3: 测试代码生成
1. 选择测试框架（Unity / Google Test / 自定义）
2. 生成测试代码骨架
3. 填充测试用例实现

## Output Format

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

## Embedded-Specific Test Patterns
对于嵌入式驱动，关注：
- I2C/SPI 通信超时测试
- 寄存器读写验证
- 中断处理测试
- 电源状态切换测试
- 多设备并发访问测试

## Example Usage
User: "帮我为 xxx_project_api.h 生成测试用例"

Agent actions:
1. Load skill: `skill({ name: "test-generator" })`
2. 读取 xxx_project_api.h 内容
3. 设计测试用例
4. 生成测试代码
5. 输出到 Linux_test_code/ 目录
