# webapp-testing - Web应用测试

## 来源信息
- **原始来源**: https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md
- **Stars**: 109k (anthropics/skills 仓库)

## 亮点说明

### 1. 决策树 + 脚本封装
- 引入了清晰的决策树来指导测试方法选择
- 静态 HTML vs 动态 webapp 的区分
- 服务器运行状态的处理策略

### 2. 侦察-后-行动模式 (Reconnaissance-Then-Action)
- 先检查渲染后的 DOM
- 从检查结果中识别选择器
- 使用发现的选择器执行操作

### 3. 服务器生命周期管理
- `with_server.py` 帮助脚本管理服务器生命周期
- 支持单服务器和多服务器场景
- 先运行 `--help` 查看用法的最佳实践

### 4. 常见陷阱明确指出
- 强调在动态应用上必须先等待 `networkidle`
- 否则 DOM 检查会失败

### 5. Playwright 最佳实践
- 始终使用 headless 模式
- 使用描述性选择器
- 添加适当的等待
