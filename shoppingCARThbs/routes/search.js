const route = require('express').Router()
const Product = require('./db').Product

route.get('/search',(req,res)=>{
    Product.findAll({
        where:{
            name:req.query.name
        }
    })
    .then((products)=>{
       
        //     req.flash('error_msg','product not found')
        //    return  res.redirect('/')
        console.log("products is ");
        console.log(products);
        
        
        res.render('search_product',{products})
        
    }).catch((err)=>{
        console.log("there is error");
        
    })
})

exports=module.exports={
    route

}