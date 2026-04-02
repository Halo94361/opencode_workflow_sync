# Skill Reference Catalog

本目录收录了优秀的 Skill 案例，作为创建新 Skill 的参考指南。

## 目录结构

```
skill_ref/
├── official/              # Anthropic 官方 Skills
│   ├── docx/             # Word 文档处理
│   ├── mcp-builder/      # MCP 服务器开发（四阶段流程）
│   ├── skill-creator/    # Skill 创建指南
│   ├── webapp-testing/   # Web 应用测试
│   ├── brand-guidelines/ # 品牌视觉规范
│   ├── claude-api/       # Claude API 使用
│   └── template/         # 基础模板
└── community/            # 社区资源
    └── catalog.md        # 社区 Skill 资源索引
```

---

## 官方 Skills 索引

### 1. docx - Word 文档处理
**来源**: https://github.com/anthropics/skills/blob/main/skills/docx/SKILL.md

**亮点**:
- 完整的 Word 文档创建、编辑、追踪修订功能
- 详细的 XML 参考文档
- 决策树指导：读取/创建/编辑的选择
- 三步编辑流程：Unpack → Edit XML → Pack
- 关键技术点：页面尺寸、表格双重宽度、unicode bullets 禁止

---

### 2. mcp-builder - MCP 服务器开发
**来源**: https://github.com/anthropics/skills/blob/main/skills/mcp-builder/SKILL.md

**亮点**:
- 四阶段开发流程：研究 → 实现 → 测试 → 评估
- MCP 服务器构建指南
- 完整的迭代流程规范

---

### 3. skill-creator - Skill 创建指南
**来源**: https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md

**亮点**:
- 完整迭代流程
- Skill 结构规范
- 三层加载机制

---

### 4. webapp-testing - Web 应用测试
**来源**: https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md

**亮点**:
- 决策树 + 脚本封装模式
- 侦察-后-行动模式（Reconnaissance-Then-Action）
- 服务器生命周期管理
- Playwright 最佳实践

---

### 5. brand-guidelines - 品牌视觉规范
**来源**: https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md

**亮点**:
- 简洁的视觉规范定义
- 主色调和辅助色调十六进制码
- 字体层次设计（Poppins/Lora + 回退机制）
- 智能字体应用规则

---

### 6. claude-api - Claude API 使用指南
**来源**: https://github.com/anthropics/skills/blob/main/skills/claude-api/SKILL.md

**亮点**:
- 完整 API 决策树（Single Call → Workflow → Agent SDK）
- 多语言支持（Python, TypeScript, Java, Go, Ruby, C#, PHP）
- 模型选择规范（强制 claude-opus-4-6）
- 自适应思考模式（Adaptive Thinking）
- Prompt Caching 完整指南
- 上下文窗口压缩（Compaction）机制

---

### 7. template - 基础模板
**来源**: https://github.com/anthropics/skills/blob/main/template/SKILL.md

**亮点**:
- 最简 Skill 模板
- 标准 frontmatter 格式
- 可扩展性设计

---

## 社区资源

详见 [`community/catalog.md`](./community/catalog.md)

---

## 贡献指南

添加新的 Skill 参考案例时：
1. 在对应分类下创建子目录
2. 包含原始 `SKILL.md` 文件
3. 创建 `README.md` 说明来源和亮点
4. 更新本 catalog.md 索引
