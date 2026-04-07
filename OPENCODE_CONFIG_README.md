# OpenCode 配置文件说明

## 📋 概述

`opencode_example.json` 是一个完整的OpenCode配置文件示例，基于**三级模型分层策略**设计，旨在平衡成本与质量。

## 🎯 三级模型分层策略

### 模型能力排序
```
mimo-pro > mimo-omni > minimax
```

### 分层配置

| 层级 | 模型 | 成本 | 适用场景 |
|------|------|------|----------|
| **L1-高级** | `mimo/mimo-pro` | $1.0/$3.0 per M tokens | 架构设计、复杂推理、关键决策 |
| **L2-标准** | `mimo/mimo-omni` | $0.7/$2.1 per M tokens | 代码实现、技术分析、常规任务 |
| **L3-基础** | `minimax/m2.7` | $0.3/$1.2 per M tokens | 简单任务、格式转换、基础执行 |

## 🔧 Agent模型分配

### 高级模型（mimo-pro）
- **architect** - 任务拆解、架构设计
- **reviewer** - 深度质量评估
- **reflector** - 复盘分析、流程优化
- **integration-engineer** - API设计、接口规范

### 标准模型（mimo-omni）
- **coder** - 代码实现、功能开发
- **researcher** - 技术调研、方案分析
- **security-expert** - 安全分析、漏洞检测
- **performance-engineer** - 性能分析、瓶颈定位

### 基础模型（minimax）
- **master** - 调度协调、状态管理
- **tester** - 测试用例生成
- **data-processor** - 数据处理、格式转换
- **devops** - 部署配置、环境搭建
- **docer** - 文档生成、格式整理
- **ux-ui-designer** - 基础界面设计
- **project-explorer** - 项目探索、代码分析

## 📝 使用方法

### 1. 安装OpenCode
```bash
curl -fsSL https://opencode.ai/install | bash
```

### 2. 配置API密钥
```bash
# 配置mimo API密钥
opencode /connect
# 选择"Other" -> 输入provider ID: mimo
# 输入您的mimo API密钥

# 配置minimax API密钥
opencode /connect
# 选择"MiniMax"
# 输入您的minimax API密钥
```

### 3. 使用配置文件
```bash
# 复制配置文件到项目目录
cp opencode_example.json opencode.json

# 或复制到全局配置目录
cp opencode_example.json ~/.config/opencode/opencode.json
```

### 4. 启动OpenCode
```bash
cd /your/project
opencode
```

## ⚙️ 配置详解

### Provider配置
```json
"provider": {
  "mimo": {
    "npm": "@ai-sdk/openai-compatible",
    "name": "MiMo Models",
    "options": {
      "baseURL": "https://api.xiaomi.com/v1"
    }
  },
  "minimax": {
    "npm": "@ai-sdk/openai-compatible",
    "name": "MiniMax Models",
    "options": {
      "baseURL": "https://api.minimax.io/v1"
    }
  }
}
```

### Agent配置示例
```json
"coder": {
  "description": "代码实现Agent",
  "mode": "subagent",
  "hidden": true,
  "model": "mimo/mimo-omni",
  "temperature": 0.3,
  "permission": {
    "edit": "allow",
    "bash": "allow"
  }
}
```

## 🔄 动态切换

### 手动切换模型
在OpenCode中，您可以：
1. 使用 `/models` 命令查看可用模型
2. 使用 `/connect` 命令切换provider
3. 在配置中修改特定Agent的模型

### 复杂度自适应
您可以根据任务复杂度手动调整：
- **复杂任务**：使用mimo-pro确保质量
- **中等任务**：使用mimo-omni平衡成本
- **简单任务**：使用minimax控制成本

## 💰 成本优化

### 预期节省
- **简单任务**：节省70%成本
- **中等任务**：节省50%成本
- **复杂任务**：成本不变（确保质量）

### 月度预算控制
```json
// 可以在配置中添加预算控制
{
  "budget": {
    "monthly": 100,
    "warning_threshold": 80,
    "action": "downgrade_to_minimax"
  }
}
```

## 📊 性能监控

### 模型使用统计
```bash
# 查看模型使用情况
opencode stats

# 查看成本估算
opencode cost
```

### 质量监控
- 定期检查Agent输出质量
- 根据需要调整温度参数
- 监控任务完成率

## 🚨 注意事项

### 1. API密钥安全
- 不要将API密钥提交到版本控制
- 使用环境变量或安全存储

### 2. 成本控制
- 监控API使用量
- 设置预算提醒
- 根据需要调整模型选择

### 3. 质量保证
- 关键任务使用高级模型
- 定期评估输出质量
- 根据反馈调整配置

## ⚠️ 重要配置规则

### 本地配置优先原则
为了确保不同用户的兼容性和配置一致性，**所有模型调用策略必须在本地的 `opencode.json` 文件中进行配置**，而不能通过修改 `.opencode/agents/` 目录下的Agent定义文件来操作。

### 配置优先级
1. **本地 `opencode.json`**：项目级别的配置，最高优先级
2. **全局 `~/.config/opencode/opencode.json`**：用户级别的配置，中等优先级
3. **`.opencode/agents/` 目录**：仅用于定义Agent的基本行为和描述，**禁止在此修改模型分配**

### 为什么不能修改 `.opencode/agents/` 文件？
1. **兼容性问题**：不同用户的 `.opencode/agents/` 目录可能不同，直接修改会导致配置冲突
2. **版本控制问题**：`.opencode/agents/` 目录通常不纳入版本控制，修改无法共享
3. **覆盖问题**：本地 `opencode.json` 配置会覆盖 `.opencode/agents/` 中的模型设置，修改无效
4. **维护问题**：集中配置便于维护和更新，分散修改容易导致混乱

### 正确的配置方式
```json
// 在 opencode.json 中配置模型分配
{
  "agents": {
    "coder": {
      "model": "mimo/mimo-pro",  // 通过opencode.json修改模型
      "temperature": 0.3
    },
    "architect": {
      "model": "mimo/mimo-omni"  // 可以覆盖默认分配
    }
  }
}
```

### 错误的做法
```bash
# ❌ 错误：直接修改 .opencode/agents/coder.md 中的模型配置
# 这样做会导致：
# 1. 其他用户拉取代码后配置失效
# 2. 本地opencode.json配置被忽略
# 3. 配置管理混乱
```

## 🛠️ 自定义配置

### 修改模型分配
您可以根据需要调整Agent的模型分配：
```json
"coder": {
  "model": "mimo/mimo-pro"  // 升级到pro确保质量
}
```

### 添加新Agent
```json
"custom-agent": {
  "description": "自定义Agent",
  "mode": "subagent",
  "model": "minimax/m2.7",
  "temperature": 0.3
}
```

### 调整温度参数
- **0.0-0.2**：专注、确定性回答（适合分析）
- **0.3-0.5**：平衡、适度创造性（适合开发）
- **0.6-1.0**：创造性、多样性（适合设计）

## 📚 参考文档

- [OpenCode官方文档](https://opencode.ai/docs)
- [Agent配置指南](https://opencode.ai/docs/agents)
- [Model配置指南](https://opencode.ai/docs/models)
- [Provider配置指南](https://opencode.ai/docs/providers)

## 🆘 故障排除

### 常见问题
1. **模型不可用**：检查API密钥配置
2. **权限错误**：检查permission配置
3. **成本过高**：调整模型分配策略

### 获取帮助
```bash
opencode help
opencode /help
```

---

**最后更新**：2026年4月7日  
**版本**：1.0.0  
**适用OpenCode版本**：1.3.17+