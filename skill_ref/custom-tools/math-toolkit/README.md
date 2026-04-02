# math-toolkit

数学运算工具集，提供 24 个常用的数学运算操作。

## 安装说明

> **重要**: 此目录为 **参考案例**，不是实际安装位置。
>
> 实际使用时，需将 `math.ts` 和 `package.json` 复制到项目的 `.opencode/tools/` 目录下。

## 操作列表

### 基础运算

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| math_add | 加法 | a: number, b: number | number |
| math_subtract | 减法 | a: number, b: number | number |
| math_multiply | 乘法 | a: number, b: number | number |
| math_divide | 除法 | a: number, b: number | number / {error: "division by zero"} |

### 指数对数

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| math_sqrt | 平方根 | a: number | number |
| math_power | 幂运算 | base: number, exp: number | number |
| math_log | 对数 | a: number, base?: number (默认 e) | number |
| math_exp | 指数 | a: number | number |

### 三角函数

> **注意**：所有三角函数使用弧度制。

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| math_sin | 正弦 | a: number (弧度) | number |
| math_cos | 余弦 | a: number (弧度) | number |
| math_tan | 正切 | a: number (弧度) | number |
| math_asin | 反正弦 | a: number | number |
| math_acos | 反余弦 | a: number | number |
| math_atan | 反正切 | a: number | number |

### 取整

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| math_floor | 向下取整 | a: number | number |
| math_ceil | 向上取整 | a: number | number |
| math_round | 四舍五入 | a: number | number |
| math_abs | 绝对值 | a: number | number |

### 杂项

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| math_factorial | 阶乘 | a: number (非负整数) | number |
| math_gcd | 最大公约数 | a: number, b: number | number |
| math_max | 最大值 | values[]: number | number |
| math_min | 最小值 | values[]: number | number |

### 角度转换

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| math_deg2rad | 度转弧度 | a: number (度) | number |
| math_rad2deg | 弧度转度 | a: number (弧度) | number |

## 详细参数说明

### 基础运算

#### math_add
- **参数**:
  - `a` (number): 第一个加数
  - `b` (number): 第二个加数
- **返回值**: a + b

#### math_subtract
- **参数**:
  - `a` (number): 被减数
  - `b` (number): 减数
- **返回值**: a - b

#### math_multiply
- **参数**:
  - `a` (number): 第一个因数
  - `b` (number): 第二个因数
- **返回值**: a * b

#### math_divide
- **参数**:
  - `a` (number): 被除数
  - `b` (number): 除数
- **返回值**: 
  - 成功: a / b
  - 失败: {error: "division by zero"} 当 b 为 0 时

### 指数对数

#### math_sqrt
- **参数**:
  - `a` (number): 被开方数
- **返回值**: sqrt(a)
- **注意**: 负数开平方会返回 {error: "domain error"}

#### math_power
- **参数**:
  - `base` (number): 底数
  - `exp` (number): 指数
- **返回值**: base^exp

#### math_log
- **参数**:
  - `a` (number): 真数
  - `base` (number, 可选): 底数，默认为 e (自然对数)
- **返回值**: log_base(a)
- **注意**: 
  - a 必须大于 0
  - base 必须大于 0 且不等于 1

#### math_exp
- **参数**:
  - `a` (number): 指数
- **返回值**: e^a

### 三角函数

#### math_sin / math_cos / math_tan
- **参数**:
  - `a` (number): 弧度值
- **返回值**: 对应的三角函数值
- **注意**: 输入必须是弧度制，可使用 math_deg2rad 转换

#### math_asin / math_acos / math_atan
- **参数**:
  - `a` (number): 数值
- **返回值**: 对应的反三角函数值（弧度）
- **注意**: 
  - math_asin 和 math_acos 的输入范围为 [-1, 1]
  - 返回值范围: asin in [-PI/2, PI/2], acos in [0, PI], atan in [-PI/2, PI/2]

### 取整

#### math_floor
- **参数**:
  - `a` (number): 数值
- **返回值**: 不大于 a 的最大整数

#### math_ceil
- **参数**:
  - `a` (number): 数值
- **返回值**: 不小于 a 的最小整数

