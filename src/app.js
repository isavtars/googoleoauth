import express from "express"
import "dotenv/config"
import passport from "passport";
import   "./auth.js"
import session  from "express-session";
const { SESSION_SECRET } = process.env;

const app=express();
app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  

  // like jwt millddle ware
function validateLogin(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  
  


app.get("/", (req, res) => {
    res.send("<a href='auth/google'>Sign up with Google </a>");
  });
  
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );



  //set the redirects url in the api
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/dashboard",
      failureRedirect: "/auth/error",
    })
  );
  
  app.get("/dashboard",validateLogin, (req, res) => {
    res.send("Hello from dashboard");
  });
  
  app.get("/auth/error", (req, res) => {
    res.send("Error occured");
  });
  


app.listen(process.env.PORT,(err)=>{

    console.log(`server running through ${process.env.PORT}`)
})