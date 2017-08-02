const http = require('http');

const server = http.createServer();

server.on('request', (request, response) => {
    const {method, url} = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err.stack);
    })
    .on('data', (chunk) => {
        body.push(chunk);
    })
    .on('end', () => {
        body = Buffer.concat(body).toString();

        response.on('error', (err) => {
            console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');

        const responseBody = {headers, method, url, body};

        response.write(JSON.stringify(responseBody));
        response.end();
    })
}).listen(8080);
