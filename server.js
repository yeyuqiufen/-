const express = require('express');
const path = require('path');
const app = express();

// 从命令行参数获取端口，默认为3000
const port = process.argv.includes('--port') 
    ? parseInt(process.argv[process.argv.indexOf('--port') + 1]) 
    : 3000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 基础路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 