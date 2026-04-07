# Multi-Agent Workflow 流程图

## 1. 主工作流程

```mermaid
flowchart TD
    START([接收用户需求]) --> CHECK{是否触发协同工作流?}
    CHECK -->|简单问答| END1([普通模式处理])
    CHECK -->|复杂任务| EXPLORE[项目探索]
    
    EXPLORE --> EXPLORE_CHECK{已有报告?}
    EXPLORE_CHECK -->|是| REUSE[复用已有报告]
    EXPLORE_CHECK -->|否| NEW_EXP[执行全量探索]
    REUSE --> ARCHITECT
    NEW_EXP --> ARCHITECT
    
    ARCHITECT[Architect 任务拆解] --> TASK_LIST[生成 task_list.md]
    TASK_LIST --> USER_CONFIRM{用户确认?}
    
    USER_CONFIRM -->|取消| END2([终止工作流])
    USER_CONFIRM -->|修改| ARCHITECT
    USER_CONFIRM -->|批准| EXEC_LOOP
    
    subgraph EXEC_LOOP[执行循环 - 最多3次]
        SCHEDULE[Master 调度执行者] --> ITER_CHECK{迭代次数 < 3?}
        ITER_CHECK -->|是| EXECUTE[执行任务]
        ITER_CHECK -->|否| FORCE_END([达到上限<br/>强制终止])
        EXECUTE --> REVIEWER[Reviewer 评分<br/>权重 0.7]
        REVIEWER --> REFLECTOR[Reflector 评分<br/>权重 0.3]
        REFLECTOR --> CALC[计算最终评分<br/>$$Final = R_r*0.7 + R_f*0.3$$]
        CALC --> CHECK_SCORE{评分 ≥ 90?}
        CHECK_SCORE -->|是| DONE[迭代完成]
        CHECK_SCORE -->|否| CHECK_PROGRESS{连续2次评分\n变化<2分?}
        CHECK_PROGRESS -->|否| SCHEDULE
        CHECK_PROGRESS -->|是| HELP([向用户求助])
    end
    
    DONE --> SUMMARIZE[结果汇总]
    HELP --> USER_CONFIRM
    USER_CONFIRM -->|批准| EXEC_LOOP
    SUMMARIZE --> FINAL([输出执行报告])
```

## 2. 执行循环详细流程

```mermaid
flowchart LR
    subgraph Iteration[迭代 N]
        SCHEDULE[调度 Coder 执行] --> ITER_CHECK{迭代次数 < 3?}
        ITER_CHECK -->|是| EXECUTE[Reviewer 质量评分]
        ITER_CHECK -->|否| FORCE_END([达到上限<br/>强制终止])
        EXECUTE --> REFLECTOR[Reflector 流程评分]
        REFLECTOR --> CALC{评分计算}
        
        CALC -->|≥90| PASS[通过<br/>终止迭代]
        CALC -->|<90| PROGRESS[无进展检测]
        
        PROGRESS --> PROGRESS_CHECK{连续2次评分\n变化<2分?}
        PROGRESS_CHECK -->|否| RETRY[继续下次迭代]
        PROGRESS_CHECK -->|是| WARN[触发警告<br/>向用户求助]
        WARN -.->|用户介入| SCHEDULE
    end
```

## 3. 异常处理流程

```mermaid
flowchart TD
    subgraph Exception[异常处理]
        E1{执行者<br/>任务失败}
        E2{所有执行者<br/>任务失败}
        E3{用户确认<br/>超时}
        
        E1 -->|记录原因<br/>继续其他任务| RESUME[继续本轮迭代]
        E1 -->|重试评估| RETRY_CHECK{是否重试?}
        RETRY_CHECK -->|是| RETRY_EXEC[重试失败任务]
        RETRY_CHECK -->|否| RESUME
        
        E2 -->|直接终止| TERMINATE[终止工作流<br/>报告用户]
        
        E3 -->|发送提醒| WAIT[等待用户]
        WAIT --> TIMEOUT{超过60分钟?}
        TIMEOUT -->|是| PAUSE([暂停工作流])
        TIMEOUT -->|否| WAIT
    end
```

