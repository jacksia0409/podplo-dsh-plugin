# PodPlo DSH 插件 alpha.76

需要 DeepSeek Harness 0.2.2-rc.1。这是插件，需要先安装 DSH。

## 本版更新

基于 alpha.75，图像工具箱保存时只输出最终成品图或选择的 PDF，不再额外保存出血校样图和印前 JSON 报告。校样仍可在界面预览，原图和已有历史成果保留；需要复核的图片及原因说明仍单独放入“待复核”。

保留“输出设置”中的左右／上下镜像拼接：左右为左原图＋右水平镜像，上下为上原图＋下垂直镜像，分别宽度或高度翻倍，DPI 保留。每张输入独立处理，预览和保存使用拼接后的成品；额外镜像默认关闭，可按需另存最终成品的水平镜像。

工具箱无需先创建聊天，按旋转翻转、调色、描边、裁剪透明图杂边、尺寸、出血、输出设置的顺序处理。支持尺寸比例锁、毫米出血、透明留边和 PNG／JPEG／WebP／PDF。PNG／WebP 支持透明，JPEG 按透明区底色合成。既有登录、账号隔离、任务成果、生成报价和审批规则保留。

## 安装与升级

新用户在 DSH「插件 → 添加插件」输入：

```text
https://github.com/jacksia0409/podplo-dsh-plugin
```

已有用户可在相同入口使用本版完整标签地址升级：

```text
https://github.com/jacksia0409/podplo-dsh-plugin#dsh-plugin-v0.1.0-alpha.76.final-only
```

同一 GitHub 地址重复安装可能触发 DSH 的 ambiguous-install，已有用户请使用带版本标签的升级地址。也可在 PodPlo 顶部手动检查更新；任务运行时不更新，不自动降级，不强制重启。

[本版 Release](https://github.com/jacksia0409/podplo-dsh-plugin/releases/tag/dsh-plugin-v0.1.0-alpha.76.final-only) 提供 macOS ZIP 和通用 TGZ。macOS ZIP 内含安装命令；通过 CLI 安装前请正常退出 DSH，正在使用时可通过官方插件管理器导入 TGZ。Windows 尚未实机验收。

## 分发与校验

仓库仅分发预编译运行文件、插件安装声明和说明，不上传开发源码、登录数据或凭据。校验值和本版验证范围见 Release 附件中的 SHA256SUMS.txt、package-audit.json 和 ACCEPTANCE.md。
