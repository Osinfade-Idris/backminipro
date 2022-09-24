const {products} = require('../data')

const getProducts = (req,res)=>{
    res.json({
        success: true,
        data : products
    })
}
const getSingleProduct = (req,res)=>{
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
}

const createProduct = (req,res)=>{
    const{name,price,desc} = req.body;
    if(!name || !price || !desc)
    {
        return res.status(400).json({
            success: false,
            msg: "the name, price and desc of product"

        })
    }
    res.status(201).json({
        success : true,
        product : {
            "name" : name,
            "price": price,
            "desc": desc
        }
    })
}
const editProduct = (req,res)=>{
    const {id} = req.params;
    const {desc,name,price} = req.body;

    let ourProduct = products.find((product)=>{
        return product.id === Number(id);

    })
    if(!ourProduct){
       return res.status(401).json({
            success: false,
            msg: `Product with id: ${id} does not exist`
        })
    } else{
        if(!name && !desc && !price){
            return res.status(401).json({
                success: false,
                msg: `Please provide name, desc or price to change`
            })
        }else{
            if(name){ourProduct.name = name}
            if(desc){ourProduct.desc = desc}
            if(price){ourProduct.price = price}
        }
    }
    res.status(201).json({
        success: true,
        data: products
    })
}
const deleteProduct = (req,res)=>{
    let newProduct = [...products];
    const {id} = req.params;
    const item = newProduct.find((prod)=>{
        return prod.id === Number(id);
    })
    if(!item){
        return res.status(401).json({
            success: false,
            msg: `product with id: ${id} does not exist`
        })
    }
    newProduct = newProduct.filter((product)=>{
        return product.id !== Number(id)
    })
    res.status(201).json({
        success: true,
        data: newProduct
    })
}
module.exports = {
    getProducts,
    getSingleProduct,
    createProduct,
    editProduct,
    deleteProduct
}
