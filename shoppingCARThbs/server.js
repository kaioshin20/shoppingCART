const express=require('express')
const app=express()
const session = require('express-session')
const passport = require('./passportWork/setuppassport')
const flash=require('connect-flash')
// const checkLoggedIn=require('./passportWork/checkAuthentication')
const path=require('path')
const Product = require('./db').Product
const Users = require('./db').Users
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;



app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(
    session({
        secret: 'a string for secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000*60*60,
        }
    })
)
//these three  should be below the  session 
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//this should be placed above setting up all the routes
app.use(function(req, res, next) {
    res.locals.login=req.isAuthenticated();
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();  //next is here to let the request continue
  });

 function isAdmin(req,res,next){
    
        if((req.user.username)==="rajnish"){
           return next()
        
    }
    else{
        req.flash("error_msg","only admin can visit the requested page")
        res.redirect('/users/login')
    }
 }

app.use('/',express.static(path.join(__dirname,'public')))
app.use('/',require('./homePage').route)
app.use('/users',require('./routes/users').route)
app.use('/products',require('./routes/products').route)
app.use('/users',require('./routes/users').route)


// not using below function ,instead of this using ensureloggedIn

//   function checkLoggedIn(req,res,next){
//     if(req.user){
//         return next()
//     }
//     req.flash('error_msg', 'Please log in to view that resource');
//     res.redirect('/users/login')
// }

app.get('/cart/:id',
 ensureLoggedIn('/users/login'),   //where to go in case user is not loggedIn
 (req,res)=>{
    res.render('cart')              //what to do when user is logged  in
})
app.get('/add',ensureLoggedIn('/users/login'),isAdmin,
(req,res)=>{
    res.render('add_product')
})
app.post('/add', (req, res) => {
    if (isNaN(req.body.price)) {
        return res.status(403).send({ error: "price is not a valid number" })
    }
    const newProduct = {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        price: parseFloat(req.body.price)
    }
    Product.create(newProduct)
        .then((product) => {
            res.redirect('/')
        })
        .catch((err) => {
            res.status(501).send({ error: err })
        })
})

app.get('/products/add',isAdmin)
 app.listen('2000',()=>{
        console.log("server running on http://localhost:2000");
        
    })


