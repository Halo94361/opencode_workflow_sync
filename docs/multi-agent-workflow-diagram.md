# Multi-Agent Workflow 流程图

> **规范来源**：`.opencode/skills/multi-agent-workflow/SKILL.md`
> 
> **生效角色**：Master、Architect、Project-explorer、Coder、Reviewer、Reflector

---

## 1. 主工作流程

```mermaid
flowchart TD
    START([接收用户需求]) --> ASK{是否使用协同工作流?}
    ASK -->|否| END1([普通模式处理])
    ASK -->|是| ARCHIVE[归档旧迭代记录]
    
    ARCHIVE --> EXPLORE[项目探索<br/>Project-explorer]
    
    EXPLORE --> EXPLORE_CHECK{已有<br/>project_exploration.md?}
    EXPLORE_CHECK -->|是且git_hash匹配| REUSE[复用已有报告]
    EXPLORE_CHECK -->|否或不匹配| NEW_EXP[触发ProjectExplorer探索]
    REUSE --> ARCHITECT
    NEW_EXP --> ARCHITECT
    
    ARCHITECT[Architect 任务拆解] --> TASK_LIST[生成 task_list.md]
    TASK_LIST --> USER_CONFIRM{用户确认?}
    
    USER_CONFIRM -->|取消| END2([终止工作流])
    USER_CONFIRM -->|修改| ARCHITECT
    USER_CONFIRM -->|批准| EXEC_LOOP
    
    subgraph EXEC_LOOP[执行循环 - 最多3次]
        direction TB
        SCHEDULE[Master 调度执行者<br/>按任务标签映射分配] --> ITER_CHECK{迭代次数 ≤ 3?}
        ITER_CHECK -->|是| EXECUTE[执行者执行任务<br/>Coder/标签对应Agent]
        ITER_CHECK -->|否| FORCE_END([达到上限<br/>强制终止])
        EXECUTE --> REVIEWER[Reviewer 评分<br/>权重 0.7]
        REVIEWER --> REFLECTOR[Reflector 评分<br/>权重 0.3]
        REFLECTOR --> CALC[计算最终评分<br/>Final = R×0.7 + F×0.3]
        CALC --> CHECK_SCORE{评分 ≥ 90?}
        CHECK_SCORE -->|是| DONE[迭代完成]
        CHECK_SCORE -->|否| CHECK_PROGRESS{连续2次评分\n变化<2分?}
        CHECK_PROGRESS -->|否| SCHEDULE
        CHECK_PROGRESS -->|是| HELP([向用户求助<br/>触发无进展警告])
    end
    
    EXEC_LOOP --> GIT_CHECK[git diff 检测]
    GIT_CHECK --> TRIGGER_UPDATE{需要更新\nproject_exploration?}
    TRIGGER_UPDATE -->|是| INCREMENTAL[ProjectExplorer<br/>增量更新]
    TRIGGER_UPDATE -->|否| SUMMARIZE
    INCREMENTAL --> SUMMARIZE
    
    SUMMARIZE[结果汇总] --> FINAL([输出执行报告])
    
    style EXEC_LOOP fill:#3498db,color:#fff
    style DONE fill:#27ae60,color:#fff
    style FORCE_END fill:#e74c3c,color:#fff
    style HELP fill:#f39c12,color:#fff
```

---

## 2. 执行循环详细流程

```mermaid
flowchart LR
    subgraph Iteration[迭代 N]
        direction TB
        INIT[迭代开始] --> UPDATE_META1[更新meta.md<br/>当前迭代+状态=EXECUTING]
        UPDATE_META1 --> SCHEDULE[Master调度执行者<br/>按任务标签映射]
        
        SCHEDULE --> EXEC[执行者执行任务]
        EXEC --> UPDATE_CTX[更新context.md]
        
        UPDATE_CTX --> REVIEWER[Reviewer评分<br/>权重0.7]
        REVIEWER --> REFLECTOR[Reflector评分<br/>权重0.3]
        
        REFLECTOR --> CALC{计算最终评分<br/>F×0.7 + R×0.3}
        
        CALC -->|≥90| PASS[通过<br/>终止迭代]
        CALC -->|<90| PROGRESS[无进展检测]
        
        PROGRESS --> PROGRESS_CHECK{连续2次评分\n变化<2分?}
        PROGRESS_CHECK -->|否| ITER_FILE[生成iteration_N.md]
        PROGRESS_CHECK -->|是| WARN[触发无进展警告<br/>向用户求助]
        
        ITER_FILE --> UPDATE_META2[更新meta.md<br/>状态=REVIEWING]
        UPDATE_META2 --> NEXT[准备下一次迭代]
        NEXT -.-> INIT
        
        WARN -.->|用户介入| SCHEDULE
        PASS --> ARCHIVE[归档迭代记录]
    end
    
    style PASS fill:#27ae60,color:#fff
    style WARN fill:#f39c12,color:#fff
```

