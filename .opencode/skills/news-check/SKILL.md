---
name: news-check
description: 监控嵌入式技术动态、开源项目更新、芯片厂商资讯
---

## What I do
- 搜索 GitHub Trending 嵌入式项目
- 监控嵌入式技术博客（EE Times, Embedded.com）
- 追踪芯片厂商动态（ST, TI, NXP）
- 输出技术动态摘要

## When to use me
Use this skill when you need to:
- 了解嵌入式领域最新技术趋势
- 发现有用的开源工具/库
- 关注芯片厂商产品更新
- 寻找技术问题的解决方案

## Workflow

### Phase 1: 并行搜索
1. 并行搜索多个来源：
   - GitHub Trending (嵌入式相关)
   - EE Times / Embedded.com 技术文章
   - ST/TI/NXP 官方更新

### Phase 2: 内容筛选
1. 过滤与嵌入式开发相关的内容
2. 按热度/重要性排序
3. 去除重复和过时信息

### Phase 3: 摘要输出
1. 生成技术动态摘要
2. 附带链接和来源

## Output Format

```markdown
# Tech News: [date]

## GitHub Trending
- **[repo-name]**: [description]
  - Stars: [count] | Language: [lang]
  - Link: [url]

## Tech Blogs
- **[title]**
  - Source: [EE Times / Embedded.com]
  - Summary: [1-2 sentence summary]
  - Link: [url]

## Chip Vendor Updates
### STMicroelectronics
- [update description]
  - Link: [url]

### Texas Instruments
- [update description]
  - Link: [url]

### NXP
- [update description]
  - Link: [url]
```

## Search Keywords
使用以下关键词优化搜索：
- embedded systems, microcontroller, RTOS
- STM32, ESP32, Arduino, RISC-V
- I2C, SPI, UART, CAN, USB
- Linux kernel, device driver
- IoT, sensor, actuator

## Example Usage
User: "有什么嵌入式技术新动态吗"

Agent actions:
1. Load skill: `skill({ name: "news-check" })`
2. 并行搜索多个来源
3. 筛选和汇总信息
4. 输出技术动态摘要
