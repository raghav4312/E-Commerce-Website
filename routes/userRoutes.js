const express = require('express');
const app = express();
const router = express.Router();

const product = require('../models/product');
const cart = require('../models/cart');
const user = require('../models/user');

router.get('/login',(req,res)=>{
  res.render('login',{error:req.session.loginError,user:null});
})

router.post('/login',(req,res)=>{

})

router.get('/register',(req,res)=>{
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

        User.save();

        req.session.isLoggedIn = true;
        req.session.loggedInUser = User;
        res.redirect('/');
      }
      else{
        console.log("Email already exists");
        req.session.registerError = "User with this Email address already exists";
        res.send(req.session.registerError);
      }
    }
})
})

module.exports = router;