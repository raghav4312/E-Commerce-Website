const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');

const product = require('../models/product');
const user = require('../models/user');

router.use(middleware.authenticateUser);

router.get('/',(req,res)=>{
  res.render('cart',
  {
    user:req.session.loggedInUser.name,
    data:req.session.loggedInUser.cart
  });
})

router.post('/addToCart',(req,res)=>{
  product.findOne({_id:req.body.pid},(err,data)=>{
    if(err)
    {
      console.log(err);
      res.send({error:err});
    }
    else{
      let obj = {
        pid:data._id,
        name:data.name,
        desc:data.desc,
        quantity:req.body.qty,
        price:data.price,
        isActive:data.isActive
      }
      let cartArray = req.session.loggedInUser.cart;
      let ind=-1;
      for(let i=0;i<cartArray.length;i++)
      {
        if(cartArray[i].pid==obj.pid)
        ind=i;
      }
      if(ind!=-1)
      {
        let q = Number(cartArray[ind].quantity);
        cartArray[ind].quantity=(Number(req.body.qty)+Number(cartArray[ind].quantity));
      }
      else
      cartArray.push(obj);
      req.session.loggedInUser.cart = cartArray;
      user.findByIdAndUpdate(`${req.session.loggedInUser._id}`,req.session.loggedInUser,(error,docs)=>{
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