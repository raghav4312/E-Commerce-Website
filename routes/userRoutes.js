const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/auth');

const product = require('../models/product');
const cart = require('../models/cart');
const user = require('../models/user');

router.get('/login',middleware.preventMultipleLogin,(req,res)=>{
  res.render('login',{error:req.session.loginError,user:null});
})

router.post('/login',(req,res)=>{
  user.findOne({email:req.body.email,password:req.body.password},(err,docs)=>{
    if(err)console.log(err);
    else
    {
      if(docs!=null){
        if(docs.isAdmin==true)
        req.session.adminLogin=true;
        req.session.isLoggedIn=true;
        req.session.loggedInUser=docs;
        console.log(req.session.loggedInUser);
        res.json({error:null,adminLogin:true});
      }
      else
      {
        req.session.adminLogin=false;
        req.session.isLoggedIn=false;
        req.session.loggedInUser=null;
        res.json({error:"Email or Password is incorrect"});
      }
    }

  })

})

router.get('/register',middleware.preventMultipleLogin,(req,res)=>{
  res.render('register',{error:"Email Invalid",user:null});
})

router.post('/register',(req,res)=>{
  user.findOne({email:`${req.body.email}`},(err,data)=>{
    if(err) console.log(err);
    else
    {
      console.log(data);
      if(data==null){
        let User = new user();
        User.name=req.body.name;
        User.email=req.body.email;
        User.password=req.body.password;
        User.mobileno=req.body.mobileno;
        User.address=req.body.address;
        User.cart = [];

        User.save();

        req.session.isLoggedIn = true;
        req.session.loggedInUser = User;
        res.send({error:null});
      }
      else{
        console.log("Email already exists");
        req.session.registerError = "User with this Email address already exists";
        res.send({error:req.session.registerError});
      }
    }
})
})

router.post('/logout',(req,res)=>{
  req.session.adminLogin=false;
  req.session.isLoggedIn=false;
  req.session.loggedInUser=null;
  res.send({error:null});
})

module.exports = router;