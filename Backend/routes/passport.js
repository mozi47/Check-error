var passport = require('passport');
const User = require('../models/userModel')
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const dotenv = require('dotenv');
dotenv.config()

passport.serializeUser((user, done) =>{
  done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user) => done(err, user))
  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_KEY,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:8000/api/user/google/callback"
  },
  async(token, tokenSecret, profile, done)=> {
      //console.log(profile)
      try {
        let user = await User.findOne({email:profile.email})
        
        if(user){
          done(null,user)
        }else{
          const newuser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.email,
          })
          user = await User.create(newuser)
          done(null,user) 
        }
      } catch (error) {
          console.error(error)
      }
    }
));