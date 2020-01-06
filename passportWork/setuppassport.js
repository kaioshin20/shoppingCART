const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStratergy = require('passport-google-oauth20');
const GithubStrategy = require('passport-github').Strategy;
const Users = require('../routes/db').Users

const port = process.env.PORT || 2000;

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

passport.use(new FacebookStrategy({
    clientID : "410060069865233",
    clientSecret : "b2c75a4bc9956744658c6621c93b3f65",
    callbackURL : "https://shopping-cart2019.herokuapp.com/users/login/facebook/callback"

},
function(accessToken, refreshToken, profile, done){
    console.log(profile);
    
   Users.create({
       username: profile.displayName,
       fbAccessToken: accessToken
   }).then((user)=>{
    console.log("user");
       console.log(user);
       
       done(null,user)
   }).catch((err)=>{
       console.log("inside error");
       console.log(err);
       done(err)
       
       
   })
       
}))

passport.use(new GoogleStratergy({
    clientID : "371872714116-7imjdctu7758dds5ckcgpt9utj2md76r.apps.googleusercontent.com",
    clientSecret : "92-fd-v1c10bVPqljIrFIXXl",
    callbackURL : "https://shopping-cart2019.herokuapp.com/users/login/google/callback"

},
function(accessToken, refreshToken, profile, done){
    console.log(profile);
    
   Users.create({
       username: profile.displayName,
       gAccessToken: accessToken
   }).then((user)=>{
    console.log("user");
       console.log(user);
       
       done(null,user)
   }).catch((err)=>{
       console.log("inside error");
       console.log(err);
       done(err)
       
       
   })
       
}))


passport.use(new GithubStrategy({
    clientID : "Iv1.68c04fa3e0a97864",
    clientSecret : "5931a110b7aa4ce587f22b63ec6aac148f268026",
    callbackURL : "https://shopping-cart2019.herokuapp.com/users/login/github/callback"

},
function(accessToken, refreshToken, profile, done){
    console.log(profile);
    
    
   Users.create({
    
        username: profile.username,
        ghAccessToken: accessToken,
    
   }).then((user)=>{
    console.log("user");
       console.log(user);
       
       done(null,user)
   }).catch((err)=>{
       console.log("inside error");
       console.log(err);
       done(err)
       
       
   })
       
}))

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {

    done(null, user);
});

// passport.serializeUser((user,done)=>{
//     done(null,user.id)
// })

// passport.deserializeUser((userId, done)=>{
//     Users.findOne({
//         where:{
//             id:userId,
//         }
//     })
//     .then((user)=>{
//         done(null,user)
//     })
//     .catch((err)=>{
//         done(err)
//     })
// })

module.exports=passport