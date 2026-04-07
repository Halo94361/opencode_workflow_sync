---
name: cli-wrapper
description: >-
  当用户要求将工具CLI化、生成命令行接口或创建CLI包装器时触发。
  适用于Python及Go/Rust/C++等语言的开源工具或自研工具，不适用于已有完整CLI接口的工具。
allowed-tools:
  - read
  - write
  - edit
  - glob
  - grep
version: 1.2.0
---

## CLI化工具技能

### 概述

将任意Python或其他语言的工具转换为命令行界面（CLI）工具。使用Python标准库`argparse`作为CLI框架，自动生成CLI入口脚本和CLI_Readme.md使用文档。

### 前置要求

- 输入：目标工具的源码路径或项目目录
- 输出：CLI入口脚本 + CLI_Readme.md文档
- 环境：Python 3.7+

### 执行流程

#### 步骤一：分析目标工具

1. 扫描目标目录，识别项目结构和入口文件
2. 读取主要源码文件（`__main__.py`、`*.py`、`main.*`等）
3. 识别核心函数和参数接口
4. 确定CLI化的功能范围

**分析维度**：
| 维度 | 说明 |
|------|------|
| 入口函数 | 查找`def main()`、`if __name__ == "__main__"` |
| 函数签名 | 分析参数类型、默认值、是否必需 |
| 配置项 | 环境变量、配置文件路径 |
| 依赖项 | 外部库依赖 |

#### 步骤二：设计CLI接口

根据分析结果设计命令行接口：

```python
# CLI接口设计原则
1. 使用argparse.ArgumentParser
2. 子命令按功能模块组织（如 install/run/config）
3. 长选项使用 `--` 前缀，简写使用 `-` 前缀
4. 参数分组：必需参数、可选参数、配置参数
5. 帮助信息完整，包含默认值说明
```

**CLI参数规范**：

| 参数类型 | 格式 | 示例 |
|----------|------|------|
| 必需参数 | 位置参数 | `cli.py <input_file>` |
| 可选参数 | `--name` 或 `-n` | `--output`, `-o` |
| 布尔开关 | `--flag/--no-flag` | `--verbose/--no-verbose` |
| 多值参数 | `nargs="+"` | `--files <file1> <file2>...` |

#### 步骤三：生成CLI入口脚本

创建CLI入口脚本，文件命名为：`cli.py`

```python
# cli.py 基本结构
import argparse
import sys
from your_module import main as tool_main

def main():
    parser = argparse.ArgumentParser(
        description="工具名称 - 一句话描述",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="了解更多请参考 CLI_Readme.md"
    )
    
    # 添加子命令（按需）
    subparsers = parser.add_subparsers(dest="command", help="子命令")
    
    # run子命令
    run_parser = subparsers.add_parser("run", help="运行任务")
    run_parser.add_argument("input", help="输入文件")
    run_parser.add_argument("-o", "--output", default="output.txt", help="输出文件")
    
    # 全局参数
    parser.add_argument("-v", "--verbose", action="store_true", help="详细输出")
    parser.add_argument("--config", default="config.yaml", help="配置文件路径")
    
    args = parser.parse_args()
    
    # 执行逻辑
    if args.verbose:
        print(f"命令: {args.command}, 输入: {args.input}")
    
    # 调用原工具
    tool_main(args)

if __name__ == "__main__":
    main()
```

#### 步骤四：生成CLI_Readme.md文档

创建CLI使用说明文档，使用 `{baseDir}/templates/cli_readme.template.md` 作为基础模板。

**文档结构要求**：
- 标题和简介
- 安装说明
- 快速开始
- 使用语法
- 全局选项表格
- 子命令详细说明（参数/选项/示例）
- 常见问题 FAQ
- 更新日志

**示例输出格式**：
参见 `cli_readme.template.md` 模板文件。

#### 步骤五：其他语言工具处理

对于非 Python 工具（Go/Rust/C++ 等），仍使用 Python argparse 创建 CLI 包装器：

```python
# 非Python工具的CLI包装器示例
import argparse
import subprocess
import sys

def main():
    parser = argparse.ArgumentParser(description="Go工具 CLI包装器")
    parser.add_argument("input", help="输入文件")
    parser.add_argument("-o", "--output", help="输出文件")
    
    args = parser.parse_args()
    
    # 调用原工具（Go编译的可执行文件）
    cmd = ["./my-go-tool", "-input", args.input]
    if args.output:
        cmd.extend(["-output", args.output])
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    print(result.stdout)
    
    return result.returncode
```

**处理策略**：
| 原工具类型 | 包装策略 |
|-----------|---------|
| Python 模块 | `from module import func` 直接调用 |
| Python 脚本 | `subprocess.run([sys.executable, "script.py", ...])` |
| 编译可执行文件 | `subprocess.run(["./tool", ...])` |
| Shell 脚本 | `subprocess.run(["bash", "script.sh", ...])` |

