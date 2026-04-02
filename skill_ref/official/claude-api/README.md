# claude-api - Claude API使用指南

## 来源信息
- **原始来源**: https://github.com/anthropics/skills/blob/main/skills/claude-api/SKILL.md
- **Stars**: 109k (anthropics/skills 仓库)

## 亮点说明

### 1. 完整API决策树
- 清晰的分层架构：Single LLM Call → Workflow → Agent SDK
- 决策树帮助选择正确的使用方式
- 明确标注何时使用 Agent SDK vs Claude API

### 2. 多语言支持
- 支持 Python, TypeScript, Java, Go, Ruby, C#, PHP, cURL
- 详细的语言检测流程
- 各语言特性支持表格

### 3. 模型选择规范
- 强制使用 `claude-opus-4-6` 作为默认模型
- 明确的模型 ID 格式要求（无日期后缀）
- 实时模型能力查询机制

### 4. 自适应思考模式 (Adaptive Thinking)
- 详细说明 Opus 4.6 的 `thinking: {type: "adaptive"}`
- 废弃 `budget_tokens` 的原因
- Effort 参数的正确用法

### 5. Prompt Caching 完整指南
- 前缀匹配机制
- 缓存失效的静默原因排查
- 缓存验证方法 (`usage.cache_read_input_tokens`)

### 6. 上下文窗口压缩 (Compaction)
- Beta 功能说明
- 关键提醒：必须保留 `response.content` 而非仅文本
- 代码示例引用

### 7. 完整的文件读取指南
- 按任务类型推荐读取顺序
- 语言特定的文件夹结构
- Agent SDK 专用文档

### 8. 常见陷阱详细说明
- `max_tokens` 默认值建议
- 128K输出的流式处理要求
- JSON 解析注意事项
- SDK类型 vs 自定义类型
