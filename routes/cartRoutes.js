const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');

const product = require('../models/product');
const user = require('../models/user');

router.use(middleware.authenticateUser);

router.get('/',async (req,res)=>{
  let prodQtyArray = [];
  let cartArray = req.session.loggedInUser.cart;
  for(let i=0;i<cartArray.length;i++)
  {
    let pid = cartArray[i].pid;
    await product.findOne({_id:`${pid}`},(err,data)=>{
      if(err)
      {
        console.log(err);
      }
      else
      {
        console.log(data);
        prodQtyArray[i]=data.quantity;
        console.log(prodQtyArray);
      }
    })
  }
  console.log(prodQtyArray);
  res.render('cart',
  {
    user:req.session.loggedInUser.name,
    data:req.session.loggedInUser.cart,
    prodQty:prodQtyArray
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

router.post('/removeProd',(req,res)=>{
  let cartArray = req.session.loggedInUser.cart;
  let ind=-1;
  for(let i=0;i<cartArray.length;i++)
  {
    if(cartArray.pid==req.body.pid)
    {
      ind=i;
      break;
    }
  }
  cartArray.splice(ind,1);
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
  });
})

router.post('/checkOut',async (req,res)=>{
  let cartArray = req.session.loggedInUser.cart;
  let count = 0;
  let prodQtyArray = [];
  for(let i=0;i<cartArray.length;i++)
  {
    let pid = cartArray[i].pid;
    await product.findOne({_id:`${pid}`},(err,data)=>{
      if(err)
      {
        console.log(err);
      }
      else
      {
        if(data.isActive==true&&data.quantity>=cartArray[i].quantity)
        {
          prodQtyArray[i]=data.quantity;
          count = count+1;
        }
      }
    })
  }
  if(count==cartArray.length)
  {
    for(let i=0;i<cartArray.length;i++)
    {
      let pid = cartArray[i].pid;
      await product.findOneAndUpdate({_id:`${pid}`},{quantity:prodQtyArray[i]-cartArray[i].quantity},(err,data)=>{
        if(err)
        {
          console.log(err);
          res.send({error:err});
        }
        else
        {
          console.log(data);
        }
      })
    }
    req.session.loggedInUser.cart=[];
    await user.findByIdAndUpdate(`${req.session.loggedInUser._id}`,req.session.loggedInUser,(error,docs)=>{
      if(error)
      {
        console.log(error);
        res.send({error:error});
      }
      else
      {
        res.send({error:null});
      }
    });
  }
  else
  {
    res.send({error:"One or more product may be out of stock"});
  }
})

module.exports = router;