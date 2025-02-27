const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const stream = fs.createReadStream(process.argv[3]);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    stream.pipe(res);
});

server.listen(Number(process.argv[2]));