---

## 3. 异常处理流程

```mermaid
flowchart TD
    subgraph Exception[异常处理]
        E1{执行者<br/>任务失败}
        E2{所有执行者<br/>任务失败}
        E3{用户确认<br/>超时}
        
        E1 -->|记录原因<br/>继续其他任务| RESUME[继续本轮迭代]
        E1 -->|重试评估| RETRY_CHECK{本轮迭代结束后<br/>是否重试?}
        RETRY_CHECK -->|是| RETRY_EXEC[重试失败任务]
        RETRY_CHECK -->|否| RESUME
        
        E2 -->|直接终止| TERMINATE[终止迭代<br/>报告用户]
        
        E3 -->|>30分钟| REMIND[Master发送提醒]
        E3 -->|>60分钟| PAUSE([暂停工作流])
    end
```

---

## 4. 文档更新约束

```mermaid
flowchart LR
    subgraph Docs[文档实时性约束]
        direction TB
        M[meta.md<br/>Master维护] --> |每次迭代开始/结束| UPDATE_M
        C[context.md<br/>各Agent维护] --> |任务交接/状态变更| UPDATE_C
        W[workflow_changelog.md<br/>仅Master写入] --> |每次行为后| APPEND_W
        I[iterations/iteration_N.md<br/>Master统筹] --> |迭代结束| FILL_I
        
        UPDATE_M --> CHECK{时间戳偏差>5分钟?}
        UPDATE_C --> CHECK
        APPEND_W --> CHECK
        FILL_I --> CHECK
        
        CHECK -->|警告| FIX[必须补全文档]
        CHECK -->|正常| CONTINUE[继续执行]
        
        FIX --> CONTINUE
    end
    
    subgraph IterationMd[iteration_N.md区域划分]
        direction TB
        AREA1[执行记录区域<br/>Master写入]
        AREA2[评分区域<br/>Reviewer写入]
        AREA3[复盘区域<br/>Reflector写入]
        AREA1 --- AREA2 --- AREA3
    end
    
    style Docs fill:#3498db,color:#fff
    style IterationMd fill:#9b59b6,color:#fff
```

### 4.1 context.md 大小控制

```mermaid
flowchart LR
    subgraph SizeControl[context.md大小控制]
        direction TB
        START[每次迭代开始] --> CLEAN[Master清理上一次迭代临时数据]
        CLEAN --> KEEP[仅保留：<br/>- 当前任务状态<br/>- 最近2次迭代关键决策<br/>- 共享数据]
        KEEP --> CHECK_SIZE{超过500行?}
        CHECK_SIZE -->|是| ARCHIVE[归档旧内容并创建新文件]
        CHECK_SIZE -->|否| CONTINUE[继续执行]
    end
```

**规则**：
- 每次迭代开始时，Master清理上一次迭代的临时数据
- 仅保留：当前任务状态、最近2次迭代的关键决策、共享数据
- 超过500行时，Master必须归档旧内容并创建新文件

---

## 5. Agent 职责与协作

```mermaid
flowchart TD
    Master[Master<br/>主调度<br/>🔴] --> |任务拆解| Architect[Architect<br/>架构师<br/>🟢]
    Master --> |调度执行| Coder[Coder<br/>编码代理<br/>🔵]
    Master --> |质量评分| Reviewer[Reviewer<br/>审查代理<br/>🟢]
    Master --> |流程复盘| Reflector[Reflector<br/>复盘代理<br/>🟣]
    Master --> |项目探索| Explorer[Project-explorer<br/>探索代理<br/>🟡]
    
    Architect --> |task_list| Master
    Coder --> |代码产出| Master
    Reviewer --> |评分0.7| Master
    Reflector --> |评分0.3| Master
    Explorer --> |project_exploration报告| Master
    
    subgraph Parallel[并行执行上限: 同类任务最多3个]
        Coder
    end
    
    style Master fill:#e74c3c,color:#fff
    style Architect fill:#1abc9c,color:#fff
    style Coder fill:#3498db,color:#fff
    style Reviewer fill:#2ecc71,color:#fff
    style Reflector fill:#9b59b6,color:#fff
    style Explorer fill:#f1c40f,color:#000
```

---

## 6. 迭代记录归档流程

