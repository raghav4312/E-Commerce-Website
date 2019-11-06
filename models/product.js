const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/data',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let Schema = mongoose.Schema;

let Product = new Schema({
  pid : {
    type:Number,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  isActive:{
    type:Boolean,
    required:true,
    default:true
  }
})

var product = mongoose.model('product',Product);

module.exports = product;