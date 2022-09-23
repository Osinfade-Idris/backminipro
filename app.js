


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
    const {usersarray,users} = require('./tagebuch/static/users.js')
    let newUsers = [...usersarray];

    app.get("/",(req,res)=>{
        res.send(newUsers)
    })
    app.get('/q', (req,res)=>{
        //this will always be .query, and not .whatever your link is
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
    //add the route param here
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
    app.get("/q/:details",(req,res)=>{
        const{name,limit,id} = req.query;
        const {details} =req.params;

        if(name){
            newUsers = newUsers.filter((user)=>{
                return user.username.startsWith(name);
            })
        }
        if(limit){
            newUsers = newUsers.slice(0,Number(limit))
        }
        if(id){
            newUsers = newUsers.filter((users)=>{
                return users.id === Number(id);
            })
        }

        //notyetdone
        res.send(newUsers);
    })


    app.listen(port,()=>{
        console.log(`server listening on port:  ${port}`)
    })
}
//serverWithQuery()


///using middleware.
/**
 * Middleware is basically what you use to apply a functionality
 * to each route. also, instead of writing the middleware on each router, you
 * can simply use app.use and this will be applied on all
 * the routes below it. with app.use, order matters. every route abover it wont take the functionality.
 * Also, the middleware function must take a next() callback function. to move on to the other codes in the route.
 * 
 * if you dont want app.use to apply to all route, you can include
 * a path parameter as the first argument i.e. app.use('./vendors',callback)
 * in this case, it'll only apply to routes that have the path /vendors
 * 
 * you can execute multiple middleware function by placing then in an array. 
 */
const middleswa = (req,res,next)=>{
    const url = req.url;
    const meth = req.method;
    const time = new Date().getFullYear()

    console.log(url,meth,time);
    next();


}
const serverWithMiddleWare = ()=>{
    const express = require('express');
    const app = express();
    const port = 5000;
    app.use(middleswa);

    app.get("/",(req,res)=>{
        res.send('home')
    })
    app.get("/about",(req,res)=>{
        res.send("about");        
    })
    app.get('/others',(req,res)=>{
        res.send('others')
    })


    app.listen(port,()=>{
        console.log(`server is listening on port ${port}`)
    })
}

//serverWithMiddleWare();

//johnsmila httpmethodexamples

const serverMitHttpMethods = () =>{
    const express = require('express');
    const app = express();
    const {people,products} = require('./data')
    //access to ijncoming static asset
    app.use(express.static('./methods-public'))
    //this right here gives you access to the incoming form data
    app.use(express.urlencoded({extended : false}))
    //access to incoming json data
    app.use(express.json())
    
    app.get('/api/people',(req,res)=>{
        res.status(200).json({
            success: true,
            data: people
        })
    })
    app.get('/api/people/:name', (req,res)=>{
        const {name} = req.params;

        const onePerson = people.find((person)=>{
            return  person.name === name;
        })
        if(!onePerson){
            return res.status(400).send({
                success: true,
                data: [],
                mesg: 'Person does not exist'
            })
        }
        res.status(200).json(onePerson);
    })
    app.get('/api/products',(req,res)=>{
        res.json({
            success: true,
            data : products
        })
    })
    app.get('/api/products/id/:id',(req,res)=>{
        const {id} = req.params;
        const singleProduct = products.find((product)=>{
            return product.id === Number(id)
        })
        if(!singleProduct){
            return res.status(200).json({
                success: true,
                data: [],
                msg: 'product does not exist yet'
            })
        }
        res.status(200).json({
            success: true,
            data: {
                name : singleProduct.name,
                desc: singleProduct.desc,
                price: singleProduct.price
            }
        })
    })
    app.get('/api/products/q',(req,res)=>{
        const {name,id,limit} = req.query;
        let aProducts = [...products];

        if(name){
            aProducts = aProducts.filter((product)=>{
                return product.name.startsWith(name);
            })
        }
        if(id){
             aProducts = aProducts.filter((product)=>{
                return product.id === Number(id)
            })
        }
        if(limit){
            aProducts = aProducts.slice(0,Number(limit))
        }

        if(aProducts.length<1){
            return res.status(404).json({
                success: false,
                data: [],
                msg: "product does not exist"
            })
        } 
       
        res.status(404).json({
            success: true,
            data: aProducts,
        })
    }) 

    app.post('/login',(req,res)=>{
        const{name} = req.body;
        if(name){
           return res.status(200).send(`welcome ${name}`)
        }
        res.status(404).send('Please provide credentials')

        //witghout urlencoded, you cannot have access to the request object
        //this returns unde(req.body)fined
    })
    app.post('/api/people',(req,res)=>{
        const{name} = req.body;
        if(!name)
        {
            return res.status(400).json({
                success: false,
                msg: "Please provide creential"
    
            })
        }
        res.status(201).json({
            success : true,
            people : name
        })
    })
    app.put('/api/people/:id', (req,res)=>{
        const {id} = req.params;
        //then what you want to change

        const {name} = req.body;
        const prod =  people.find((pers)=>{
           return pers.id === Number(id)
        })
        if(!prod){
            return res
            .status(404)
            .json({
                success: false,
                msg: `person with id: ${id} does not exist`
            })
        } else{
            prod["name"] = name;

        }
        res.send(people)
    })

    app.listen(5000, ()=>{
        console.log('server is listening on port 5000')
    })
}

serverMitHttpMethods();

//postman