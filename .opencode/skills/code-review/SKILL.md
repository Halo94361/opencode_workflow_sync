---
name: code-review
description: 当用户要求代码审查、代码质量评估、安全审计、性能分析或提出"SOLID原则"、"帮我看看代码"时触发。适用于Python/C/嵌入式项目的增量审查，不适用于架构设计评审。
allowed-tools:
  - read
  - grep
  - glob
version: 1.0.0
---

## 概述

分析代码结构、逻辑、性能和最佳实践。发现潜在bug、内存泄漏、空指针等问题。检查编码规范（命名、缩进、注释）。提供具体修复建议和改进建议。

## 前置要求

- 输入：待审查的代码文件或目录路径
- 权限：读取代码文件的权限
- 背景：了解代码功能上下文（可选）

## 执行流程

| 步骤 | 名称 | 输入 | 输出 | 说明 |
|------|------|------|------|------|
| 1 | 代码定位 | 代码目录/文件 | 文件列表、审查范围 | 扫描目录、识别相关文件(.c/.h/.py)、确定范围 |
| 2 | 深度审查 | 文件列表 | 问题列表 | 逻辑正确性、类型安全、内存管理、中断安全、性能瓶颈、编码规范 |
| 3 | 报告输出 | 问题列表 | 审查报告 | 汇总分级(Critical/Warning/Info)、提供修复建议 |

## 输出格式

```markdown
# Code Review Report

## Summary
- **File(s)**: [reviewed files]
- **Issues Found**: [count]
- **Critical**: [count]
- **Warning**: [count]
- **Info**: [count]

## Issues

### Critical
- **[file:line]**: [issue description]
  - **Fix**: [suggested fix]

### Warning
- **[file:line]**: [issue description]
  - **Fix**: [suggested fix]

### Info
- **[file:line]**: [issue description]
  - **Fix**: [suggested fix]
```

## Gotchas

- ⚠️ **嵌入式代码中断安全**：禁止在ISR中使用malloc/free，注意中断优先级和嵌套
- ⚠️ **内存泄漏检测**：检查所有malloc是否有对应的free，特别注意异常路径
- ⚠️ **平台无关性**：core_driver层禁止使用平台特定API，确保跨平台兼容
- ⚠️ **总线通信超时**：检查I2C/SPI/UART等总线的超时处理是否完善
- ⚠️ **类型规范**：统一使用`<stdint.h>`类型（uint8_t、int32_t等），避免使用char/short等
- ⚠️ **增量审查**：聚焦新增或修改的代码，避免过度审查已有代码
- ⚠️ **边界条件**：特别注意数组边界、指针NULL检查、除零等常见陷阱

## 术语表

| 术语 | 说明 |
|------|------|
| ISR | Interrupt Service Routine，中断服务程序 |
| 增量审查 | 仅审查新增或修改的代码，而非全量代码 |
| Critical | 严重问题，必须立即修复 |
| Warning | 警告问题，建议修复 |

## 版本规范

采用语义化版本`major.minor.patch`：

| 版本类型 | 适用场景 |
|----------|----------|
| patch | Bug修复、文档更新 |
| minor | 新增审查规则（向后兼容） |
| major | 破坏性变更 |

当前版本：1.0.0

## 相关资源

### 参考文档
- `docs/skill-writing-guide.md` - 优秀Skill写作指导
- `docs/agent-build-assist.md` - Agent编写规范

### 相关Skill
- `multi-agent-workflow` - 协同工作流框架
- `bug-diagnosis` - Bug诊断（发现问题时可触发）
- `cross-platform-check` - 跨平台检查（可结合使用）