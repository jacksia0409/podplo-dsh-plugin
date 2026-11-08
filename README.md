# PodPlo 原生 DSH 插件 0.1.0-alpha.47.batch-local

适配 DeepSeek Harness 0.2.2-rc.1。需要先安装原生 DSH。

## 本版修复

- “全部执行”先收齐完整图片数量与报价，汇总总积分后一次确认整批。
- 创建／编辑我的 Skill 支持从本地选择图片；描边可单独从本地选择图案，并保留源图。当前会话图片也可用于 Agent 的 Skill、工具和设计参考。

## 首次安装

在 DSH 插件管理器中使用本仓库地址：

https://github.com/jacksia0409/podplo-dsh-plugin

## 已安装用户升级到 alpha.47

在插件管理器中粘贴下面带版本标签的完整地址：

https://github.com/jacksia0409/podplo-dsh-plugin#dsh-plugin-v0.1.0-alpha.47.batch-local

不要用完全不变的旧仓库地址重复安装：DSH 0.2.2-rc.1 可能报“无法从依赖变更中确定安装了哪一个包”。带版本标签的地址已在隔离原生 DSH 中验证安装成功，无需先卸载插件。GitHub 来源不走 npm 版本检查更新。
安装后确认版本为 `0.1.0-alpha.47.batch-local`，按 DSH 提示加载或重启，再在新对话中选择 PodPlo Agent。

也可从 [本版安装附件](https://github.com/jacksia0409/podplo-dsh-plugin/releases/tag/dsh-plugin-v0.1.0-alpha.47.batch-local) 下载 macOS ZIP 或通用 TGZ。macOS ZIP 解压后使用安装器；Windows 使用 DSH 官方 CLI 安装通用 TGZ，`.command` 仅用于 macOS。CLI 示例（先退出 DSH，并替换为实际文件路径）：

```sh
dsh plugin --profile desktop add /absolute/path/podplo-dsh-plugin-0.1.0-alpha.47.batch-local.tgz
```

本仓库只分发安装清单、预编译运行文件和安装包，不上传 TS／TSX 开发源码、登录数据或凭据。
实际账号、订阅、Skill 权限和积分由主站核验，付费生成仍需本人确认。
Windows 实机尚未验收；本轮未使用真实账号、模型或付费生图。
