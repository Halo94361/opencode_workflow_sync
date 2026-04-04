#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CLI入口脚本模板
自动生成，请勿手动修改

使用方法：
    python cli.py <command> [options]

示例：
    python cli.py run input.txt -o output.txt -v
    python cli.py --json run input.txt -o output.json
"""

import argparse
import json
import sys
# import os  # 如需处理路径，请取消注释
# from pathlib import Path  # 如需使用Path对象，请取消注释

# ============================================================
# 在此处导入您的工具模块
# ============================================================
# from your_package import main as tool_main
# from your_package.utils import process_file, validate_input

# 全局 JSON 输出模式标志
JSON_OUTPUT = False


def output(result):
    """统一输出函数：支持人类可读和 JSON 两种格式"""
    global JSON_OUTPUT

    if JSON_OUTPUT:
        # JSON 输出模式
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        # 人类可读模式
        if result.get("status") == "error":
            print(f"[错误] {result.get('error', '未知错误')}", file=sys.stderr)
        elif result.get("status") == "success":
            print(result.get("message", "操作完成"))

    return result.get("exit_code", 0 if result.get("status") == "success" else 1)


def setup_run_parser(subparsers):
    """设置 run 子命令的参数解析器"""
    parser = subparsers.add_parser(
        "run",
        help="运行主要任务",
        description="执行核心功能，处理输入文件并生成输出",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  %(prog)s run data.csv -o result.json
  %(prog)s run input.txt --format json -v
        """,
    )

    # 必需参数
    parser.add_argument("input", type=str, help="输入文件路径或数据")

    # 可选参数
    parser.add_argument(
        "-o",
        "--output",
        type=str,
        default="output.txt",
        metavar="FILE",
        help="输出文件路径 (默认: output.txt)",
    )

    parser.add_argument(
        "-f",
        "--format",
        type=str,
        choices=["json", "yaml", "csv", "txt"],
        default="txt",
        help="输出格式 (默认: txt)",
    )

    parser.add_argument("-v", "--verbose", action="store_true", help="详细输出模式")

    return parser


def setup_config_parser(subparsers):
    """设置 config 子命令的参数解析器"""
    parser = subparsers.add_parser(
        "config",
        help="配置管理",
        description="查看或修改工具配置",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  %(prog)s config show
  %(prog)s config set log_level debug
        """,
    )

    config_subparsers = parser.add_subparsers(dest="config_action", help="配置操作")

    # config show
    show_parser = config_subparsers.add_parser("show", help="显示当前配置")
    show_parser.add_argument("-k", "--key", type=str, help="显示指定配置项")

    # config set
    set_parser = config_subparsers.add_parser("set", help="设置配置项")
    set_parser.add_argument("key", type=str, help="配置键名")
    set_parser.add_argument("value", type=str, help="配置值")

    return parser


def run_command(args):
    """执行 run 子命令"""
    if args.verbose:
        print(f"[VERBOSE] 输入文件: {args.input}")
        print(f"[VERBOSE] 输出文件: {args.output}")
        print(f"[VERBOSE] 输出格式: {args.format}")

    # --------------------------------------------------------
    # 在此处实现您的工具调用逻辑
    # --------------------------------------------------------
    # 示例:
    # from your_package import process
    # result = process(
    #     input_path=args.input,
    #     output_path=args.output,
    #     format=args.format,
    #     verbose=args.verbose
    # )

    # 返回结果（支持 JSON 输出）
    result = {
        "status": "success",
        "message": f"任务完成，输出已保存至: {args.output}",
        "output": args.output,
        "format": args.format,
        "input": args.input,
    }
    return output(result)


def config_command(args):
    """执行 config 子命令"""
    if args.config_action == "show":
        if args.key:
            result = {
                "status": "success",
                "key": args.key,
                "value": "<value>",
                "message": f"[配置] {args.key} = <value>",
            }
        else:
            result = {
                "status": "success",
                "config": {
                    "log_level": "info",
                    "output_dir": "./output",
                    "max_workers": 4,
                },
                "message": "[配置] 当前所有配置项:\n  log_level = info\n  output_dir = ./output\n  max_workers = 4",
            }

    elif args.config_action == "set":
        result = {
            "status": "success",
            "key": args.key,
            "value": args.value,
            "message": f"[配置] 已设置 {args.key} = {args.value}",
        }
    else:
        result = {
            "status": "error",
            "error": f"未知的配置操作: {args.config_action}",
            "exit_code": 2,
        }

    return output(result)


def main():
    """主入口函数"""
    global JSON_OUTPUT

    parser = argparse.ArgumentParser(
        prog="cli.py",
        description="工具名称 - 一句话描述工具功能",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
了解更多请参考 CLI_Readme.md

问题反馈: https://github.com/your-repo/issues
        """,
    )

    # 全局选项
    parser.add_argument("-V", "--version", action="version", version="%(prog)s 1.0.0")
    parser.add_argument(
        "-j", "--json", action="store_true", help="JSON 输出模式（机器可读）"
    )

    parser.add_argument(
        "--config",
        type=str,
        default="config.yaml",
        metavar="FILE",
        help="配置文件路径 (默认: config.yaml)",
    )

    # 添加子命令
    subparsers = parser.add_subparsers(dest="command", help="可用子命令", metavar="")

    # 注册子命令
    setup_run_parser(subparsers)
    setup_config_parser(subparsers)

    # 解析参数
    args = parser.parse_args()

    # 设置 JSON 输出模式
    JSON_OUTPUT = args.json

    # 没有指定子命令时显示帮助
    if not args.command:
        parser.print_help()
        return 1

    # 执行对应的子命令
    try:
        if args.command == "run":
            return run_command(args)
        elif args.command == "config":
            return config_command(args)
        else:
            parser.print_help()
            return 1
    except KeyboardInterrupt:
        if JSON_OUTPUT:
            result = {"status": "error", "error": "操作已取消", "exit_code": 130}
            print(json.dumps(result))
        else:
            print("\n操作已取消")
        return 130
    except Exception as e:
        if JSON_OUTPUT:
            result = {"status": "error", "error": str(e), "exit_code": 1}
            print(json.dumps(result))
        else:
            print(f"[错误] {str(e)}", file=sys.stderr)
            if hasattr(args, "verbose") and args.verbose:
                import traceback

                traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
