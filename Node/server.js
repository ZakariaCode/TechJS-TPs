import { createServer } from 'node:http';
import * as fs from 'node:fs';

const server = createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"})
    if(req.url === '/about'){
        fs.createReadStream('./about.html').pipe(res)
    }
    else if(req.url === '/home'){
        fs.createReadStream('./home.html').pipe(res)
    }
     else {
        fs.createReadStream('./error.html').pipe(res)
    }
})

server.listen(3000)