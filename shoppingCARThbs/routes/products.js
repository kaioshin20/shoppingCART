const express = require("express")
const route=express.Router()
const Product = require('../db').Product
const path=require('path')
route.use('/',express.static(path.join(__dirname,'../public')))




route.get('/:id', (req, res) => {

    Product.findAll({
        
        where:{
            id:req.params.id
        }
       
    })
        .then((product) => {
            console.log("in get of products.js"+req.params.id);
            console.log(product);
            
             res.render('specificProduct.hbs',{product})
           
        })
        .catch((err) => {
          console.log("inside error  of :id"+req.params.id);
          
            res.status(500).send({ error: err })
        })
})

exports = module.exports = {
    route
}