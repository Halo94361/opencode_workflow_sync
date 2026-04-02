# skill-creator - Skill 创建指南

## 来源信息
- **原始来源**: https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md
- **Stars**: 109k (anthropics/skills 仓库)

## 亮点说明

### 1. 完整迭代流程
- 决定目标 → 写草稿 → 创建测试提示 → 评估结果 → 重写 → 重复直到满意
- 扩展测试集并以更大规模重试

### 2. Skill 结构规范
```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description required)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/    - 可执行代码
    ├── references/ - 按需加载的文档
    └── assets/     - 输出中使用的文件
```

### 3. 三层加载机制
1. **Metadata** (name + description) - 始终在上下文中 (~100 words)
2. **SKILL.md body** - Skill 触发时在上下文中 (<500 lines)
3. **Bundled resources** - 按需（无限，脚本可直接执行）

### 4. 渐进式披露原则
- SKILL.md 保持在 500 行以下
- 大于 300 行的参考文件包含目录表
- 按领域/框架组织变体

### 5. 测试驱动开发
- 创建 2-3 个现实测试提示
- 同时运行 with-skill 和 baseline
- 捕获时序数据 (total_tokens, duration_ms)
- 评估断言和基准聚合

### 6. 评估流程
- 使用 `eval-viewer/generate_review.py` 创建查看器
- 定性输出 + 定量基准
- 迭代循环：改进 → 重跑测试 → 用户反馈 → 再改进

### 7. Description 优化
- 生成 20 个触发评估查询（8-10 should-trigger, 8-10 should-not-trigger）
- 混合训练集和测试集
- 运行优化循环最多 5 次迭代
- 基于测试分数选择最佳描述

### 8. 无意外原则
- Skill 不得包含恶意软件、漏洞利用代码
- Skill 内容不应在用户意图方面令人惊讶
- 不配合创建误导性技能或促进未授权访问的技能

### 9. 书写风格
- 使用祈使语气
- 解释**为什么**而非强制要求
- 保持技能通用，不针对特定例子
