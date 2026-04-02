# 迭代 1

## 基本信息
- **开始时间**: 2026-04-02
- **状态**: 进行中
- **目标**: 通过Researcher分析优秀Skill写作模式，为优化9个Skill文件提供具体指导

## 任务描述
参考`docs/skill-writing-guide.md`中的优秀范例写作模式，分析当前9个Skill文件的内部内容与标准的差距，包括：
1. 祈使语气使用情况
2. 结构组织完整性
3. Gotchas部分的存在与质量
4. 路径引用规范（{baseDir}使用）
5. 执行流程的清晰度

## 执行步骤
1. **Researcher分析**: 对比优秀范例与当前Skill内容，生成差距分析报告
2. **Coder优化**: 根据分析报告，逐个优化9个Skill文件
3. **Reviewer评分**: 对优化后的Skill文件进行质量评分
4. **Reflector复盘**: 提供改进建议，决定是否继续迭代

## 输入文件
- `docs/skill-writing-guide.md` - 优秀Skill写作指导
- `.opencode/skills/`目录下的9个Skill文件：
  - code-review/SKILL.md
  - bug-diagnosis/SKILL.md
  - test-generator/SKILL.md
  - api-docs/SKILL.md
  - cross-platform-check/SKILL.md
  - news-check/SKILL.md
  - literature-research/SKILL.md
  - analog-loop-tuning/SKILL.md
  - multi-agent-workflow/SKILL.md

## 输出预期
- 差距分析报告（Researcher产出）
- 优化后的9个Skill文件（Coder产出）
- 质量评分报告（Reviewer产出）
- 复盘建议（Reflector产出）

## 约束条件
- 最多3次迭代
- 评分≥90或达到3次迭代时终止
- 必须传递完整的历史上下文给每个代理

## 执行进展

### Researcher分析完成 (2026-04-02)
- **产出**: 详细的差距分析报告
- **主要发现**:
  1. 所有Skill文件均未完全符合优秀标准
  2. 主要问题集中在结构组织和Gotchas方面
  3. multi-agent-workflow需要完全重构（最高优先级）
  4. literature-research和analog-loop-tuning有部分符合内容
- **优化建议**: 提供了每个Skill文件的具体修改建议和优先级排序

### 下一步: Coder优化
- **任务**: 根据差距分析报告，逐个优化9个Skill文件
- **优先级顺序**: 按分析报告中的高→中→低优先级执行
- **关键要求**: 
  - 使用祈使语气
  - 添加标准章节结构（概述、前置要求、执行流程、输出格式、Gotchas）
  - 至少3个Gotchas（⚠️ 前缀）
  - 使用{baseDir}代替绝对路径

## 已知问题
- 当前project_exploration.md的git_head与当前HEAD不匹配，但暂不影响Skill优化任务
- multi-agent-workflow需要大幅度重构，工作量较大