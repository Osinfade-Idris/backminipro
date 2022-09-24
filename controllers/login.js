const auth = (req,res)=>{
    const{name} = req.body;
    if(name){
       return res.status(200).send(`welcome ${name}`)
    }
    res.status(401).send('Please provide credentials')

    //witghout urlencoded, you cannot have access to the request object
    //this returns unde(req.body)fined
}

module.exports = {auth}