```mermaid
flowchart TD
    START([任务结束<br/>评分≥90 或 达到迭代上限]) --> CHECK_ITER{iterations/<br/>有记录?}
    CHECK_ITER -->|无| DONE([无需归档])
    CHECK_ITER -->|有| ARCHIVE[归档旧记录]
    
    ARCHIVE --> MKDIR[创建时间戳目录<br/>iterations_archive/<br/>YYYYMMDD_HHmmss_taskname]
    MKDIR --> MOVE[移动文件到归档目录]
    MOVE --> CLEAR[清空 iterations/]
    CLEAR --> DONE
    
    style ARCHIVE fill:#f39c12,color:#fff
    style DONE fill:#27ae60,color:#fff
```

**规则**：
- 执行时机：任务结束时（评分≥90或达到最大迭代次数），在结果汇总之前
- 执行者：Master
- 禁止：直接删除旧记录或覆盖
- 禁止：将归档延迟到新任务启动时

---

## 7. workflow_changelog.md 管理

```mermaid
flowchart LR
    subgraph ChangelogSize[workflow_changelog大小控制]
        direction TB
        WS[每次行为后写入] --> SIZE_CHECK{超过2000行<br/>或50KB?}
        SIZE_CHECK -->|否| APPEND[追加记录]
        SIZE_CHECK -->|是| ARCHIVE_W[归档为<br/>workflow_changelog_YYYYMMDD.tar.gz]
        ARCHIVE_W --> NEW_W[创建新文件<br/>保留最近10条摘要]
        APPEND --> DONE_W[完成]
    end
    
    subgraph Format[格式规范]
        direction TB
        F1[快速索引表<br/>顶部 倒序 15行预留]
        F2[完整历史记录<br/>正序 追加到末尾]
        F1 --- F2
    end
    
    style ChangelogSize fill:#9b59b6,color:#fff
    style Format fill:#34495e,color:#fff
```

---

## 8. 项目探索报告管理

```mermaid
flowchart TD
    START([新任务/代码变更后]) --> CHECK_EXIST{project_exploration.md<br/>存在?}
    CHECK_EXIST -->|否| FULL_EXPLORER[ProjectExplorer<br/>全量探索]
    CHECK_EXIST -->|是| CHECK_GIT{git_hash<br/>匹配当前HEAD?}
    
    CHECK_GIT -->|是| REUSE[复用现有报告]
    CHECK_GIT -->|否| INCREMENTAL[增量更新判断]
    
    INCREMENTAL --> DIFF[git diff --name-only]
    DIFF --> SHOULD_UPDATE{should_trigger_update<br/>判断}
    
    SHOULD_UPDATE -->|是| UPDATE[ProjectExplorer<br/>增量更新]
    SHOULD_UPDATE -->|否| REUSE
    
    FULL_EXPLORER --> SAVE[保存报告<br/>更新git_hash]
    UPDATE --> SAVE
    REUSE --> READY[准备执行]
    SAVE --> READY
    
    style FULL_EXPLORER fill:#e67e22,color:#fff
    style UPDATE fill:#f39c12,color:#fff
    style REUSE fill:#27ae60,color:#fff
```

---

## 图例说明

| 颜色 | Agent/组件 |
|------|-----------|
| 🔴 红色 | Master（主调度） |
| 🟢 青色 | Architect（架构师） |
| 🔵 蓝色 | Coder（编码代理） |
| 🟢 绿色 | Reviewer（审查代理） |
| 🟣 紫色 | Reflector（复盘代理） |
| 🟡 黄色 | Project-explorer（探索代理） |

---

## 评分公式

```
最终评分 = Reviewer得分 × 0.7 + Reflector得分 × 0.3
```

## 终止条件

- ✅ 评分 ≥ 90 分
- ✅ 达到 3 次迭代
- ⚠️ 连续 2 次评分变化 < 2 分（需用户介入）

---

## 状态流转

```mermaid
stateDiagram-v2
    [*] --> INIT: 用户确认计划
    INIT --> EXECUTING: 开始迭代
    EXECUTING --> REVIEWING: 任务执行完成
    REVIEWING --> EXECUTING: 评分<90，继续迭代
    REVIEWING --> TERMINATED: 评分≥90 或 达到上限
    TERMINATED --> [*]
    
    note right of REVIEWING : Reviewer+Reflector评分
    note right of EXECUTING : Master调度执行者
```

---

## 文档维护矩阵

| 文件 | 维护者 | 更新时机 | 区域划分 |
|------|--------|----------|----------|
| meta.md | Master | 每次迭代开始/结束 | - |
| context.md | 各Agent | 任务交接/状态变更 | 仅追加自身状态 |
| workflow_changelog.md | Master | 每次工作流行为后 | 快速索引+完整记录 |
| iteration_N.md | Master统筹 | 迭代结束后 | Master/Reviewer/Reflector 各自区域 |
