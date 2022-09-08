


const http = require('http');
const {readFileSync} = require('fs');
const os = require('os')
//get pages

const homePage = readFileSync('./tagebuch/index.html');
const style = readFileSync('./tagebuch/style.css');
const script = readFileSync('./tagebuch/script.js');

danfo.rea
//https port is 443
const port = 5000;
const serverLaunch = () =>{
    const server = http.createServer((req,res)=>{

        const url = req.url;
    
        if(url === '/'){
            res.writeHead(
                200,{
                    'content-type': 'text/html',
                }
            );
            res.write(homePage);
            console.log(os.userInfo().username)
            console.log(os.networkInterfaces().en0[1].address)

    
        } else if(url === '/style.css'){
            res.writeHead(
                200,{
                    'content-type': 'text/css',
                    
                }
            );
            res.write(style);
        } else if(url === '/script.js'){
            res.writeHead(
                200,{
                    'content-type': 'text/javascript',
                    
                }
            );
            res.write(script);
        } 
        
        else {
            res.writeHead(
                404,{
                    'content-type': 'text/html'
                    
                }
            );
            res.write("<p>page not found <a href='/'>go home</a><p/>");
    
        }
        console.log(req.url)
        res.end();
    })
    
    server.listen(port,()=>{
        console.log(`listen on port ${port}`)

    })
}

serverLaunch();

