# brand-guidelines - 品牌指南

## 来源信息
- **原始来源**: https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md
- **Stars**: 109k (anthropics/skills 仓库)

## 亮点说明

### 1. 简洁的视觉规范
- 清晰的主色调和辅助色调定义
- 使用十六进制颜色码精确匹配
- 暖色系（橙色）和冷色系（蓝色、绿色）的辅助色定义

### 2. 字体层次设计
- 标题使用 Poppins 字体（24pt 及以上）
- 正文使用 Lora 字体
- 清晰的字体回退机制（Arial/Georgia）

### 3. 智能字体应用
- 根据字号自动判断是标题还是正文
- 自动回退机制确保跨系统一致性
- 无需安装字体，利用系统已有字体

### 4. 形状和强调色
- 非文本形状使用强调色
- 橙色、蓝色、绿色交替使用保持视觉趣味

### 5. 技术实现细节
- 使用 python-pptx 的 RGBColor 类
- RGB 颜色值确保精确的品牌匹配
- 跨系统保持颜色保真度
