import { tool } from "@opencode-ai/plugin"

// ============================================================
// 基础运算 (4个)
// ============================================================

export const math_add = tool({
  description: "Add two numbers",
  args: {
    a: tool.schema.number().describe("First number"),
    b: tool.schema.number().describe("Second number"),
  },
  async execute(args) {
    return String(args.a + args.b)
  },
})

export const math_subtract = tool({
  description: "Subtract two numbers",
  args: {
    a: tool.schema.number().describe("First number (minuend)"),
    b: tool.schema.number().describe("Second number (subtrahend)"),
  },
  async execute(args) {
    return String(args.a - args.b)
  },
})

export const math_multiply = tool({
  description: "Multiply two numbers",
  args: {
    a: tool.schema.number().describe("First number"),
    b: tool.schema.number().describe("Second number"),
  },
  async execute(args) {
    return String(args.a * args.b)
  },
})

export const math_divide = tool({
  description: "Divide two numbers",
  args: {
    a: tool.schema.number().describe("Dividend"),
    b: tool.schema.number().describe("Divisor"),
  },
  async execute(args) {
    if (args.b === 0) {
      return JSON.stringify({ error: "division by zero" })
    }
    return String(args.a / args.b)
  },
})

// ============================================================
// 指数对数 (4个)
// ============================================================

export const math_sqrt = tool({
  description: "Calculate the square root of a number",
  args: {
    a: tool.schema.number().describe("The number to calculate square root"),
  },
  async execute(args) {
    if (args.a < 0) {
      return JSON.stringify({ error: "domain error" })
    }
    return String(Math.sqrt(args.a))
  },
})

export const math_power = tool({
  description: "Calculate base raised to the power of exponent",
  args: {
    base: tool.schema.number().describe("The base number"),
    exp: tool.schema.number().describe("The exponent"),
  },
  async execute(args) {
    return String(Math.pow(args.base, args.exp))
  },
})

export const math_log = tool({
  description: "Calculate logarithm of a number with optional base",
  args: {
    a: tool.schema.number().describe("The number to calculate logarithm (must be positive)"),
    base: tool.schema.number().optional().describe("The base of the logarithm (default: e)"),
  },
  async execute(args) {
    if (args.a <= 0) {
      return JSON.stringify({ error: "domain error" })
    }
    if (args.base !== undefined && (args.base <= 0 || args.base === 1)) {
      return JSON.stringify({ error: "domain error" })
    }
    if (args.base !== undefined) {
      return String(Math.log(args.a) / Math.log(args.base))
    }
    return String(Math.log(args.a))
  },
})

export const math_exp = tool({
  description: "Calculate e raised to the power of a number",
  args: {
    a: tool.schema.number().describe("The exponent"),
  },
  async execute(args) {
    return String(Math.exp(args.a))
  },
})

// ============================================================
// 三角函数 (6个) - 弧度制
// ============================================================

export const math_sin = tool({
  description: "Calculate the sine of an angle in radians",
  args: {
    a: tool.schema.number().describe("Angle in radians"),
  },
  async execute(args) {
    return String(Math.sin(args.a))
  },
})

export const math_cos = tool({
  description: "Calculate the cosine of an angle in radians",
  args: {
    a: tool.schema.number().describe("Angle in radians"),
  },
  async execute(args) {
    return String(Math.cos(args.a))
  },
})

export const math_tan = tool({
  description: "Calculate the tangent of an angle in radians",
  args: {
    a: tool.schema.number().describe("Angle in radians"),
  },
  async execute(args) {
    return String(Math.tan(args.a))
  },
})

export const math_asin = tool({
  description: "Calculate the arcsine (inverse sine) of a number",
  args: {
    a: tool.schema.number().describe("Number in range [-1, 1]"),
  },
  async execute(args) {
    if (args.a < -1 || args.a > 1) {
      return JSON.stringify({ error: "domain error" })
    }
    return String(Math.asin(args.a))
  },
})

export const math_acos = tool({
  description: "Calculate the arccosine (inverse cosine) of a number",
  args: {
    a: tool.schema.number().describe("Number in range [-1, 1]"),
  },
  async execute(args) {
    if (args.a < -1 || args.a > 1) {
      return JSON.stringify({ error: "domain error" })
    }
    return String(Math.acos(args.a))
  },
})

export const math_atan = tool({
  description: "Calculate the arctangent (inverse tangent) of a number",
  args: {
    a: tool.schema.number().describe("The number to calculate arctangent"),
  },
  async execute(args) {
    return String(Math.atan(args.a))
  },
})

// ============================================================
// 取整 (4个)
// ============================================================

export const math_floor = tool({
  description: "Round a number down to the nearest integer",
  args: {
    a: tool.schema.number().describe("The number to round down"),
  },
  async execute(args) {
    return String(Math.floor(args.a))
  },
})

export const math_ceil = tool({
  description: "Round a number up to the nearest integer",
  args: {
    a: tool.schema.number().describe("The number to round up"),
  },
  async execute(args) {
    return String(Math.ceil(args.a))
  },
})

export const math_round = tool({
  description: "Round a number to the nearest integer",
  args: {
    a: tool.schema.number().describe("The number to round"),
  },
  async execute(args) {
    return String(Math.round(args.a))
  },
})

export const math_abs = tool({
  description: "Calculate the absolute value of a number",
  args: {
    a: tool.schema.number().describe("The number to get absolute value"),
  },
  async execute(args) {
    return String(Math.abs(args.a))
  },
})

// ============================================================
// 杂项 (4个)
// ============================================================

export const math_factorial = tool({
  description: "Calculate the factorial of a non-negative integer",
  args: {
    a: tool.schema.number().describe("Non-negative integer"),
  },
  async execute(args) {
    if (args.a < 0 || !Number.isInteger(args.a)) {
      return JSON.stringify({ error: "domain error" })
    }
    if (args.a > 170) {
      return JSON.stringify({ error: "overflow error" })
    }
    let result = 1
    for (let i = 2; i <= args.a; i++) {
      result *= i
    }
    return String(result)
  },
})

export const math_gcd = tool({
  description: "Calculate the greatest common divisor of two integers",
  args: {
    a: tool.schema.number().describe("First integer"),
    b: tool.schema.number().describe("Second integer"),
  },
  async execute(args) {
    const intA = Math.floor(args.a)
    const intB = Math.floor(args.b)
    let a = Math.abs(intA)
    let b = Math.abs(intB)
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return String(a)
  },
})

export const math_max = tool({
  description: "Find the maximum value in an array of numbers",
  args: {
    values: tool.schema.array(tool.schema.number()).describe("Array of numbers"),
  },
  async execute(args) {
    if (args.values.length === 0) {
      return JSON.stringify({ error: "empty array" })
    }
    return String(Math.max(...args.values))
  },
})

export const math_min = tool({
  description: "Find the minimum value in an array of numbers",
  args: {
    values: tool.schema.array(tool.schema.number()).describe("Array of numbers"),
  },
  async execute(args) {
    if (args.values.length === 0) {
      return JSON.stringify({ error: "empty array" })
    }
    return String(Math.min(...args.values))
  },
})

// ============================================================
// 角度转换 (2个)
// ============================================================

export const math_deg2rad = tool({
  description: "Convert degrees to radians",
  args: {
    a: tool.schema.number().describe("Angle in degrees"),
  },
  async execute(args) {
    return String(args.a * (Math.PI / 180))
  },
})

export const math_rad2deg = tool({
  description: "Convert radians to degrees",
  args: {
    a: tool.schema.number().describe("Angle in radians"),
  },
  async execute(args) {
    return String(args.a * (180 / Math.PI))
  },
})
