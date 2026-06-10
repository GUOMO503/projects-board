// 极简静态文件 + 数据 API 服务器，无任何第三方依赖（仅用 Node 内置模块）
// 用法: node server.js  然后局域网/公网访问 http://<本机IP>:5173
//
// 所有人打开同一个地址，就是同一份看板数据：
//   GET  /api/data  -> 读取 board-data.json
//   POST /api/data  -> 用请求体覆盖 board-data.json
// 前端每隔几秒轮询一次 /api/data，实现"多人打开看到同一份数据"。

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5173;
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, 'board-data.json');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '{}');
}

function send(res, status, body, type) {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/data') {
    if (req.method === 'GET') {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      send(res, 200, content, 'application/json; charset=utf-8');
      return;
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
        if (body.length > 80 * 1024 * 1024) req.destroy(); // 80MB 上限，防止误传过大文件
      });
      req.on('end', () => {
        try {
          JSON.parse(body); // 校验 JSON 格式
          fs.writeFileSync(DATA_FILE, body);
          send(res, 200, '{"ok":true}', 'application/json');
        } catch {
          send(res, 400, '{"error":"invalid json"}', 'application/json');
        }
      });
      return;
    }
    send(res, 405, '{"error":"method not allowed"}', 'application/json');
    return;
  }

  // 静态文件
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
  if (!filePath.startsWith(ROOT)) {
    send(res, 403, 'Forbidden', 'text/plain');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      send(res, 404, 'Not found', 'text/plain');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`看板已启动: http://localhost:${PORT}`);
});
