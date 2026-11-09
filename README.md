# PodPlo DSH 插件 alpha.59

需要先安装 DeepSeek Harness 0.2.2-rc.1。这是插件，不是独立 App。

## 安装与升级

新用户在 DSH 的「插件 → 添加插件」输入：

```text
https://github.com/jacksia0409/podplo-dsh-plugin
```

已安装旧版的用户，添加本版完整地址升级：

```text
https://github.com/jacksia0409/podplo-dsh-plugin#dsh-plugin-v0.1.0-alpha.59.stream-processing
```

同一 GitHub 地址重复安装可能触发 DSH 的 ambiguous-install；升级请使用上方带版本标签的地址。

也可从 [本版 Release](https://github.com/jacksia0409/podplo-dsh-plugin/releases/tag/dsh-plugin-v0.1.0-alpha.59.stream-processing) 下载 macOS ZIP 或通用 TGZ。macOS ZIP 内有安装命令；使用 CLI 安装前请正常退出 DSH。TGZ 可用于 Windows/macOS 的原生插件管理器。Windows 尚未进行实机验收。

## 本版变化

- 每张云端结果就绪后自动下载；已登记的描边步骤检查真实透明像素后生成描边和镜像。
- 自动加工队列跨任务最多并发 2 个作业，不逐张调用 Flash。
- 保留整批积分报价和原生确认。重复刷新、重启复用已完成收据；加工失败不自动收费重生成。
- 兼容停止与继续处理；最终对话通知和 IM 等待包含下载、加工及文件保存状态。
- 延续整批 Skill 准备、按需查询和中性范围选择。

聚合打包和其他尚未自动支持的工具沿用原继续处理流程。透明背景参数不保证供应商一定返回透明像素；检查失败会明确报告。

## 验证与分发

106 项本地回归通过；最终修正后的 11 项相关检查通过。七图隔离流程验证首张先加工、最终 7 张原图和 14 张加工图；后台成果页和原生 DSH 包内检查通过。没有将此隔离测试宣称为真实付费供应商或 Windows 实机验收。

仓库仅分发预编译运行文件、安装声明和说明，不上传开发源码、用户配置或凭据。TGZ SHA-256：

```text
982a7b83db87437e70c106399e19b2fb4cba1e84da0fee113e13d137fdd78bf2
```
