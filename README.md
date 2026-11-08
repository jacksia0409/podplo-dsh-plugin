# PodPlo 原生 DSH 插件 0.1.0-alpha.50.ui-local

适配 DeepSeek Harness 0.2.2-rc.1，需要先安装原生 DSH。

## 安装与升级

首次安装可在 DSH 插件管理器粘贴：

https://github.com/jacksia0409/podplo-dsh-plugin

**已有 GitHub 来源安装，请使用本版完整地址升级：**

https://github.com/jacksia0409/podplo-dsh-plugin#dsh-plugin-v0.1.0-alpha.50.ui-local

不要重复提交完全不变的旧安装地址；DSH 0.2.2-rc.1 可能返回 ambiguous-install。使用上方带本版标签的地址，无需卸载或清空登录数据。GitHub 来源不走 npm 版本检查更新；安装后按 DSH 提示加载或重启。

也可在 [本版 Release](https://github.com/jacksia0409/podplo-dsh-plugin/releases/tag/dsh-plugin-v0.1.0-alpha.50.ui-local) 下载附件：

- macOS：解压 Mac ZIP，完全退出 DSH 后双击安装器。
- Windows 或通用 CLI：使用 TGZ，完全退出 DSH 后在文件所在目录执行：

```sh
dsh plugin --profile desktop add ./podplo-dsh-plugin-0.1.0-alpha.50.ui-local.tgz
```

macOS 的 `.command` 安装器不适用于 Windows；Windows 实机尚未验收。

## 本版更新

- 收藏／上传／任务成果与公开／我的 Skill 使用小号胶囊，搜索、分类与操作整组靠右。
- 上传页只保留加号入口，去掉冗余说明；侧栏移除生图，资源页保留悬浮生图框。
- Skill／图库详情按 Web 主内容结构展示，结果图和参考图分开，图片支持放大，详情不再显示库分组切换。
- 我的 Skill 保留本地上传与已上传图片点选；拒绝或取消报价后停止后续步骤。整批确认、图片接入、任务成果及 IM 功能保留。

本仓库分发安装清单、预编译运行文件和安装包，不上传 TS／TSX 开发源码、登录资料或凭据。账号、订阅、素材归属和积分由主站核验。

版本名中的 ui-local 及包内候选字样是本机构建时标识；当前发布状态以本 Release 为准。通用 TGZ 与已安装验收版本字节一致。
