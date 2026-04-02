# mcp-builder - MCP 服务器开发指南

## 来源信息
- **原始来源**: https://github.com/anthropics/skills/blob/main/skills/mcp-builder/SKILL.md
- **Stars**: 109k (anthropics/skills 仓库)

## 亮点说明

### 1. 四阶段开发流程
- **Phase 1**: Deep Research and Planning - 研究和规划
- **Phase 2**: Implementation - 实现
- **Phase 3**: Review and Test - 审查和测试
- **Phase 4**: Create Evaluations - 创建评估

### 2. MCP 协议设计原则
- API Coverage vs. Workflow Tools 的平衡
- 清晰的工具命名规范（前缀如 `github_create_issue`）
- 上下文管理策略
- 可操作的错误消息设计

### 3. 推荐的开发栈
- **语言**: TypeScript（高质量 SDK 支持）
- **传输**: Streamable HTTP（远程服务器）/ stdio（本地服务器）

### 4. 工具实现规范
- 输入模式：Zod (TypeScript) / Pydantic (Python)
- 输出模式：`outputSchema` 和 `structuredContent`
- 注解系统：`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`

### 5. 评估体系
- 10 个评估问题的创建流程
- 问题要求：独立、无副作用、复杂、真实、可验证、稳定
- XML 格式输出

### 6. 完整的文档库
- 核心 MCP 文档
- SDK 文档（Python/TypeScript）
- 语言特定实现指南
- 评估指南
