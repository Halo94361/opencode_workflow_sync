---
name: bug-diagnosis
description: 解析错误日志（编译错误/运行时崩溃/通信超时等），定位问题根因并提供具体的修复方案和预防措施
---

## What I do
- 解析编译错误、链接错误、运行时错误
- 分析调用栈（Stack Trace）定位问题位置
- 诊断寄存器/内存状态（嵌入式场景）
- 提供根因分析和修复建议

## When to use me
Use this skill when you need to:
- 分析编译错误信息
- 诊断运行时 crash 或异常
- 定位逻辑错误和边界问题
- 调试通信问题（I2C/SPI超时等）

## Workflow

### Phase 1: 错误信息解析
1. 解析用户提供的错误日志
2. 提取关键错误模式：
   - 编译错误：语法错误、类型不匹配、未定义符号
   - 链接错误：符号重复定义、未找到库
   - 运行时错误：段错误、总线错误、超时

### Phase 2: 代码定位
1. 搜索相关代码
2. 定位错误发生的位置
3. 分析上下文和调用关系

### Phase 3: 根因分析
1. 进行多角度分析：
   - 逻辑分析：条件判断、循环边界
   - 内存分析：缓冲区溢出、悬空指针
   - 时序分析：中断优先级、竞态条件
   - 硬件分析：寄存器配置、外设初始化

### Phase 4: 修复建议
1. 输出根因报告
2. 提供复现步骤
3. 给出修复建议和预防措施

## Output Format

```markdown
# Bug Diagnosis Report

## Error Information
- **Error Type**: [compile/link/runtime]
- **Error Message**: [original error message]
- **Location**: [file:line or stack trace]

## Root Cause Analysis
[详细分析错误原因]

## Related Code
```c
// 相关代码片段
```

## Fix Suggestion
1. [修复步骤 1]
2. [修复步骤 2]

## Prevention
- [预防措施 1]
- [预防措施 2]
```

## Embedded-Specific Patterns
对于嵌入式开发，关注：
- I2C/SPI 通信超时
- 中断处理函数中的资源竞争
- 堆栈溢出
- 看门狗复位原因
- 寄存器配置错误

## Example Usage
User: "编译报错 undefined reference to `xxx_project_init'"

Agent actions:
1. Load skill: `skill({ name: "bug-diagnosis" })`
2. 解析错误信息，识别为链接错误
3. 搜索 xxx_project_init 定义
4. 分析可能原因（未包含头文件、库路径问题等）
5. 输出诊断报告和修复建议
