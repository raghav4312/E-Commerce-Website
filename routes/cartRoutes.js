const express = require('express');
const router = express.Router();


const product = require('../models/product');
const user = require('../models/user');

router.get('/',(req,res)=>{

})

router.post('/addToCart',(req,res)=>{
  product.findOne({id:req.body.id},(err,data)=>{
    if(err)
    {
      console.log(err);
      res.send({error:err});
    }
    else{
      let obj = {
        name:data.name,
        desc:data.desc,
        quantity:req.body.quan,
        price:data.price,
      }
      res.session.loggedInUser.cart.add(obj);
      user.findOne({id:req.session.loggedInUser.id},req.session.loggedInUser,(error,docs)=>{
        if(error)
        {
          console.log(error);
          res.send({error:error});
        }
        else
        {
          res.send({error:null});
        }
      })
    }
  })
})

module.exports = router;