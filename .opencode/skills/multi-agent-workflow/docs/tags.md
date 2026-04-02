# 任务标签匹配详细说明

---

## 一、标签匹配表

| 标签 | 执行者 | 并行上限 | 输入 | 输出 |
|------|--------|----------|------|------|
| `[data]` | data-processor | 3 | 原始数据, 处理规则 | 处理后的数据 |
| `[security]` | security-expert | 3 | 代码, 配置 | 安全报告 |
| `[test]` | tester | 3 | 代码, 需求 | 测试文件, 测试报告 |
| `[deploy]` | devops | 3 | 部署需求 | 部署脚本, 配置 |
| `[research]` | researcher | 3 | 调研主题 | 调研报告 |
| `[performance]` | performance-engineer | 3 | 代码 | 性能分析报告 |
| `[integration]` | integration-engineer | 3 | 模块定义 | api_contract.md |
| `[ui]` / `[ux]` / `[design]` | ux-ui-designer | 3 | 需求说明 | 设计文档 |
| `[default]` | coder | 3 | 任务描述 | 代码文件 |

---

## 二、标签使用规则

### 2.1 标签分配原则

1. **单一标签**：每个任务尽量只用一个主要标签
2. **最匹配**：选择最匹配任务性质的标签
3. **避免重复**：同一任务不要分配多个相同类型的执行者

### 2.2 并行执行规则

- 同一标签的任务最多 3 个并行执行
- 超过 3 个时，按优先级或创建时间排队
- 不同标签的任务可并行执行

### 2.3 标签优先级

当任务可匹配多个标签时，按以下优先级选择：

| 优先级 | 标签 | 说明 |
|--------|------|------|
| 1 | `[security]` | 安全相关优先 |
| 2 | `[performance]` | 性能相关 |
| 3 | `[integration]` | API/集成相关 |
| 4 | `[test]` | 测试相关 |
| 5 | `[ui]`/`[ux]`/`[design]` | 设计相关 |
| 6 | `[data]` | 数据处理 |
| 7 | `[deploy]` | 部署相关 |
| 8 | `[research]` | 调研相关 |
| 9 | `[default]` | 默认 |

---

## 三、标签应用示例

### 示例项目：用户认证系统

```markdown
## T1 - 用户注册API实现
- Tag: [default] / [integration]
- 说明：作为 [integration] 处理，因为涉及 API 设计

## T2 - 密码加密模块
- Tag: [security]
- 说明：涉及安全加密

## T3 - 登录性能优化
- Tag: [performance]
- 说明：性能敏感任务

## T4 - 用户数据导入
- Tag: [data]
- 说明：数据处理任务

## T5 - 单元测试编写
- Tag: [test]
- 说明：测试任务
```

---

## 四、自定义标签

如需添加新的标签，在 SKILL.md 的任务标签匹配表中添加：

```markdown
| `[custom]` | custom-agent | 3 | 自定义任务 | 自定义输出 |
```

并确保对应的执行者 Agent 存在。
