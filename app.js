


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
//useExpressReadFile()

//API response

const expressInteractionMitApi = () =>{
    const {users} = require('./tagebuch/static/users.js')

   
    app.get('/', (req,res)=>{
        //just pass in your json file here... So here, I'll read one of the arrays I have and send
        //instead of reading, i should just require it as module.
        //const obj = readFileSync('./tagebuch/static/regist.js', 'utf8')
       // const {users} = require('./tagebuch/static/users.js')
        res.json(users);

    })

    //using route and params

    app.get('/:user', (req,res)=>{
        const {user} = req.params; //this is the route and params. having :user in the link is the route
        if(user in users){
            const specuser = users[user];
            res.send(specuser)
        } else{
            res.status(404).send('user does not exist')
        }
        
    })
    app.get("/:user/:details",(req,res)=>{
        const {user,details} = req.params;
        if(user in users){
            if((details in users[user])){
                res.status(200).send(`we have it: ${users[user][details]}`)
            } else{
                res.status(404).send('requested info not here')
            }
        } else{
            res.status(404).send('user does not exist')
        }
    })
    //query string parameter aka URI parameters


    app.listen(port, ()=>{
        console.log( `server is listening on port: ${port}`)
    })
}

//expressInteractionMitApi();

//working with query string

const serverWithQuery = ()=>{
    const express = require('express');
    const app = express();
    const {usersarray} = require('./tagebuch/static/users.js')
    let newUsers = [...usersarray];

    app.get("/",(req,res)=>{
        res.send(newUsers)
    })
    app.get('/q', (req,res)=>{
        const {name,limit,id} = req.query;
        if(name){
            newUsers = newUsers.filter((user=>{
                return user.username.startsWith(name);
            }))
        }
        if(limit){
            //number here is used to convert string to number
            newUsers = newUsers.slice(0,Number(limit))
        }
        if(id){
            newUsers = newUsers.filter((user)=>{
                return user.id === Number(id);
            })
        }
        //if user is not in database
        if(newUsers.length<1){
          return  res.status(200).json({
                response: "success",
                data: "not found in database"
            })
        }
        res.status(200).send(newUsers);
        
    })


    app.listen(port,()=>{
        console.log(`server listening on port:  ${port}`)
    })
}
serverWithQuery()