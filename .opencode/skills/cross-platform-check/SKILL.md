---
name: cross-platform-check
description: 当用户要求检查代码的平台兼容性、验证跨平台性、合并MCU和Linux代码或提出"检查平台约束"时触发。适用于core_driver平台无关性验证，不适用于新项目架构设计。
allowed-tools:
  - read
  - grep
  - glob
version: 1.0.0
---

## 概述

检测平台特定代码（`#ifdef`, `__linux__`, `STM32`等）。验证core_driver平台无关性。检查数据类型兼容性。识别潜在的跨平台问题。

## 前置要求

- 输入：待检查的代码目录或文件
- 背景：了解项目的平台目标（MCU、Linux等）
- 参考：AGENTS.md中的平台约束规则

## 执行流程

### Phase 1: 平台特定代码扫描
1. 搜索平台相关模式：
   ```
   #ifdef|#ifndef|#if defined
   __linux__|__GNUC__|_MSC_VER
   STM32|HAL_|LL_
   <linux/|<sys/|<pthread
   ```

### Phase 2: core_driver平台无关性检查
1. 扫描`core_driver/`目录
2. 验证是否包含平台特定头文件
3. 检查是否使用平台特定API（malloc, free, printf等）

### Phase 3: 数据类型检查
1. 验证是否使用固定宽度类型（`int32_t`, `uint16_t`等）
2. 检查是否依赖编译器默认类型宽度
3. 识别潜在的类型转换问题

### Phase 4: 报告输出
1. 汇总发现的平台问题
2. 输出影响分析
3. 提供修改建议

## 输出格式

```markdown
# Cross-Platform Check Report

## Summary
- **Files Scanned**: [count]
- **Platform Issues**: [count]
- **core_driver Violations**: [count]

## Platform-Specific Code

### Linux-Specific
- [file:line]: [code snippet]
  - **Impact**: [描述影响]
  - **Fix**: [修改建议]

### MCU-Specific
- [file:line]: [code snippet]
  - **Impact**: [描述影响]
  - **Fix**: [修改建议]

## core_driver Violations
- [file:line]: [violation description]
  - **Rule**: [AGENTS.md 规则引用]
  - **Fix**: [修改建议]

## Data Type Issues
- [file:line]: [type issue]
  - **Fix**: [建议使用固定宽度类型]
```

## Gotchas

- ⚠️ **条件编译检查**：不仅检查`#ifdef`，还要检查`#if defined()`等多行条件编译
- ⚠️ **数据类型兼容性**：char/short/int等默认类型宽度在不同平台不同，必须使用`<stdint.h>`固定宽度类型
- ⚠️ **隐式转换**：检查不同宽度类型之间的隐式转换，可能导致数据丢失或符号错误
- ⚠️ **core_driver严格禁止**：平台特定API（malloc/free/printf/linux头文件）绝对禁止出现在core_driver目录
- ⚠️ **编译器扩展**：某些编译器特有的关键字（如`__attribute__`）也是平台相关
- ⚠️ **字节序问题**：不同平台的字节序不同，涉及硬件寄存器和协议解析时需特别注意
- ⚠️ **跨平台编译测试**：发现问题后应在目标平台实际编译验证，不仅仅是代码审查

## 术语表

| 术语 | 说明 |
|------|------|
| core_driver | 平台无关的核心驱动层代码 |
| 平台特定代码 | 依赖特定操作系统或硬件的代码（如`#ifdef __linux__`） |
| 固定宽度类型 | `<stdint.h>`定义的int32_t、uint16_t等类型 |
| 字节序 | 多字节数据的存储顺序（大端/小端） |

## 版本规范

采用语义化版本`major.minor.patch`：

| 版本类型 | 适用场景 |
|----------|----------|
| patch | Bug修复、文档更新 |
| minor | 新增检测规则（向后兼容） |
| major | 破坏性变更 |

当前版本：1.0.0

## 相关资源

### 参考文档
- `docs/skill-writing-guide.md` - 优秀Skill写作指导
- `docs/agent-build-assist.md` - Agent编写规范
- `AGENTS.md` - 项目Agent规范（包含平台约束规则）

### 相关Skill
- `multi-agent-workflow` - 协同工作流框架
- `code-review` - 代码审查（可结合使用）