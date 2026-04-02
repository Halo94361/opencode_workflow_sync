---
name: api-docs
description: 当用户提供头文件、函数签名、接口定义并要求生成API文档、"帮我写文档"或"生成使用示例"时触发。适用于C嵌入式驱动/API参考文档生成，不适用于Word/PDF格式需求。
allowed-tools:
  - read
  - write
version: 1.0.0
---

## 概述

分析头文件中的函数声明。提取参数说明、返回值、错误码。生成Markdown/Doxygen格式文档。创建使用示例代码。

## 前置要求

- 输入：头文件（.h）或接口定义文件
- 背景：了解模块的功能和用途
- 输出：目标文档目录（可选）

## 执行流程

| 步骤 | 名称 | 输入 | 输出 | 说明 |
|------|------|------|------|------|
| 1 | 代码分析 | 头文件(.h) | 函数列表、参数表 | 扫描目标头文件，提取函数签名、参数类型、返回值、错误码、数据结构 |
| 2 | 文档生成 | 函数列表、参数表 | 文档初稿 | 生成API概览、函数详细说明、错误码表、使用示例 |
| 3 | 文档输出 | 文档初稿 | 最终文档 | 生成Markdown/Doxygen格式，保存到目标目录 |

## 输出格式

```markdown
# API Documentation: [module_name]

## Overview
[模块功能概述]

## Functions

### xxx_project_init
```c
int32_t xxx_project_init(xxx_project_handle_t *handle, xxx_project_config_t *config);
```

**Description**: 初始化 XXX_PROJECT 设备

**Parameters**:
- `handle`: 设备句柄指针
- `config`: 配置结构体指针

**Returns**:
- `0`: 成功
- `-1`: 参数错误
- `-2`: 通信失败

**Example**:
```c
xxx_project_handle_t handle;
xxx_project_config_t config = { .i2c_addr = 0x52 };
int32_t ret = xxx_project_init(&handle, &config);
if (ret != 0) {
    // error handling
}
```

## Error Codes
| Code | Name | Description |
|------|------|-------------|
| 0 | SUCCESS | 操作成功 |
| -1 | ERR_PARAM | 参数错误 |
| -2 | ERR_COMM | 通信失败 |
| -3 | ERR_TIMEOUT | 超时 |
```

## Gotchas

- ⚠️ **函数签名准确性**：确保函数签名与实际代码完全一致，注意const、指针、数组等修饰符
- ⚠️ **错误码完整性**：错误码定义应与代码实现一致，检查所有返回错误码的分支
- ⚠️ **示例可用性**：示例代码应可直接编译运行，包含完整的错误处理
- ⚠️ **参数说明**：每个参数都要说明其用途、是否可NULL、输入/输出属性
- ⚠️ **嵌入式API特殊性**：驱动API需说明硬件要求（时钟、电源、中断）、阻塞/非阻塞特性
- ⚠️ **线程安全**：如有线程安全要求，必须明确说明
- ⚠️ **Doxygen注释规范**：使用@param、@return、@brief等标准标签，便于生成HTML/PDF文档

## 术语表

| 术语 | 说明 |
|------|------|
| handle | 设备句柄，用于标识和访问设备实例 |
| config | 配置结构体，包含设备初始化参数 |
| 阻塞/非阻塞 | API执行方式，阻塞会等待操作完成才返回 |
| Doxygen | C/C++文档生成工具，支持@标签语法 |

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

### 相关Skill
- `multi-agent-workflow` - 协同工作流框架