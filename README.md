# PodPlo 原生 DSH 插件 0.1.0-alpha.47.batch-local

适配 DeepSeek Harness 0.2.2-rc.1。需要先安装原生 DSH。

## 本版修复

- “全部执行”先收齐完整图片数量与报价，汇总总积分后一次确认整批。
- 创建／编辑我的 Skill 支持从本地选择图片；描边可单独从本地选择图案，并保留源图。当前会话图片也可用于 Agent 的 Skill、工具和设计参考。

## 安装或更新

在 DSH 插件管理器中使用本仓库地址：

https://github.com/jacksia0409/podplo-dsh-plugin

已有 GitHub 来源安装，请在插件管理器再次填写同一仓库地址进行安装／覆盖升级，确认版本为 `0.1.0-alpha.47.batch-local`；此来源不走 npm 版本检查更新。安装后按 DSH 提示加载或重启，再在新对话中选择 PodPlo Agent。

也可从 [本版安装附件](https://github.com/jacksia0409/podplo-dsh-plugin/releases/tag/dsh-plugin-v0.1.0-alpha.47.batch-local) 下载 macOS ZIP 或通用 TGZ。macOS ZIP 解压后使用安装器；Windows 使用 DSH 官方 CLI 安装通用 TGZ，`.command` 仅用于 macOS。CLI 示例（先退出 DSH，并替换为实际文件路径）：

```sh
dsh plugin --profile desktop add /absolute/path/podplo-dsh-plugin-0.1.0-alpha.47.batch-local.tgz
```

本仓库只分发安装清单、预编译运行文件和安装包，不上传 TS／TSX 开发源码、登录数据或凭据。
实际账号、订阅、Skill 权限和积分由主站核验，付费生成仍需本人确认。
Windows 实机尚未验收；本轮未使用真实账号、模型或付费生图。
