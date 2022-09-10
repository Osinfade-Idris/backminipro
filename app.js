


const http = require('http');
const {readFileSync} = require('fs');
const os = require('os')
//get pages

const homePage = readFileSync('./tagebuch/index.html');
const style = readFileSync('./tagebuch/static/style.css');
const script = readFileSync('./tagebuch/static/script.js');

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

//now use express

const express = require('express');
const app = express();

/**
 * app.get
 * app.use .... set up static and middleware
 * app.post
 * app.all .... 
 * app.delete
 * app.put
 * 
 * //setting the status is not really necessary
 */

const useExpress = () =>{
    app.get('/', (req,res)=>{
        //inserting homepage variable straight here will only
        //make it a downloadable file
        res.status(200).send('homePage')
    })
    app.get('/about', (req,res)=>{
        res.status(200).send('About page')
    })

    app.all('*', (req,res)=>{
        res.status(404).send('resource not found')
    })
    

    app.listen(5000, ()=>{
        console.log('server is listening on port 5000')
    })
}

const useExpressReadFile = () =>{
    //send all the css and js file through express static and use method
    //you can as well add index.html here in the public too
    app.use(express.static('./tagebuch/static'))

    const path = require('path');


    app.get('/', (req,res)=>{
        res.status(200).sendFile(path.resolve(__dirname, './tagebuch/index.html'))
    })

    app.get('/dashboard.html', (req,res)=>{
        res.status(200).sendFile(path.resolve(__dirname, './tagebuch/dashboard.html'))
    })


    app.all('*', (req,res)=>{
        res.status(404).send('resource not found')
    })
    app.listen(5000, ()=>{
        console.log('server is listening on port 5000')
    })
}

useExpressReadFile()