# 优秀 Skill 写作指导文件

> 本文件旨在帮助开发者编写高质量、可维护的 Skill，为 AI Agent 提供精准的能力边界和操作指引。

## 文档元数据

| 属性 | 值 |
|------|-----|
| **类型** | 参考文档 / 写作规范 |
| **位置** | `docs/skill-writing-guide.md` |
| **版本** | 1.0.0 |
| **更新日期** | 2026-04-02 |

## 相关文档

| 文档 | 路径 | 说明 |
|------|------|------|
| **Agent 编写规范** | `docs/agent-build-assist.md` | Agent 文件的详细编写指南 |
| **Multi-Agent 工作流框架** | `docs/multi-agent-workflow-framework.md` | 协同工作流的完整规范 |
| **AGENTS.md** | `AGENTS.md` | OpenCode Agent & Skill 机制总览 |

---

## 1. 概述

### 1.1 什么是 Skill

Skill 是给 AI Agent 使用的能力定义文件，通过 YAML Frontmatter + Markdown 正文的结构，向模型传递：

- **能力边界**：该 Skill 负责什么、不负责什么
- **操作流程**：如何执行任务的分步指引
- **高语境知识**：模型难以从预训练中获取的内部信息
- **边界护栏**：工具权限限制和 Gotchas 提醒

### 1.2 优秀 Skill 的共同特征

| 特征 | 说明 |
|------|------|
| 聚焦单一职责 | 一个 Skill 只负责一个明确的任务类别 |
| 高语境知识优先 | 将内部文档、踩坑经验写入正文，而非假设模型已知 |
| 渐进式披露 | 元数据 → 正文 → 资源文件，分层加载 |
| 可执行脚本支撑 | 封装查询逻辑和格式化操作，降低模型负担 |
| 边界护栏 | 最小化工具权限，明确排除场景 |

### 1.3 适用场景

Skill 适用于但不限于以下场景：

| 类型 | 用途 | 示例 |
|------|------|------|
| 库和 API 参考 | 教 AI 使用内部 SDK | `api-sdk-reference` |
| 产品验证 | 让 AI 测试自己的代码 | `integration-test` |
| 数据获取与分析 | 连接数据和监控 | `log-analyzer` |
| 业务流程自动化 | 团队流程一键化 | `deployment-approval` |
| 代码脚手架 | 生成符合规范的项目模板 | `react-component-gen` |
| 代码质量与审查 | 自动化 code review | `code-review-expert` |
| CI/CD 与部署 | 构建到发布到回滚 | `kubernetes-deploy` |
| Runbook | 从报警到排查到报告 | `incident-response` |
| 基础设施运维 | 清理、成本分析、依赖管理 | `cost-optimization` |

---

## 2. Skill 文件结构

### 2.1 目录规范

```
skill-name/
├── SKILL.md              # 【必须】核心定义 + 指令
├── scripts/              # 【可选】可执行脚本
│   ├── query.sh          # 查询脚本
│   └── format.py         # 格式化脚本
├── references/           # 【可选】参考文档
│   ├── api-docs.md       # API 文档
│   └── architecture.md   # 架构说明
├── assets/               # 【可选】模板/资源
│   └── template.json     # 代码模板
├── logs/                 # 【可选】运行日志（建议加入 .gitignore）
│   └── history.json      # 上下文记忆
└── LICENSE.txt           # 【可选】许可证
```

### 2.2 文件命名规则

| 规则 | 说明 |
|------|------|
| 目录名 | 小写字母 + 单连字符分隔，不以 `-` 开头/结尾 |
| 正则验证 | `^[a-z0-9]+(-[a-z0-9]+)*$` |
| 主文件 | 必须为 `SKILL.md`（全大写） |

### 2.3 最小结构示例

```
my-skill/
└── SKILL.md
```

---

## 3. 元数据字段说明

### 3.1 YAML Frontmatter 结构

