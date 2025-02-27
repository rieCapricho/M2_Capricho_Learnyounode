const http = require('http');
const { URL } = require('url');

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost`);
    const isoTime = url.searchParams.get('iso');
    
    if (!isoTime) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing iso query parameter' }));
        return;
    }

    const date = new Date(isoTime);
    let result;

    if (url.pathname === '/api/parsetime') {
        result = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };
    } else if (url.pathname === '/api/unixtime') {
        result = {
            unixtime: date.getTime()
        };
    } else {
        res.writeHead(404);
        res.end();
        return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
});

server.listen(Number(process.argv[2]));
