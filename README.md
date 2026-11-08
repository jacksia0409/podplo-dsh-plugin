# PodPlo 原生 DSH 插件 0.1.0-alpha.51.flash-efficiency

需要先安装 DeepSeek Harness 0.2.2-rc.1；此插件不是独立桌面 App。

## 安装与升级

首次安装，在 DSH 插件管理器粘贴：

https://github.com/jacksia0409/podplo-dsh-plugin

**已安装用户请使用本版完整地址升级：**

https://github.com/jacksia0409/podplo-dsh-plugin#dsh-plugin-v0.1.0-alpha.51.flash-efficiency

DSH 0.2.2-rc.1 重复安装完全不变的 GitHub 地址可能出现 ambiguous-install。使用上方版本标签地址即可升级，无需先卸载或清空登录数据。GitHub 来源不走 npm 版本检查；安装后按 DSH 提示加载或重启。

也可到[本版 Release](https://github.com/jacksia0409/podplo-dsh-plugin/releases/tag/dsh-plugin-v0.1.0-alpha.51.flash-efficiency)下载安装包：

- macOS：解压 Mac ZIP，正常退出 DSH 后双击安装器。
- Windows／通用 CLI：正常退出 DSH 后，在 TGZ 所在目录执行：

```sh
dsh plugin --profile desktop add ./podplo-dsh-plugin-0.1.0-alpha.51.flash-efficiency.tgz
```

macOS 的 `.command` 安装器不适用于 Windows；Windows 实机尚未验收。

## 本版更新

- 模型检索 Skill 时先获得精简候选，选中后仍可读取完整详情；界面完整图文目录保持。
- 选定 Skill 或 Skill 族后，可一次读取执行绑定、账号安全摘要及生成参数，减少分开的信息查询。
- 保留完整 Skill 族成员、图片选择与上传、整批报价、原生确认／拒绝停止、图像加工、任务成果和 IM 功能。

受控测试中，目录工具返回字符量减少约 68%；这不代表整体 Token 或账单下降 68%，实际效果取决于任务和模型调用方式。

本仓库仅分发安装清单、预编译运行文件与安装包，不上传 TS／TSX 开发源码、登录资料或凭据。

本版 TGZ 与已验收、本机安装的产物字节一致。包内“未公开发布”等文字是构建时状态，当前分发状态以本 Release 为准。
