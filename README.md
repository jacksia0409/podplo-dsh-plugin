# PodPlo 原生 DSH 插件

在 DeepSeek Harness 内使用 PodPlo 的生图、工具箱、图库、Skill 库和我的素材。
本仓库专门分发 DSH 插件；能独立启动的桌面 App 在 [podplo-app](https://github.com/jacksia0409/podplo-app) 单独管理。

## 通过仓库链接安装（推荐）

先安装并正常打开一次 **DeepSeek Harness 0.2.2-rc.1**。
在 DSH 的插件安装入口粘贴这个完整地址，按原生提示安装并加载：

```text
https://github.com/jacksia0409/podplo-dsh-plugin
```

仓库根目录已声明 `dsh.bundle`，并包含插件所需的预编译运行文件。无需自行构建。
插件加载后，从 PodPlo 页面登录自己的账号。

## 下载本地安装包

当前内测版本：`0.1.0-alpha.45.sanitized`，为 alpha.42 插件系列的后续版本。
本地 CLI 安装前请完全退出 DSH。

- **macOS**：[下载安装 ZIP](https://github.com/jacksia0409/podplo-dsh-plugin/releases/download/dsh-plugin-v0.1.0-alpha.45.sanitized/PodPlo-DSH-plugin-0.1.0-alpha.45.sanitized-mac.zip)，解压后双击「安装到原生DSH.command」。
- **Windows / 通用 CLI**：[下载插件 TGZ](https://github.com/jacksia0409/podplo-dsh-plugin/releases/download/dsh-plugin-v0.1.0-alpha.45.sanitized/podplo-dsh-plugin-0.1.0-alpha.45.sanitized.tgz)，在 DSH 官方 CLI 可用的终端中执行：

```sh
dsh plugin --profile desktop add "插件TGZ文件的绝对路径"
```

重新打开 DSH，按提示加载插件。Windows 不运行 Mac 的 `.command`，也不需要安装独立 PodPlo App 的 EXE。
Windows 已有平台代码适配，尚未完成 Windows 实机验收。

安装说明、验收说明和 SHA256SUMS 见 [Release 附件](https://github.com/jacksia0409/podplo-dsh-plugin/releases/tag/dsh-plugin-v0.1.0-alpha.45.sanitized)。
Mac 后台原生安装和界面验收、130 项自动测试已通过；真实付费生图和 IM 平台绑定不属于本轮验收范围。

本仓库只包含安装声明、预编译运行文件和说明，不上传开发源码、账号配置或凭据。
GitHub 自动生成的 Source code 压缩包是本分发仓库的快照；Release TGZ 是已验收的本地安装包。
