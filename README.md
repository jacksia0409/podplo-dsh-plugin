# PodPlo 原生 DSH 插件

在 DeepSeek Harness 内使用 PodPlo 的生图、工具箱、图库、Skill 库和我的素材。
本仓库专门分发 DSH 插件安装包；独立桌面 App 由 [podplo-app](https://github.com/jacksia0409/podplo-app) 分开管理。

## 下载安装

当前内测版本：`0.1.0-alpha.45.sanitized`，是 alpha.42 插件系列的后续版本。
需要先安装并正常打开一次 DeepSeek Harness **0.2.2-rc.1**，随后完全退出 DSH 再安装插件。

- **macOS**：[下载安装 ZIP](https://github.com/jacksia0409/podplo-dsh-plugin/releases/download/dsh-plugin-v0.1.0-alpha.45.sanitized/PodPlo-DSH-plugin-0.1.0-alpha.45.sanitized-mac.zip)，解压后双击「安装到原生DSH.command」。
- **Windows / 通用 CLI**：[下载插件 TGZ](https://github.com/jacksia0409/podplo-dsh-plugin/releases/download/dsh-plugin-v0.1.0-alpha.45.sanitized/podplo-dsh-plugin-0.1.0-alpha.45.sanitized.tgz)，在 DSH 官方 CLI 可用的终端中安装。Windows 不使用 `.command` 脚本，也不需要独立 PodPlo App 的 EXE。

```sh
dsh plugin --profile desktop add "插件TGZ文件的绝对路径"
```

安装后重新打开 DSH，按提示加载插件，从 PodPlo 页面登录自己的账号。
Windows 已有平台代码适配，尚未完成 Windows 实机安装与运行验收。

完整 [安装说明](https://github.com/jacksia0409/podplo-dsh-plugin/releases/download/dsh-plugin-v0.1.0-alpha.45.sanitized/INSTALL.md)、[验收说明](https://github.com/jacksia0409/podplo-dsh-plugin/releases/download/dsh-plugin-v0.1.0-alpha.45.sanitized/ACCEPTANCE.md) 和校验文件见 [Release](https://github.com/jacksia0409/podplo-dsh-plugin/releases/tag/dsh-plugin-v0.1.0-alpha.45.sanitized)。
下载完整附件后可使用 `SHA256SUMS.txt` 校验文件。Mac 后台原生安装和界面验收、130 项自动测试已通过；真实付费生图和 IM 平台绑定不属于本轮验收范围。

本仓库仅发布安装产物，不上传插件源码、账号配置或凭据。
GitHub 自动生成的 Source code 压缩包只有本仓库的说明文件，不是插件安装包。
