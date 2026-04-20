# BPS 漏斗页设计

日期：2026-04-20

## 目标

在 `brain.seekorigin.ai` 增加一个 BPS 原生的转化漏斗页，承接首页与 quick-links 中现有的“转化漏斗”入口，不再让总控台的漏斗入口只指向 `musicmake.ai/admin/site-conversion`。

## 设计

- 新增静态页面 `funnels/`，与现有 `journeys/` 同级。
- 页面支持站点切换，首版至少包含：
  - `SongUnique`：展示最近 7 天的主链路漏斗、逐步转化率、辅助诊断指标、数据口径说明。
  - `MusicMake`：先提供目录级占位与外链，作为后续扩展入口。
- 首页“分析 -> 转化漏斗”入口改为指向 `/funnels/`。
- quick-links 中“分析入口 / 收入入口”的站点转化相关链接改为优先指向 `/funnels/`。
- `journeys/` 中 `SongUnique` 与 `MusicMake` 的 investigation links 增加 “转化漏斗” 入口，形成“路径 ↔ 漏斗”的互跳。

## 数据策略

- 首版使用静态快照数据，直接把已经验证过的 SongUnique 最近 7 天顺序漏斗结果写入页面数据文件。
- 页面明确标注口径：`最近 7 天 / Umami / session 去重 / 顺序漏斗`。
- 不在首版引入实时 API，避免把 BPS 从静态入口页变成后端耦合页面。

## 信息架构

- 页面顶部：目标、口径、站点数量。
- 左栏：站点列表。
- 主区：
  - 核心漏斗
  - 逐步转化率卡片
  - 辅助诊断指标
  - 关键判断
  - 相关入口（Journeys / Umami / Clarity / 后台）

## 风险

- SongUnique 当前为静态快照，不是实时数。
- MusicMake 暂时不是原生漏斗，只提供目录入口。
- 若未来站点数增加，需要把静态数据抽离成独立 data 文件并规范更新流程。
