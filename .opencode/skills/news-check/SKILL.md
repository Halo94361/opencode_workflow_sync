---
name: news-check
description: 搜索和汇总AI/嵌入式/物联网/芯片/开源等技术领域的最新资讯、技术趋势和开源项目动态
---

## What I do
- 搜索 GitHub Trending 项目（各类技术领域）
- 监控主流技术媒体（36kr、虎嗅、极客公园、雷锋网等）
- 追踪AI/嵌入式/物联网/芯片等厂商动态
- 关注科技行业最新资讯和产品发布
- 输出综合技术动态摘要

## When to use me
Use this skill when you need to:
- 了解科技领域最新技术趋势
- 发现有用的开源工具/库
- 关注AI、大模型、嵌入式、物联网等热点
- 追踪芯片厂商和科技巨头产品更新
- 获取行业最新资讯

## Workflow

### Phase 1: 并行搜索
1. 并行搜索多个来源：
   - GitHub Trending (热门项目)
   - 国内科技媒体（36kr、虎嗅、极客公园、创业邦）
   - 国际科技媒体（TechCrunch、The Verge、Wired）
   - AI/嵌入式技术博客（可选）

### Phase 2: 内容筛选
1. 过滤与用户需求相关的热点内容
2. 按热度/重要性排序
3. 去除重复和过时信息

### Phase 3: 摘要输出
1. 生成综合技术动态摘要
2. 附带链接和来源

## Output Format

```markdown
# Tech News: [date]

## AI & 大模型
- **[title]**: [description]
  - Source: [媒体名称]
  - Link: [url]

## GitHub Trending
- **[repo-name]**: [description]
  - Stars: [count] | Language: [lang]
  - Link: [url]

## 科技媒体
- **[title]**
  - Source: [36kr / 虎嗅 / TechCrunch / ...]
  - Summary: [1-2 sentence summary]
  - Link: [url]

## 行业动态
### 芯片 & 半导体
- [update description]
  - Link: [url]

### 终端 & 硬件
- [update description]
  - Link: [url]
```

## Search Keywords
使用以下关键词优化搜索：

**AI & 大模型**
- AI, artificial intelligence, 大模型, GPT, LLM
- ChatGPT, Claude, Gemini, OpenAI, Anthropic
- 人工智能, AIGC, 生成式AI

**嵌入式 & IoT**
- embedded systems, microcontroller, RTOS
- STM32, ESP32, Arduino, RISC-V
- IoT, sensor, actuator, 物联网

**开发工具 & 开源**
- GitHub trending, open source, developer tools
- Linux, kernel, device driver
- container, kubernetes, devops

**硬件 & 芯片**
- semiconductor, chip, GPU, CPU
- STMicroelectronics, TI, NXP, Qualcomm
- 芯片, 处理器, 显卡

**科技行业**
- tech news, startup, funding
- 科技, 融资, 创业, 产品发布

## Example Usage
User: "有什么AI和嵌入式技术新动态吗"

Agent actions:
1. Load skill: `skill({ name: "news-check" })`
2. 并行搜索多个来源（AI + 嵌入式 + GitHub）
3. 筛选和汇总信息
4. 输出技术动态摘要
