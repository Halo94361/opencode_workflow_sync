---
name: api-docs
description: 从代码生成 API 文档和使用示例
---

## What I do
- 分析头文件中的函数声明
- 提取参数说明、返回值、错误码
- 生成 Markdown / Doxygen 格式文档
- 创建使用示例代码

## When to use me
Use this skill when you need to:
- 为新 API 生成文档
- 更新现有 API 文档
- 创建使用示例
- 生成对外交付文档

## Workflow

### Phase 1: 代码分析
1. 扫描目标头文件
2. 提取信息：
   - 函数声明和签名
   - 参数类型和含义
   - 返回值和错误码
   - 数据结构定义

### Phase 2: 文档生成
1. 生成文档内容：
   - API 概览
   - 函数详细说明
   - 错误码表
   - 使用示例

### Phase 3: 文档输出
1. 生成 Markdown 格式文档
2. 可选：生成 Doxygen 注释
3. 保存到指定目录

## Output Format

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

## Documentation Styles
根据需求选择格式：
- **Markdown**: 用于内部文档、GitHub README
- **Doxygen**: 用于生成 HTML/PDF 文档
- **简报**: 用于快速参考卡

## Example Usage
User: "帮我生成 your_project/core_driver 的 API 文档"

Agent actions:
1. Load skill: `skill({ name: "api-docs" })`
2. 分析 xxx_project_api.h 内容
3. 生成 API 文档
4. 输出到 doc/ 目录