```yaml
---
name: skill-name
description: 触发条件描述（50-200字符）
allowed-tools:
  - bash
  - read
  - edit
model: anthropic/claude-sonnet-4-20250514
version: 1.0.0
---
```

### 3.2 字段说明

| 字段 | 必填 | 类型 | 说明 |
|------|------|------|------|
| `name` | ✅ | string | 唯一标识，小写+连字符，与目录名一致 |
| `description` | ✅ | string | 触发条件描述，50-200 字符 |
| `allowed-tools` | ❌ | array | 允许使用的工具列表，未定义则不限制 |
| `model` | ❌ | string | 指定模型，格式：`provider/model-id` |
| `version` | ❌ | string | 版本号，语义化版本 `x.y.z` |

### 3.3 allowed-tools 可选值

| 工具 | 说明 |
|------|------|
| `read` | 读取文件 |
| `edit` | 编辑文件 |
| `write` | 写入文件（新建或覆盖） |
| `bash` | 执行 Shell 命令 |
| `grep` | 搜索文件内容 |
| `glob` | 模式匹配文件 |
| `web-fetch` | 获取网页内容 |
| `paper-search_*` | 学术论文搜索工具 |
| `pdf-reader_*` | PDF 读取工具 |

### 3.4 元数据完整示例

```yaml
---
name: code-review-expert
description: 当用户要求代码审查、性能分析、安全审计或提出"SOLID原则"时触发。适用于Python/Java/Go项目的增量审查，不适用于架构设计评审。
allowed-tools:
  - read
  - grep
  - glob
  - bash
model: anthropic/claude-sonnet-4-20250514
version: 1.2.0
---
```

---

## 4. Description 写作技巧

### 4.1 核心原则

> **Description 是给模型看的触发条件，不是给人看的简介。**

Description 的核心功能是让模型判断：**何时应该调用这个 Skill**。因此必须包含：

1. **触发场景**：什么情况下应该激活这个 Skill
2. **排除场景**（可选但推荐）：什么情况下不应该激活

### 4.2 写作模板

```
当用户要求[动作]或提出[关键词]时触发。适用于[语言/框架/场景]，不适用于[排除场景]。
```

### 4.3 示例对比

| ❌ 错误写法 | ✅ 正确写法 |
|-----------|------------|
| `代码审查技能` | `当用户要求代码审查、性能分析、安全审计或提出"SOLID原则"时触发。适用于Python/Java/Go项目的增量审查，不适用于架构设计评审。` |
| `API文档生成工具` | `当用户提供头文件、函数签名或接口描述并要求生成API文档时触发。适用于REST/gRPC/GraphQL场景，不适用于已经提供完整Swagger定义的情况。` |
| `Bug诊断助手` | `当用户提供错误日志、堆栈信息、编译错误或运行时异常时触发。适用于Python/Java/C++项目，不适用于硬件相关或网络协议层问题。` |

### 4.4 常见错误

| 错误类型 | 说明 | 修正方式 |
|---------|------|---------|
| 太模糊 | `代码分析工具` | 明确动作和关键词 |
| 太宽泛 | `处理所有文本任务` | 限定适用场景和排除场景 |
| 太狭窄 | `只有用户说"帮我审查A.java"时触发` | 覆盖同义动作 |
| 硬编码绝对路径 | `路径D:\projects\` | 使用 `{baseDir}` 或相对描述 |

### 4.5 长度控制

| 建议范围 | 说明 |
|---------|------|
| 50-100 字符 | 简单触发条件 |
| 100-200 字符 | 包含适用/排除场景 |

---

## 5. 正文写作规范

### 5.1 语气要求

使用**祈使语气**，直接告诉模型应该做什么：

| ❌ 避免 | ✅ 推荐 |
|--------|--------|
| `你应该先分析需求...` | `分析需求文档，提取核心功能点...` |
| `建议使用 X 库...` | `使用 X 库实现...` |
| `可以调用工具来...` | `调用工具获取...` |

### 5.2 结构组织

```
## 技能名称

### 概述
简要说明技能用途和边界

### 前置要求
- 环境依赖
- 权限要求
- 输入格式

