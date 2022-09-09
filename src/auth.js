//this isn't typical types middle it works like the middle ware
//passport-google-oauth20
//Passport strategy for authenticating with Google using the OAuth 2.0 API.



import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import "dotenv/config";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, cb) {
      //   console.log("hello");

      //we use data base
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
     //jwt
     
      console.log(profile);
      return cb(null, profile);
      //   });
    }
  )
);


// make the data


passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function (user, cb) {
    cb(null, user);
  });