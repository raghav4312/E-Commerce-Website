const express = require('express');
const router = express.Router();


router.get('/addProduct',(req,res)=>{
  res.render('addProduct',{user:"req.session.loggedInUser.name"})
})

router.get('/editProduct',(req,res)=>{
  res.render('editProduct',{user:"req.session.loggedInUser.name"})

})

module.exports = router;