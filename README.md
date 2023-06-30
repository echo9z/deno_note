# Deno

Deno ([/ˈdiːnoʊ/](http://ipa-reader.xyz/?text=%CB%88di%CB%90no%CA%8A), 发音 `dee-no`) 是一个 JavaScript/TypeScript 的运行时，默认使用安全环境执行代码

Deno 含有以下功能亮点：

- 默认安全。外部代码没有文件系统、网络、环境的访问权限，除非显式开启。
- 支持开箱即用的 TypeScript 的环境。
- 只分发一个独立的可执行文件（deno）。
- 有着内建的工具箱，比如一个依赖信息查看器（deno info）和一个代码格式化工具（deno fmt）。
- 有一组经过审计的标准模块，保证能在 Deno 上工作。
- 脚本代码能被打包为一个单独的 JavaScript 文件。

Deno 是一个跨平台的运行时，即基于 Google V8 引擎的运行时环境，该运行时环境是使用 Rust 语言开发的，并使用 Tokio 库来构建事件循环系统。Deno 建立在 V8、Rust 和 Tokio 的基础上，它的架构如下：

![](./img/iShot_2023-06-29_17.51.59.png)

1、Rust 是由 Mozilla 主导开发的通用、编译型编程语言。设计准则为 “安全、并发、实用“，支持函数式、并发式、过程式以及面向对象的编程风格。Deno 使用 Rust 语言来封装 V8 引擎，通过 libdeno 绑定，我们就可以在 JavaScript 中调用隔离的功能。

2、Tokio 是 Rust 编程语言的异步运行时，提供异步事件驱动平台，构建快速，可靠和轻量级网络应用。利用 Rust 的所有权和并发模型确保线程安全。Tokio 构建于 Rust 之上，提供极快的性能，使其成为高性能服务器应用程序的理想选择。在 Deno 中 Tokio 用于并行执行所有的异步 IO 任务。

3、V8 是一个由 Google 开发的开源 JavaScript 引擎，用于 Google Chrome 及 Chromium 中。V8 在运行之前将JavaScript 编译成了机器代码，而非字节码或是解释执行它，以此提升性能。更进一步，使用了如内联缓存（inline caching）等方法来提高性能。有了这些功能，JavaScript 程序与 V8 引擎的速度媲美二进制编译。在 Deno 中，V8 引擎用于执行 JavaScript 代码。

4、Deno与Node.js的核心模型是一致的，都是异步非阻塞I/O。所以Deno与Node.js在使用场景上基本一致，适合I/O密集型，不适用于CPU密集型。开发中要避免使用同步I/O和复杂计算场景。

## 官方文档

- 首页：[https://deno.land/](https://deno.land/)

- 官方文档：[Introduction | Manual | Deno](https://deno.land/manual)

- 官方API：https://doc.deno.land/deno/stable

- 官方标准库地址：[https://deno.land/std](https://deno.land/std@0.142.0)

- 第三方库地址：https://deno.land/x

## 安装Deno

```shell
# Shell (Mac, Linux):
$ curl -fsSL https://deno.land/install.sh | sh

# PowerShell (Windows):
$ iwr https://deno.land/install.ps1 -useb | iex

# Homebrew (Mac):
$ brew install deno

# Chocolatey (Windows):
$ choco install deno

# Scoop (Windows):
$ scoop install deno

# Build and install from source using Cargo:
$ cargo install deno --locked
```

更新Deno 版本，您可以运行：

```shell
deno upgrade
```

更新安装特定版本的 Deno：

```shell
deno upgrade --version 1.0.1
```

## Deno cli命令行

```shell
# 以 REPL 模式启动：
$ deno
# 执行一个脚本：
$ deno run https://deno.land/std/examples/welcome.ts
# 在 Shell 中执行一段代码：
$ deno eval "console.log(30933 + 404)"
```

### 汇总 26 个通用指令

结合 deno --help 中出现的选项以及通常也会在 14 个内置工具包的帮助信息中看到的选项，将通用指令整理在这里做一个通览（只要某指令被使用两次及以上便视为通用指令，几乎涵盖了所有）：

| 序号  | 选项                             | 哪些工具可以使用？                                                                  | 用途                                                                |
| --- | ------------------------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 01  | -h, --help                     | 全部                                                                         | 打印帮助信息                                                            |
| 02  | -L, --log-level                | 全部                                                                         | 设置日志级别 [可能的值: debug, info]                                        |
| 03  | -q, --quiet                    | 全部                                                                         | 禁止诊断输出；默认情况下，子命令会将可读性友好的诊断消息打印到 stderr；如果设置了这个标志，则将这些消息限制为 errors |
| 04  | -A, --allow-all                | run, install, test                                                         | 允许所有权限，这将禁用所有安全限制                                                 |
| 05  | --allow-env                    | run, install, test                                                         | 允许环境访问，例如读取和设置环境变量                                                |
| 06  | --allow-hrtime                 | run, install, test                                                         | 允许高精度时间测量，高精度时间能够在计时攻击和特征识别中使用                                    |
| 07  | --allow-net=                   | run, install, test                                                         | 允许网络访问。可以指定一系列用逗号分隔的域名，来提供域名白名单                                   |
| 08  | --allow-plugin                 | run, install, test                                                         | 允许加载插件。请注意：这目前是一个不稳定功能                                            |
| 09  | --allow-read=                  | run, install, test                                                         | 允许读取文件系统。可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单。                           |
| 10  | --allow-run                    | run, install, test                                                         | 允许运行子进程。请注意，子进程不在沙箱中运行，因此没有与 deno 进程相同的安全限制，请谨慎使用                 |
| 11  | --allow-write=                 | run, install, test                                                         | 允许写入文件系统。您可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单                           |
| 12  | --cert                         | run, install, bundle, chche, eval, info, test, upgrade, repl               | 从 PEM 编码的文件中加载证书颁发机构                                              |
| 13  | -c, --config                   | run, install, budle, cache, test                                           | 读取 tsconfig.json 配置文件                                             |
| 14  | --unstable                     | run, install, bundle, cache, doc, eval, fmt, info, lint, test, types, repl | 开启不稳定的 APIs 支持                                                    |
| 15  | --inspect=HOST:PORT            | run, eval, test, repl                                                      | 激活监听器 主机:端口 (默认: 127.0.0.1:9229)                                  |
| 16  | --inspect-brk=HOST:PORT        | run, eval, test, repl                                                      | 在 主机:端口 上激活监听器，并在用户脚本启动时中断                                        |
| 17  | --v8-flags=                    | run, eval, test, repl                                                      | 设置 V8 命令行选项。帮助： --v8-flags=--help                                 |
| 18  | --cached-only                  | run, test                                                                  | 要求远程依赖项已经被缓存                                                      |
| 19  | -r, --reload=<CACHE_BLOCKLIST> | run, cache, doc, test                                                      | 重新加载源代码缓存（重新编译TypeScript）。重新加载全部/仅标准模块/特定模块                       |
| 20  | --lock                         | run, bundle, cache, test                                                   | 检查指定的锁文件                                                          |
| 21  | --lock-write                   | run, bundle, cache, test                                                   | 写入锁文件，和 --lock 一起使用                                               |
| 22  | --no-check                     | run, cache, info, test                                                     | 禁用 TypeScript 的类型检查，这会大大减少程序的启动时间                                 |
| 23  | --no-remote                    | run, cache, test                                                           | 不解析远程模块                                                           |
| 24  | --seed                         | run, test                                                                  | Math.random() 种子                                                  |
| 25  | --importmap                    | run, install, bundle, test                                                 | 不稳定：读取 import map 文件                                              |
| 26  | --json                         | doc, info                                                                  | 以 JSON 格式输出文档                                                     |

### 14 个内置工具包

介绍了 14 个内置工具

| 序号  | 名称     | 命令               | 功能                                  |
| --- | ------ | ---------------- | ----------------------------------- |
| 01  | 运行器    | deno run         | 运行指定文件名或 URL 程序。 使用“-”作为文件名从标准输入中读取 |
| 02  | 脚本安装器  | deno install     | 将脚本安装为可执行文件                         |
| 03  | 打包器    | deno bundle      | 将模块和依赖项打包到单个文件中                     |
| 04  | 缓存器    | deno cache       | 缓存依赖                                |
| 05  | 文档生成器  | deno doc         | 显示某模块的文档                            |
| 06  | 执行器    | deno eval        | 执行一段脚本                              |
| 07  | 格式化器   | deno fmt         | 格式化源文件                              |
| 08  | 依赖检查器  | deno info        | 显示有关缓存的信息或与源文件相关的信息                 |
| 09  | 规范器    | deno lint        | 规范化源文件                              |
| 10  | 测试器    | deno test        | 执行测试                                |
| 11  | 类型器    | deno types       | 打印运行时 TypeScript 声明                 |
| 12  | 补全器    | deno completions | 生成 Shell 补全信息                       |
| 13  | 升级器    | deno upgrade     | 将 Deno 可执行文件升级到给定版本                 |
| 14  | REPL 器 | deo repl         | 读取/执行/打印/循环                         |

### 6 个基本环境变量

 6 个环境变量：

| 序号  | 变量名               | 用途                  | 备注                   |
| --- | ----------------- | ------------------- | -------------------- |
| 01  | DENO_DIR          | 设置缓存目录              |                      |
| 02  | DENO_INSTALL_ROOT | 设置 Deno 安装的软件包输入目录  | 默认为 $HOME/.deno/bin  |
| 03  | NO_COLOR          | 设置禁止使用颜色            |                      |
| 04  | DENO_CERT         | 从 PEM 编码的文件加载证书颁发机构 |                      |
| 05  | HTTP_PROXY        | HTTP 请求的代理地址        | 模块 downloads 和 fetch |
| 06  | HTTPS_PROXY       | HTTPS 请求的代理地址       | 模块 downloads 和 fetch |

### 配置文件deno.json

Deno 支持一个配置文件，允许您自定义内置的 TypeScript 编译器、格式化程序和 linter。

配置文件支持 `.json` 和 `.jsonc` 扩展。 从 v1.18 开始，Deno 将自动检测 `deno.json` 或 `deno.jsonc` 配置文件，如果它位于您当前的工作目录或父目录中。

```json
{
  "compilerOptions": { // tsconfig配置
    "allowJs": true,
    "lib": ["deno.window"],
    "strict": true
  },
  "lint": { // deno lint 代码风格校验
    "include": ["src/"],
    "exclude": ["src/testdata/", "data/fixtures/**/*.ts"],
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"],
      "exclude": ["no-unused-vars"]
    }
  },
  "fmt": { // deno fmt 代码格式化
    "useTabs": true,
    "lineWidth": 80,
    "indentWidth": 4,
    "semiColons": false,
    "singleQuote": true,
    "proseWrap": "preserve",
    "include": ["src/"],
    "exclude": ["src/testdata/", "data/fixtures/**/*.ts"]
  },
  // 用于为锁文件指定不同的文件名。默认情况下，deno 将使用 deno.lock 并将其放在配置文件旁边。
  "lock": false,
  "nodeModulesDir": true, // 用于在使用 npm 包时启用或禁用 node_modules 目录
  "test": {
    "include": ["src/"],
    "exclude": ["src/testdata/", "data/fixtures/**/*.ts"]
  },
  "tasks": {
    "start": "deno run --allow-read main.ts"
  },
  "imports": {
    "oak": "https://deno.land/x/oak@v12.4.0/mod.ts"
  }
}
```

#### imports 和 scopes

让 Deno 解析像 `"react"` 或 `"lodash"` 这样的裸说明符，需要告诉它在哪里寻找它。 `"lodash"` 是指 npm 模块还是映射到 https URL？

```js
import lodash from "lodash";
```

在nodejs中，节点和 npm 使用 `package.json` 和 `node_modules` 文件夹来执行此解析。另一方面，Deno使用导入映射标准。

若要使上述 `import lodash from "lodash"` 正常工作，请将以下内容添加到 `deno.json` 配置文件。

```json
{
  "imports": {
    "lodash": "https://esm.sh/lodash@4.17.21"
  }
}
```

`deno.json` 文件是自动发现的，并（除其他外）充当导入映射。

适用于 npm 说明符。加载本地npm包

```json
{
  "imports": {
    "lodash": "npm:lodash@^4.17"
  }
}
```

示例 - 通过 `fmt/` 使用 deno_std 的 fmt 模块