### 执行流程
1. 步骤一
2. 步骤二
3. 步骤三

### 输出格式
描述期望的输出结构

### Gotchas（踩坑点）
- ⚠️ 陷阱一
- ⚠️ 陷阱二

### 相关资源
- [参考文档](references/doc.md)
- {baseDir}/scripts/helper.sh
```

### 5.3 字数控制

| 类型 | 建议字数 | 说明 |
|------|---------|------|
| 简单 Skill | < 1,000 词 | 聚焦单一操作 |
| 中等 Skill | 1,000-3,000 词 | 包含多个子流程 |
| 复杂 Skill | 3,000-5,000 词 | 分层流程 + 大量 Gotchas |

> **注意**：超过 5,000 词应考虑拆分 Skill。

### 5.4 路径引用规范

- **始终使用** `{baseDir}` 而非硬编码绝对路径
- **脚本路径**：`{baseDir}/scripts/your-script.sh`
- **资源路径**：`{baseDir}/assets/template.json`

```markdown
运行辅助脚本：
```bash
bash {baseDir}/scripts/validate.sh
```
```

### 5.5 分层加载策略

| 层级 | 内容 | 加载时机 |
|------|------|---------|
| 元数据 | name, description, allowed-tools | 始终加载 |
| 正文 | 核心流程、Gotchas | 按需加载 |
| 资源文件 | 详细文档、模板、脚本 | 实际使用时引用 |

---

## 6. 资源文件组织

### 6.1 scripts/ 目录

将**可执行逻辑**封装为脚本，减少模型记忆负担：

```bash
# scripts/query-api.sh
#!/bin/bash
# 查询内部 API 文档并格式化输出

API_HOST="${1:-localhost:8080}"
ENDPOINT="${2:-/api/v1/docs}"

curl -s "$API_HOST$ENDPOINT" | jq '.endpoints[] | {method, path, description}'
```

### 6.2 references/ 目录

存放详细参考文档，正文按需引用：

```
references/
├── api-endpoints.md    # API 端点详细说明
├── error-codes.md      # 错误码对照表
└── architecture.png    # 架构图（可选）
```

### 6.3 assets/ 目录

存放代码模板、配置文件等资源：

```
assets/
├── component-template.ts    # 组件模板
├── config-schema.json        # 配置Schema
└── ci-template.yaml          # CI 模板
```

### 6.4 logs/ 目录

用于保持上下文记忆（可选，建议加入 .gitignore）：

```json
{
  "lastRun": "2026-04-02T10:30:00Z",
  "context": {
    "projectId": "proj-123",
    "lastCheckpoint": "step-3"
  }
}
```

---

## 7. 常见模式与模板

### 7.1 模式一：API 参考类

```markdown
---
name: api-sdk-reference
description: 当用户提供SDK相关问题、要求使用内部API或查询接口文档时触发。适用于Python/Node.js项目，不适用于第三方服务集成。
allowed-tools:
  - read
  - grep
version: 1.0.0
---

## 内部 SDK 参考

### 概述
本技能提供内部 SDK 的正确使用方法，包含认证、错误处理和最佳实践。

### 认证流程
1. 获取 API Key：`{baseDir}/scripts/get-api-key.sh`
2. 设置请求头：`Authorization: Bearer <key>`
3. 验证连接：`curl -s {baseDir}/scripts/test-connection.sh`

### 常用接口

#### 获取资源列表
```python
client = InternalSDK(api_key=os.getenv("API_KEY"))
resources = client.list_resources(project_id="default")
```

#### 创建资源
```python
resource = client.create_resource(
    name="example",
    type="compute",
    config={"size": "small"}
)
```

### Gotchas
- ⚠️ API Key 有效期 24 小时，需定期刷新
- ⚠️ 批量操作上限 100 条/请求
- ⚠️ 部分接口需要 `admin` 角色权限
```

### 7.2 模式二：Code Review 类

```markdown
---
name: code-review-expert
description: 当用户要求代码审查、性能分析、安全审计或提出"SOLID原则"时触发。适用于Python/Java/Go项目的增量审查，不适用于架构设计评审。
allowed-tools:
  - read
  - grep
  - glob
  - bash
