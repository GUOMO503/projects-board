# 项目说明

## 工作目录
所有文件操作必须限定在 `D:\GUOMO\WORK\都灵建筑\Claude\Construction Stage Board` 内。未经用户明确指示，不得在此目录之外创建、修改或删除任何文件。

## 项目概述
加拿大木结构住宅施工阶段看板。纯静态前端（HTML/CSS/JS），托管于 GitHub Pages，数据存储在 Firebase Realtime Database。

- **线上地址**：https://guomo503.github.io/projects-board/
- **GitHub 仓库**：https://github.com/GUOMO503/projects-board
- **Firebase**：https://projects-board-28ac0-default-rtdb.firebaseio.com

## 技术栈
- 纯原生 HTML / CSS / JavaScript，无框架，无构建工具
- Firebase Realtime Database REST API（GET/PUT `/board.json`）
- 前端 4 秒轮询实现多人实时同步

## 文件说明
- `index.html` — 页面结构
- `styles.css` — 样式
- `app.js` — 前端全部逻辑
- `server.js` — 本地运行用的极简 Node 服务器（GitHub Pages 不使用）
- `board-data.json` — 本地运行时的数据文件（GitHub Pages 不使用）
- `compress-data.html` — 本地工具：压缩历史导出数据中的照片

## 操作约定
- 修改代码后必须 commit 并 push 到 GitHub，GitHub Pages 才会更新
- commit 前不需要询问用户确认，直接 push
- 不引入任何第三方依赖（npm 包等）
