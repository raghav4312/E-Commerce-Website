const express = require('express');
const router = express.Router();

const product = require('../models/product');

router.get('/addProduct',(req,res)=>{
  res.render('addProduct',{user:"req.session.loggedInUser.name"})
})

router.get('/editProduct/:id',(req,res)=>{
  product.findOne({_id:`${req.params.id}`},(err,docs)=>{
    if(err)console.log(err);
    else{
    // res.redirect('/products');
    // console.log(docs);
    res.render('editProduct',{data:docs,user:req.session.loggedInUser.name});
    }
  })
})

router.post('/addProduct',(req,res)=>{
  product.findOne({name:req.body.name,desc:req.body.desc,price:req.body.price},(err,data)=>{
    if(err){
      console.log(err);
      res.send({error:err});
    }
    else{
      if(data!=null&&data.isActive==true)
      {
        product.findOneAndUpdate(
        {name:req.body.name,
        desc:req.body.desc,
        price:req.body.price},
        {name:req.body.name,
        desc:req.body.desc,
        quantity:data.quantity+req.body.quan,
        price:req.body.price})
      }
      else
      {
        let prod = new product();
        prod.name = req.body.name;
        prod.desc = req.body.desc;
        prod.quantity = req.body.quan;
        prod.price = req.body.price;
        prod.isActive = true;
        prod.save();
      }

      res.send({error:null});
    }
  })
  
  // res.write("Product Added Successfully");

})

router.post('editProduct',(req,res)=>{
  product.findByIdAndUpdate(`${req.body.id}`,{
    name:req.body.name,
    desc:req.body.desc,
    quantity:req.body.quan,
    price:req.body.price
  },(err,data)=>{
    if(err){
      console.log(err);
      res.send({error:err});
    }
    else
    res.send({error:null});
  })
})

module.exports = router;