version: 1.2.0
---

## 代码审查专家

### 审查维度

#### 1. SOLID 原则
- **S**ingle Responsibility：每个类/函数是否单一职责
- **O**pen/Closed：是否对扩展开放、对修改封闭
- **L**iskov Substitution：子类是否能替换父类
- **I**nterface Segregation：接口是否最小化
- **D**ependency Inversion：是否依赖抽象而非实现

#### 2. 安全审查
- SQL/命令注入风险
- 敏感信息泄露（硬编码密码、API Key）
- 输入验证完整性
- 权限控制是否恰当

#### 3. 性能检查
- N+1 查询问题
- 循环中的阻塞操作
- 资源未释放（文件句柄、连接）
- 大数据量处理分页

#### 4. 边界条件
- 空值处理
- 并发安全
- 超时和重试机制
- 异常恢复逻辑

### 输出格式
```markdown
## 审查报告

### 文件：<file-path>

#### 问题
| 严重度 | 位置 | 描述 | 建议 |
|--------|------|------|------|
| 🔴 高 | 行12 | SQL注入风险 | 使用参数化查询 |

### 总结
- 🔴 高优先级：1
- 🟡 中优先级：2
- 🟢 建议：3
```

### 7.3 模式三：Runbook 类

```markdown
---
name: incident-response
description: 当用户报告服务故障、收到监控告警或要求排查问题时触发。适用于Web服务、数据库、容器相关的故障排查，不适用于硬件故障和网络基础设施问题。
allowed-tools:
  - bash
  - read
  - grep
version: 1.0.0
---

## 故障响应手册

### 响应流程

#### 阶段一：初步诊断（0-5分钟）
1. 查看告警详情：`bash {baseDir}/scripts/get-alert.sh`
2. 检查服务状态：`systemctl status your-service`
3. 查看最近日志：`journalctl -u your-service --since "10 minutes ago"`

#### 阶段二：问题定位（5-15分钟）
1. 分析错误模式：`bash {baseDir}/scripts/analyze-errors.sh`
2. 检查资源使用：`df -h && free -m && top -bn1 | head -20`
3. 验证依赖服务：`curl -s localhost:8080/health`

#### 阶段三：止血（15-30分钟）
1. 重启服务：`systemctl restart your-service`
2. 切换流量（如有必要）：`bash {baseDir}/scripts/failover.sh`
3. 通知相关方：更新状态页面

#### 阶段四：复盘
1. 收集证据：`bash {baseDir}/scripts/collect-evidence.sh`
2. 填写事故报告：`{baseDir}/assets/incident-template.md`

### 常见问题速查

| 症状 | 可能原因 | 快速修复 |
|------|---------|---------|
| 服务无响应 | OOM Kill | `systemctl restart` + 调高内存限制 |
| 500错误暴增 | 依赖服务超时 | 检查下游服务 + 启用降级 |
| 连接超时 | 资源耗尽 | 扩容 + 限流 |

### Gotchas
- ⚠️ 执行重启前确认无进行中的数据写入
- ⚠️ 切换流量前检查目标集群健康状态
- ⚠️ 敏感操作需要记录审批日志
```

### 7.4 模式四：脚手架生成类

```markdown
---
name: react-component-gen
description: 当用户要求创建React组件、页面模板或UI组件库时触发。适用于使用React 18+和TypeScript的项目，不适用于React Native或旧版class组件。
allowed-tools:
  - write
  - read
version: 1.0.0
---

## React 组件生成器

### 组件规范

#### 命名规则
- 组件文件：`PascalCase.tsx`
- 样式文件：`PascalCase.module.css`
- 测试文件：`PascalCase.test.tsx`
- 类型文件：`PascalCase.types.ts`

#### 必备结构
```tsx
import { FC } from 'react';
import styles from './ComponentName.module.css';

