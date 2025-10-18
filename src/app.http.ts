import fs from 'fs';
import http from 'http';

const server = http.createServer((req, res) => {
    // res.write('Hello World\n');

    //SSR
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write(`<h1>Hello ${req.url}</h1>`);
    // res.end();

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }
    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });

    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }

    const jsFile = fs.readFileSync(`./public${req.url}`, 'utf8');
    res.end(jsFile);
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});