# docx - Word文档处理

## 来源信息
- **原始来源**: https://github.com/anthropics/skills/blob/main/skills/docx/SKILL.md
- **Stars**: 109k (anthropics/skills 仓库)

## 亮点说明

### 1. 完整的技术实现
- 详细的 Word 文档创建、编辑、追踪修订功能
- 完整的 XML 参考文档，说明了如何在 docx 内部进行直接编辑

### 2. 清晰的任务分类
- **读取/分析**: pandoc 或解压 XML
- **创建新文档**: docx-js JavaScript 库
- **编辑现有文档**: 解压 → 编辑 XML → 重新打包

### 3. 关键技术要点
- **页面尺寸**: 明确指出 docx-js 默认 A4，需要显式设置 US Letter
- **表格处理**: 双重宽度机制（columnWidths + cell width）
- **列表处理**: 强调永远不要使用 unicode bullets，必须使用编号配置
- **图片处理**: type 参数是必需的

### 4. 编辑现有文档的三步流程
1. Step 1: Unpack - 使用 unpack.py 解压
2. Step 2: Edit XML - 直接编辑 XML 文件
3. Step 3: Pack - 使用 pack.py 重新打包并验证

### 5. 详尽的 XML 参考
- 追踪修订的插入/删除标记
- 批注的添加和处理
- 图片插入的完整流程

### 6. 依赖管理
- 明确列出依赖：pandoc, docx, LibreOffice, Poppler
