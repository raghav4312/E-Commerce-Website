const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/database',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let Schema = mongoose.Schema;

let Cart = new Schema({
  uid:{
    type:String,
    required:true
  },
  pid:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  quantity:{
    type:Number,
    required:true,
    default:0
  },
  price:{
    type:Number,
    required:true
  }
})

var cart = mongoose.model('cart',Cart);

module.exports = cart;