const fs = require('fs-extra');
const path = require('path');

async function build() {
    try {
        // 清理dist目录
        await fs.emptyDir('./dist');
        
        // 复制public目录到dist
        await fs.copy('./public', './dist');
        
        // 创建一个简单的生产环境服务器文件
        const serverContent = `
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(\`服务器运行在端口 \${port}\`);
});
`;
        
        await fs.writeFile('./dist/server.js', serverContent);
        
        // 创建生产环境的package.json
        const prodPackageJson = {
            "name": "static-node-app",
            "version": "1.0.0",
            "main": "server.js",
            "scripts": {
                "start": "node server.js"
            },
            "dependencies": {
                "express": "^4.18.2"
            }
        };
        
        await fs.writeFile(
            './dist/package.json', 
            JSON.stringify(prodPackageJson, null, 2)
        );
        
        console.log('构建完成！文件已生成在 dist 目录中');
    } catch (err) {
        console.error('构建过程出错:', err);
    }
}

build(); 