# CLI工具名称

> 一句话介绍工具的核心功能和用途

## 目录

- [简介](#简介)
- [安装](#安装)
- [快速开始](#快速开始)
- [命令组速查](#命令组速查)
- [使用语法](#使用语法)
- [全局选项](#全局选项)
- [子命令](#子命令)
  - [run](#run---运行任务)
  - [config](#config---配置管理)
- [输出格式](#输出格式)
- [AI Agent 使用指南](#ai-agent-使用指南)
- [示例](#示例)
- [常见问题](#常见问题)
- [更新日志](#更新日志)

---

## 简介

本工具提供 XXX 功能，适用于 XXX 场景。通过命令行界面，您可以：

- 功能点一
- 功能点二
- 功能点三

**系统要求**：Python 3.7+

## 安装

### 方式一：直接使用

```bash
# 克隆项目（请替换为实际仓库地址）
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 安装依赖
pip install -r requirements.txt

# 验证安装
python cli.py --version
```

### 方式二：添加到 PATH（可选）

```bash
# 在 Unix/Linux/macOS 上创建符号链接（请替换为实际路径）
ln -s /path/to/<your-repo>/cli.py /usr/local/bin/<your-tool-name>

# 在 Windows 上添加到 PATH
# 将 cli.py 所在目录添加到系统 PATH 环境变量
```

## 快速开始

```bash
# 基本用法
python cli.py run input.txt -o output.txt

# 详细模式
python cli.py run input.txt -o output.txt -v

# 指定输出格式
python cli.py run input.txt -o output.json -f json

# JSON 输出（供 AI Agent 使用）
python cli.py --json run input.txt -o output.json
```

## 命令组速查

| 子命令 | 说明 | 常用选项 |
|--------|------|----------|
| `run` | 运行主要任务 | `-o`, `-f`, `-v` |
| `config show` | 显示当前配置 | `-k` |
| `config set` | 设置配置项 | `<key> <value>` |

**典型工作流**：
```bash
# 1. 查看当前配置
python cli.py config show

# 2. 修改配置
python cli.py config set output_dir ./results

# 3. 运行任务
python cli.py run data.csv -o output.json -f json
```

## 使用语法

```bash
python cli.py <子命令> [选项] [参数]
```

## 全局选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-V, --version` | 显示版本信息 | - |
| `-j, --json` | JSON 输出模式（机器可读） | False |
| `--config <file>` | 指定配置文件路径 | config.yaml |
| `-h, --help` | 显示帮助信息 | - |

## 子命令

### run - 运行任务

执行核心功能，处理输入并生成输出。

**语法**：
```bash
python cli.py run <输入文件> [选项]
```

**参数**：
| 参数 | 说明 | 类型 | 必需 |
|------|------|------|------|
| `<输入文件>` | 输入文件路径 | string | 是 |

**选项**：
| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-o, --output <file>` | 输出文件路径 | output.txt |
| `-f, --format <format>` | 输出格式 (json/yaml/csv/txt) | txt |
| `-v, --verbose` | 详细输出模式 | False |

---

### config - 配置管理

查看和修改工具配置。

**语法**：
```bash
python cli.py config <操作> [选项]
```

**操作**：
| 操作 | 说明 |
|------|------|
| `show` | 显示当前配置 |
| `set` | 设置配置项 |

#### config show

显示当前配置信息。

**语法**：
```bash
python cli.py config show [-k <key>]
```

**选项**：
| 选项 | 说明 |
|------|------|
| `-k, --key <key>` | 显示指定配置项（可选） |

#### config set

设置配置项。

**语法**：
```bash
python cli.py config set <key> <value>
```

**参数**：
| 参数 | 说明 | 类型 | 必需 |
|------|------|------|------|
| `<key>` | 配置键名 | string | 是 |
| `<value>` | 配置值 | string | 是 |

---

## 输出格式

所有命令支持两种输出模式：

### 人类可读输出（默认）
```bash
python cli.py run data.csv -o result.json
```
输出：
```
任务完成，输出已保存至: result.json
```

### 机器可读输出（JSON）
```bash
python cli.py --json run data.csv -o result.json
```
输出：
```json
{
  "status": "success",
  "output": "result.json",
  "format": "json",
  "processing_time": 0.15
}
```

**使用场景**：
- 调试时使用默认输出
- CI/CD 管道使用 `--json` 解析结果
- AI Agent 消费使用 `--json` 获取结构化数据

---

## AI Agent 使用指南

### 基本原则

1. **始终使用 `--json` 标志**获取可解析输出
2. **检查返回码**：0 表示成功，非零表示失败
3. **解析 stderr**获取错误信息
4. **使用绝对路径**避免工作目录问题
5. **验证输出文件**确保存在且有效

### Agent 调用示例

```bash
# 获取 JSON 输出
result=$(python cli.py --json run input.csv -o output.json)

# 解析结果
status=$(echo $result | jq -r '.status')
output=$(echo $result | jq -r '.output')

if [ "$status" = "success" ]; then
  echo "处理完成: $output"
else
  echo "处理失败: $result" >&2
fi
```

### 返回码约定

| 返回码 | 说明 |
|--------|------|
| 0 | 成功 |
| 1 | 通用错误 |
| 2 | 参数错误 |
| 3 | 文件不存在 |

---

## 示例

### 示例一：基本转换

```bash
python cli.py run data.csv -o result.txt
```

输出：
```
任务完成，输出已保存至: result.txt
```

### 示例二：指定输出格式

```bash
python cli.py run data.csv -o result.json -f json -v
```

输出：
```
[VERBOSE] 输入文件: data.csv
[VERBOSE] 输出文件: result.json
[VERBOSE] 输出格式: json
任务完成，输出已保存至: result.json
```

### 示例三：查看配置

```bash
python cli.py config show
```

输出：
```
[配置] 当前所有配置项:
  log_level = info
  output_dir = ./output
  max_workers = 4
```

### 示例四：修改配置

```bash
python cli.py config set log_level debug
```

输出：
```
[配置] 已设置 log_level = debug
```

---

## 常见问题

### Q1: 如何处理依赖安装失败？

**A1**: 确保使用 Python 3.7+，并尝试：

```bash
# 升级 pip
pip install --upgrade pip

# 安装依赖
pip install -r requirements.txt
```

### Q2: 提示 "command not found"？

**A2**: 检查是否已正确添加到 PATH，或使用完整路径：

```bash
python /path/to/your-tool/cli.py --version
```

### Q3: 如何查看所有可用选项？

**A3**: 使用 `--help`：

```bash
python cli.py --help        # 全局帮助
python cli.py run --help    # run子命令帮助
python cli.py config --help # config子命令帮助
```

### Q4: 配置文件格式错误？

**A4**: 默认配置文件为 `config.yaml`，确保格式正确：

```yaml
log_level: info
output_dir: ./output
max_workers: 4
```

---

## 更新日志

### v1.0.0 (2026-04-04)

- ✨ 初始版本发布
- ✅ 支持 run 命令
- ✅ 支持 config 管理

---

## 许可证

本工具遵循 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 联系方式（请替换为实际信息）

- 问题反馈：[GitHub Issues](https://github.com/<your-username>/<your-repo>/issues)
- 邮箱：&lt;your-email@example.com&gt;