## 4. 文档更新约束

```mermaid
flowchart LR
    subgraph Docs[文档实时性约束]
        direction TB
        M[meta.md<br/>Master维护] --> |每次迭代开始/结束| UPDATE_M
        C[context.md<br/>各Agent维护] --> |任务交接/状态变更| UPDATE_C
        W[workflow_changelog.md<br/>仅Master写入] --> |每次行为| APPEND_W
        I[iterations/iteration_N.md<br/>Master统筹] --> |迭代结束| FILL_I
        
        UPDATE_M --> CHECK{时间戳偏差>5分钟?}
        UPDATE_C --> CHECK
        APPEND_W --> CHECK
        FILL_I --> CHECK
        
        CHECK -->|警告| FIX[补全文档]
        CHECK -->|正常| CONTINUE[继续执行]
    end
    
    subgraph Constraints[操作约束]
        direction TB
        C1[禁止修改其他Agent内容] --> C2[禁止延迟更新状态文件]
        C2 --> C3[禁止写入workflow_changelog.md]
        C3 --> C4[必须立即更新状态文件]
        C4 --> C5[必须验证状态文件一致性]
    end
    
    Docs --> Constraints
```

### 4.1 context.md 大小控制

```mermaid
flowchart LR
    subgraph SizeControl[context.md大小控制]
        direction TB
        START[每次迭代开始] --> CLEAN[Master清理上一次迭代临时数据]
        CLEAN --> KEEP[仅保留当前任务状态、最近2次迭代关键决策、共享数据]
        KEEP --> CHECK_SIZE{超过500行?}
        CHECK_SIZE -->|是| ARCHIVE[归档旧内容并创建新文件]
        CHECK_SIZE -->|否| CONTINUE[继续执行]
    end
```

**规则**：
- 每次迭代开始时，Master清理上一次迭代的临时数据
- 仅保留：当前任务状态、最近2次迭代的关键决策、共享数据
- 超过500行时，Master必须归档旧内容并创建新文件

## 5. Agent 职责与协作

```mermaid
flowchart TD
    Master[Master<br/>主调度] --> |任务拆解| Architect[Architect<br/>架构师]
    Master --> |调度执行| Coder[Coder<br/>编码代理]
    Master --> |质量评分| Reviewer[Reviewer<br/>审查代理]
    Master --> |流程复盘| Reflector[Reflector<br/>复盘代理]
    Master --> |项目探索| Explorer[Project-explorer<br/>探索代理]
    
    Architect --> |task_list| Master
    Coder --> |代码产出| Master
    Reviewer --> |评分0.7| Master
    Reflector --> |评分0.3| Master
    Explorer --> |报告| Master
    
    style Master fill:#ff6b6b,color:#fff
    style Architect fill:#4ecdc4,color:#fff
    style Coder fill:#45b7d1,color:#fff
    style Reviewer fill:#96ceb4,color:#fff
    style Reflector fill:#dda0dd,color:#fff
    style Explorer fill:#f7dc6f,color:#000
```

## 6. 迭代记录归档流程

```mermaid
flowchart TD
    START([新任务启动]) --> CHECK_ITER{iterations/<br/>有旧记录?}
    CHECK_ITER -->|无| CREATE[创建新目录]
    CHECK_ITER -->|有| ARCHIVE[归档旧记录]
    
    ARCHIVE --> MKDIR[创建时间戳目录<br/>YYYYMMDD_HHmmss_taskname]
    MKDIR --> MOVE[移动文件到归档]
    MOVE --> CLEAR[清空 iterations/]
    CLEAR --> CREATE
    
    CREATE --> READY[准备执行]
    
    style ARCHIVE fill:#f39c12,color:#fff
    style READY fill:#27ae60,color:#fff
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

## 评分公式

```
最终评分 = Reviewer得分 × 0.7 + Reflector得分 × 0.3
```

## 终止条件

- ✅ 评分 ≥ 90 分
- ✅ 达到 3 次迭代
- ⚠️ 连续 2 次评分变化 < 2 分（需用户介入）