interface Props {
  title: string;
  onAction?: () => void;
}

export const ComponentName: FC<Props> = ({ title, onAction }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  );
};
```

### 模板命令

生成标准组件：
```bash
bash {baseDir}/scripts/generate-component.sh MyComponent
```

生成带表单的组件：
```bash
bash {baseDir}/scripts/generate-form.sh MyForm --fields=name,email,password
```

### Gotchas
- ⚠️ 使用 `FC<Props>` 而非箭头函数声明
- ⚠️ 事件处理器需显式类型标注
- ⚠️ 条件渲染使用三元而非短路求值
```

---

## 8. 发布前检查清单

### 8.1 功能性检查

- [ ] `description` 字段已优化为触发条件写法
- [ ] 包含至少 3 个真实踩坑点（Gotchas）
- [ ] 脚本已测试可执行（bash/chmod + 执行验证）
- [ ] 资源文件路径使用 `{baseDir}`，无硬编码绝对路径
- [ ] 正文使用祈使语气，无"你应该"、"建议"等表达

### 8.2 安全性检查

- [ ] `allowed-tools` 已最小化（仅包含必要工具）
- [ ] 无硬编码敏感信息（密码、API Key、内部域名）
- [ ] 涉及敏感操作的步骤有权限提醒

### 8.3 可维护性检查

- [ ] 字数控制在 5,000 词以内
- [ ] 目录结构清晰，文件命名符合规范
- [ ] 已添加 `version` 字段（语义化版本）
- [ ] 如有依赖脚本，已注明运行环境要求

### 8.4 完整性检查

- [ ] README.md 或同目录文档说明用途
- [ ] 复杂 Skill 提供执行示例
- [ ] 跨平台 Skill 已验证 Windows/Linux 兼容性

---

## 9. 优秀案例参考

### 9.1 官方资源

| 项目 | 地址 | 说明 |
|------|------|------|
| Anthropic Skills | github.com/anthropics/skills (109k ⭐) | 官方模板和规范 |
| skill-creator | 官方创建工具 | 引导式创建流程 |
| find-skills | 251.5K 安装量 | 排名第一的 Skill |

### 9.2 推荐学习对象

| Skill 名称 | 类型 | 亮点 |
|-----------|------|------|
| code-review-expert | 代码审查 | 覆盖 SOLID、安全、性能、边界条件 |
| pdf/xlsx/docx 处理 | 文档处理 | 复杂 Skill 标准范式 |
| superpowers | AI 编程 | 14 个技能，完整框架 |

### 9.3 目录结构参考

```
.
├── skill-name/
│   ├── SKILL.md
│   ├── scripts/
│   │   ├── query.sh
│   │   ├── format.py
│   │   └── validate.sh
│   ├── references/
│   │   ├── api-docs.md
│   │   └── architecture.md
│   ├── assets/
│   │   └── template.json
│   ├── logs/
│   │   └── history.json
│   └── LICENSE.txt
```

---

## 附录

### A. 术语表

| 术语 | 说明 |
|------|------|
| Frontmatter | SKILL.md 顶部的 YAML 元数据区域 |
| Skill | AI Agent 的能力定义单元 |
| Gotcha | 踩坑点，已知的陷阱和注意事项 |
| Trigger | 触发条件，模型据此判断是否调用 Skill |
| 祈使语气 | "做 X" 而非 "你应该做 X" |

### B. 正则表达式

```regex
# Skill 名称验证
^[a-z0-9]+(-[a-z0-9]+)*$

# 示例
valid: my-skill, api-docs, code-review-v2
invalid: MySkill, API_DOCS, -my-skill, my-skill-
```

### C. 版本规范

采用语义化版本 `major.minor.patch`：

| 版本 | 适用场景 |
|------|---------|
| patch | Bug 修复、文档更新 |
| minor | 新增功能（向后兼容） |
| major | 破坏性变更 |

---

> **最后更新**：2026-04-02  
> **版本**：1.0.0
