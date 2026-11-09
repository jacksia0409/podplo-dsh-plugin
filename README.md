# PodPlo DSH 插件 alpha.60

需要 DeepSeek Harness 0.2.2-rc.1。这是插件，不是独立 App。

## 本版新增

PodPlo 页面顶部显示当前版本号、**检查更新**和**更新版本**按钮。没有可用新版时更新按钮置灰；由用户手动检查，包含公开 alpha 内测版。

更新通过 DSH 官方插件管理器，只使用本仓库的公开版本。GitHub API 不可用时尝试公开发布源；失败会明确提示。任务运行时不更新，不降级，不自动重启。保留 alpha.59 的逐张下载、透明检查、描边和镜像，并发最多 2 个自动加工作业；整批积分确认保持原流程。

## 安装与升级

新用户在 DSH「插件 → 添加插件」输入：

```text
https://github.com/jacksia0409/podplo-dsh-plugin
```

alpha.59 及更早版本需要先在同一入口输入本版完整地址升级一次：

```text
https://github.com/jacksia0409/podplo-dsh-plugin#dsh-plugin-v0.1.0-alpha.60.plugin-update
```

此后可在 PodPlo 页面顶部检查、更新后续版本。同一 GitHub 地址重复安装可能触发 DSH 的 ambiguous-install，已有用户请使用带版本标签的升级地址。

也可从 [本版 Release](https://github.com/jacksia0409/podplo-dsh-plugin/releases/tag/dsh-plugin-v0.1.0-alpha.60.plugin-update) 下载 macOS ZIP 或通用 TGZ。macOS ZIP 内提供安装命令，CLI 安装前请正常退出 DSH；通用 TGZ 可用于原生插件管理器。Windows 尚未实机验收。

## 验证与分发

类型检查、116 项本地回归、隐藏窗口界面与原生 DSH 包内检查通过。检查覆盖版本显示、按钮、更新目标绑定、防重复、忙碌拦截、失败与重启提示、无新版和禁止降级。真实公开源做过只读检查；未为验证发布虚构的未来版本，也未声称下一版自更新已经全链路验收。

仓库只含预编译运行文件、安装声明和说明，不上传开发源码、用户配置或凭据。TGZ 与本机验收和安装包相同；包内说明保留构建阶段记录，当前发布状态以本页为准。

TGZ SHA-256：

```text
ea03daf28bd605fd419420cb7b3da624a5b790f2a6c8130ecd283403b5e3bb12
```
