---
name: code-review
description: 对源代码进行系统性审查，评估代码质量、可维护性、安全性和性能，输出改进建议和最佳实践建议
---

## What I do
- 分析代码结构、逻辑、性能和最佳实践
- 发现潜在 bug、内存泄漏、空指针等问题
- 检查编码规范（命名、缩进、注释）
- 提供具体修复建议和改进建议

## When to use me
Use this skill when you need to:
- 审查新增或修改的代码
- 进行代码质量评估
- 发现潜在问题和优化点
- 验证代码是否符合项目规范（AGENTS.md）

## Workflow

### Phase 1: 代码定位
1. 扫描目标代码目录
2. 识别相关文件（`.c`, `.h`, `.py`, etc.）
3. 确定审查范围

### Phase 2: 深度审查
1. 进行严格审查：
   - 代码逻辑正确性
   - 类型安全和边界条件
   - 内存管理和资源释放
   - 并发/中断安全（针对嵌入式）
   - 性能瓶颈检测

### Phase 3: 报告输出
1. 汇总发现的问题
2. 按严重程度分级（Critical/Warning/Info）
3. 提供具体修复建议
4. 输出到控制台或保存为报告文件

## Output Format

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

## Project-Specific Rules
对于 YourProject_API 项目，特别关注：
- core_driver 平台无关性（禁用平台特定 API）
- ISR 安全性（禁止 malloc/free）
- 总线通信超时控制
- 统一使用 `<stdint.h>` 类型

## Example Usage
User: "帮我审查 your_project/core_driver/xxx_core.c"

Agent actions:
1. Load skill: `skill({ name: "code-review" })`
2. 定位文件并读取内容
3. 严格审查代码
4. 输出审查报告
