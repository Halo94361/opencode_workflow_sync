---
name: cross-platform-check
description: 检查 MCU/Linux/core_driver 跨平台代码兼容性
---

## What I do
- 检测平台特定代码（`#ifdef`, `__linux__`, `STM32` 等）
- 验证 core_driver 平台无关性
- 检查数据类型兼容性
- 识别潜在的跨平台问题

## When to use me
Use this skill when you need to:
- 修改 core_driver 代码后验证平台无关性
- 合并 MCU 和 Linux 代码时检查兼容性
- 确保代码可在不同编译器/平台上编译
- 验证是否符合 AGENTS.md 中的平台约束

## Workflow

### Phase 1: 平台特定代码扫描
1. 搜索平台相关模式：
   ```
   #ifdef|#ifndef|#if defined
   __linux__|__GNUC__|_MSC_VER
   STM32|HAL_|LL_
   <linux/|<sys/|<pthread
   ```

### Phase 2: core_driver 平台无关性检查
1. 扫描 `core_driver/` 目录
2. 验证是否包含平台特定头文件
3. 检查是否使用平台特定 API（malloc, free, printf 等）

### Phase 3: 数据类型检查
1. 验证是否使用固定宽度类型（`int32_t`, `uint16_t` 等）
2. 检查是否依赖编译器默认类型宽度
3. 识别潜在的类型转换问题

### Phase 4: 报告输出
1. 汇总发现的平台问题
2. 输出影响分析
3. 提供修改建议

## Output Format

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

## Project Rules (from AGENTS.md)
必须检查以下规则：
1. core_driver 禁止引入平台特定头文件
2. 局部变量声明必须放在代码块开头
3. 必须使用 `<stdint.h>` 固定宽度类型
4. 禁止 VLA 和隐式函数声明
5. core_driver 禁止 malloc/free

## Example Usage
User: "帮我检查 your_project/core_driver/ 的平台兼容性"

Agent actions:
1. Load skill: `skill({ name: "cross-platform-check" })`
2. 扫描 core_driver 目录
3. 检查平台特定代码
4. 验证是否符合 AGENTS.md 规则
5. 输出检查报告
