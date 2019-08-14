const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../routes/db').Users

passport.use(
    new  LocalStrategy((username,password,done)=>{
        Users.findOne({
            where:{
                username:username
            }
        })
        .then((user)=>{
            if(!user){
                return done(null,false,{message: 'User not found.'})
            }

            if(user.password!=password){
                return done(null,false,{message: 'Oops! password wrong password'})
            }

            done(null,user)
        })
        .catch((err)=>{
            done(err)
        })
          
    })

)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((userId, done)=>{
    Users.findOne({
        where:{
            id:userId,
        }
    })
    .then((user)=>{
        done(null,user)
    })
    .catch((err)=>{
        done(err)
    })
})

module.exports=passport