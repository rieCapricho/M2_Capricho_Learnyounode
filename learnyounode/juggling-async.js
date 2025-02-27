const http = require('http');

const urls = process.argv.slice(2);
const results = [];
let count = 0;

function fetchData(index) {
    http.get(urls[index], response => {
        let data = '';

        response.setEncoding('utf8');
        response.on('data', chunk => data += chunk);
        response.on('end', () => {
            results[index] = data;
            count++;

            if (count === urls.length) {
                results.forEach(result => console.log(result));
            }
        });
        response.on('error', console.error);
    });
}

for (let i = 0; i < urls.length; i++) {
    fetchData(i);
}