#### 步骤六：测试指引（可选）

为生成的 CLI 添加测试用例，确保功能正确性：

**测试层次**：

| 层级 | 说明 | 文件 |
|------|------|------|
| 单元测试 | 测试核心函数，使用模拟数据 | `test_core.py` |
| 集成测试 | 测试 CLI 入口，使用真实文件 | `test_cli.py` |

**测试结构示例**：
```python
# test_cli.py
import subprocess
import json
import pytest

class TestCLI:
    def _run(self, args):
        """执行 CLI 命令并返回结果"""
        result = subprocess.run(
            ["python", "cli.py"] + args,
            capture_output=True, text=True
        )
        return result
    
    def test_help(self):
        """测试 --help 输出"""
        result = self._run(["--help"])
        assert result.returncode == 0
        assert "usage:" in result.stdout
    
    def test_json_output(self):
        """测试 JSON 输出格式"""
        result = self._run(["--json", "run", "test.txt", "-o", "out.json"])
        if result.returncode == 0:
            data = json.loads(result.stdout)
            assert "status" in data
    
    def test_invalid_command(self):
        """测试无效命令"""
        result = self._run(["invalid-command"])
        assert result.returncode != 0
```

**验证要点**：
- 命令帮助输出正确
- JSON 输出可解析
- 无效输入返回非零退出码
- 输出文件存在且格式正确

### 输出格式

#### CLI入口脚本 (`cli.py`)
- 文件位置：目标项目根目录
- 编码：UTF-8
- 格式：Python 3.7+ 兼容

#### CLI使用文档 (`CLI_Readme.md`)
- 文件位置：与`cli.py`同目录
- 编码：UTF-8
- 格式：Markdown

### AI Agent 使用指南

#### 基本原则

| 原则 | 说明 |
|------|------|
| 使用 `--json` | 获取机器可读输出 |
| 检查返回码 | 0 表示成功，非零表示失败 |
| 使用绝对路径 | 避免工作目录问题 |
| 验证输出 | 确保文件存在且格式正确 |

#### 输出规范

```json
{
  "status": "success|error",
  "output": "<输出文件路径>",
  "error": "<错误信息（仅当 status 为 error 时）>",
  "metadata": {
    "processing_time": 0.15,
    "input_size": 1024
  }
}
```

#### 返回码约定

| 返回码 | 说明 |
|--------|------|
| 0 | 成功 |
| 1 | 通用错误 |
| 2 | 参数错误 |
| 3 | 文件/资源不存在 |

### 使用示例

**场景**：将一个数据处理工具 CLI化

**原始项目结构**：
```
data-processor/
├── processor.py      # 核心处理模块
│   def process_data(input_file, output_file, format_type):
│       ...
└── utils.py          # 工具函数
```

**CLI化后项目结构**：
```
data-processor/
├── processor.py      # 原有模块（保持不变）
├── utils.py          # 原有模块（保持不变）
├── cli.py            # 【新增】CLI 入口
└── CLI_Readme.md     # 【新增】使用文档
```

**生成的 cli.py 使用方式**：
```bash
# 查看帮助
python cli.py --help

# 运行处理任务
python cli.py run data.csv -o result.json -f json -v

# 查看配置
python cli.py config show
```

### Gotchas（踩坑点）

- ⚠️ **参数冲突**：避免CLI参数名与原函数参数名冲突，必要时添加前缀或重命名
- ⚠️ **类型转换**：CLI传入的字符串需在调用原函数前转换为正确类型（如`int()`、`list()`）
- ⚠️ **相对路径**：CLI脚本应将相对路径转换为绝对路径再传给原工具，避免工作目录问题
- ⚠️ **子命令设计**：当工具功能复杂时，使用子命令组织（如`run`、`install`、`config`），避免单一命令参数过多
- ⚠️ **帮助信息**：每个参数必须提供`help`说明，包含默认值和类型信息
- ⚠️ **错误处理**：CLI入口应捕获并友好展示异常，而非直接traceback

### 术语表

| 术语 | 说明 |
|------|------|
| argparse | Python标准库，用于创建命令行界面 |
| CLI入口脚本 | 将工具CLI化的入口文件，通常命名为`cli.py` |
| CLI_Readme.md | CLI工具的使用说明文档 |
| 子命令 | 通过子命令组织不同功能，如`git commit`中的`commit` |

### 相关资源

#### 模板文件位置

| 模板 | 路径 | 说明 |
|------|------|------|
| Python CLI 入口 | `{baseDir}/templates/python_cli.template.py` | 标准 CLI 入口模板 |
| CLI 使用文档 | `{baseDir}/templates/cli_readme.template.md` | CLI_Readme.md 基础模板 |

#### 外部参考

- [argparse官方文档](https://docs.python.org/3/library/argparse.html)
- [Python CLI最佳实践](https://docs.python-guide.org/scenarios/cli/)