#### math_round
- **参数**:
  - `a` (number): 数值
- **返回值**: a 四舍五入到最近整数

#### math_abs
- **参数**:
  - `a` (number): 数值
- **返回值**: a 的绝对值

### 杂项

#### math_factorial
- **参数**:
  - `a` (number): 非负整数
- **返回值**: a!
- **注意**: 如果 a 为负数或非整数，返回 {error: "domain error"}

#### math_gcd
- **参数**:
  - `a` (number): 整数
  - `b` (number): 整数
- **返回值**: a 和 b 的最大公约数

#### math_max
- **参数**:
  - `values` (number[]): 数字数组
- **返回值**: 数组中的最大值

#### math_min
- **参数**:
  - `values` (number[]): 数字数组
- **返回值**: 数组中的最小值

### 角度转换

#### math_deg2rad
- **参数**:
  - `a` (number): 度数
- **返回值**: 对应的弧度值 (a * PI / 180)

#### math_rad2deg
- **参数**:
  - `a` (number): 弧度
- **返回值**: 对应的度数值 (a * 180 / PI)

## 使用示例

### 基础运算示例

```javascript
// 加法
const sum = math_add(5, 3);  // 返回 8

// 减法
const diff = math_subtract(10, 4);  // 返回 6

// 乘法
const product = math_multiply(7, 6);  // 返回 42

// 除法
const quotient = math_divide(20, 4);  // 返回 5
const errorResult = math_divide(10, 0);  // 返回 {error: "division by zero"}
```

### 指数对数示例

```javascript
// 平方根
const root = math_sqrt(16);  // 返回 4

// 幂运算
const power = math_power(2, 10);  // 返回 1024

// 自然对数
const ln = math_log(10);  // 返回约 2.302585

// 以 2 为底的对数
const log2 = math_log(8, 2);  // 返回 3

// 指数
const expVal = math_exp(2);  // 返回约 7.389056
```

### 三角函数示例

```javascript
// 计算 sin(PI/2)
const sinVal = math_sin(Math.PI / 2);  // 返回 1

// 计算 cos(60度)
const cosVal = math_cos(math_deg2rad(60));  // 返回 0.5

// 计算 tan(45度)
const tanVal = math_tan(math_deg2rad(45));  // 返回 1

// 反正弦
const asinVal = math_asin(0.5);  // 返回约 0.523599 (30度)
```

### 取整示例

```javascript
// 向下取整
const fl = math_floor(4.7);  // 返回 4

// 向上取整
const cl = math_ceil(4.1);  // 返回 5

// 四舍五入
const rd = math_round(4.5);  // 返回 5

// 绝对值
const absVal = math_abs(-10);  // 返回 10
```

### 杂项示例

```javascript
// 阶乘
const fact = math_factorial(5);  // 返回 120

// 最大公约数
const g = math_gcd(48, 18);  // 返回 6

// 最大值
const maxVal = math_max([1, 5, 3, 9, 2]);  // 返回 9

// 最小值
const minVal = math_min([1, 5, 3, 9, 2]);  // 返回 1
```

### 角度转换示例

```javascript
// 度转弧度
const rad = math_deg2rad(180);  // 返回 PI (约 3.141593)

// 弧度转度
const deg = math_rad2deg(Math.PI);  // 返回 180
```

## 注意事项

### 三角函数弧度制
所有三角函数（math_sin, math_cos, math_tan 等）均使用**弧度制**。如果需要使用角度，请先使用 math_deg2rad 转换为弧度。

### 除零保护
math_divide 函数在除数为 0 时会返回错误对象 {error: "division by zero"}，不会抛出异常。请在调用后检查返回值是否为错误对象。

### 对数底数
math_log 函数默认底数为 e（自然对数）。如需计算其他底数的对数，请显式传入 base 参数。

### 阶乘输入范围
math_factorial 仅接受非负整数。负数或小数会返回错误。

### 浮点数精度
涉及浮点数的运算可能存在精度问题。对于需要精确结果的场景，建议在应用层进行精度处理。

### 数值范围
某些操作（如 math_factorial、math_power）可能产生非常大的数值，可能导致溢出。请确保输入值在合理范围内。
