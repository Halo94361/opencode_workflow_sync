---
name: math-toolkit
description: 当用户需要进行数学计算、算术运算、指数对数、三角函数等操作时触发。适用于计算器场景、算法实现、数据处理中的数学操作。不适用于简单的 LLM 本身就能完成的个位数加减法。
version: 1.0.0
allowed-tools:
  - read
  - write
---

# math-toolkit

## 概述

提供 24 个数学运算操作的工具集，涵盖基础运算、指数对数、三角函数、取整、杂项和角度转换等类别。适用于需要精确数学计算的场景，如算法实现、数据处理、科学计算等。

## 工具列表

### 基础运算

| 函数名 | 参数 | 说明 |
|--------|------|------|
| math_add | a, b | 加法 |
| math_subtract | a, b | 减法 |
| math_multiply | a, b | 乘法 |
| math_divide | a, b | 除法 |

### 指数对数

| 函数名 | 参数 | 说明 |
|--------|------|------|
| math_sqrt | a | 平方根 |
| math_power | base, exp | 幂运算 |
| math_log | a, base? | 对数（base 默认为 e） |
| math_exp | a | 指数运算（e^a） |

### 三角函数

| 函数名 | 参数 | 说明 |
|--------|------|------|
| math_sin | a | 正弦函数（弧度） |
| math_cos | a | 余弦函数（弧度） |
| math_tan | a | 正切函数（弧度） |
| math_asin | a | 反正弦函数（弧度） |
| math_acos | a | 反余弦函数（弧度） |
| math_atan | a | 反正切函数（弧度） |

### 取整

| 函数名 | 参数 | 说明 |
|--------|------|------|
| math_floor | a | 向下取整 |
| math_ceil | a | 向上取整 |
| math_round | a | 四舍五入 |
| math_abs | a | 绝对值 |

### 杂项

| 函数名 | 参数 | 说明 |
|--------|------|------|
| math_factorial | a | 阶乘运算 |
| math_gcd | a, b | 最大公约数 |
| math_max | values[] | 最大值 |
| math_min | values[] | 最小值 |

### 角度转换

| 函数名 | 参数 | 说明 |
|--------|------|------|
| math_deg2rad | a | 度数转弧度 |
| math_rad2deg | a | 弧度转度数 |

## 使用示例

### 基础运算

```typescript
// 加法
math_add({ a: 3, b: 5 }) // 返回 8

// 减法
math_subtract({ a: 10, b: 4 }) // 返回 6

// 乘法
math_multiply({ a: 7, b: 6 }) // 返回 42

// 除法
math_divide({ a: 20, b: 4 }) // 返回 5
```

### 指数对数

```typescript
// 平方根
math_sqrt({ a: 16 }) // 返回 4

// 幂运算
math_power({ base: 2, exp: 10 }) // 返回 1024

// 自然对数
math_log({ a: 2.71828 }) // 返回 1（近似）

// 以 10 为底的对数
math_log({ a: 100, base: 10 }) // 返回 2

// 指数运算
math_exp({ a: 2 }) // 返回 7.389（e^2 近似）
```

### 三角函数

```typescript
// 正弦（注意：输入为弧度）
math_sin({ a: Math.PI / 2 }) // 返回 1

// 余弦
math_cos({ a: 0 }) // 返回 1

// 正切
math_tan({ a: Math.PI / 4 }) // 返回 1

// 反正弦
math_asin({ a: 1 }) // 返回 1.5707963267948966（PI/2）

// 反余弦
math_acos({ a: 1 }) // 返回 0

// 反正切
math_atan({ a: 1 }) // 返回 0.7853981633974483（PI/4）
```

### 取整

```typescript
// 向下取整
math_floor({ a: 4.7 }) // 返回 4

// 向上取整
math_ceil({ a: 4.2 }) // 返回 5

// 四舍五入
math_round({ a: 4.5 }) // 返回 5
math_round({ a: 4.4 }) // 返回 4

// 绝对值
math_abs({ a: -7 }) // 返回 7
```

### 杂项

```typescript
// 阶乘
math_factorial({ a: 5 }) // 返回 120

// 最大公约数
math_gcd({ a: 48, b: 18 }) // 返回 6

// 最大值
math_max({ values: [3, 7, 2, 9, 5] }) // 返回 9

// 最小值
math_min({ values: [3, 7, 2, 9, 5] }) // 返回 2
```

### 角度转换

```typescript
// 度数转弧度
math_deg2rad({ a: 180 }) // 返回 3.141592653589793（PI）

// 弧度转度数
math_rad2deg({ a: Math.PI }) // 返回 180
```