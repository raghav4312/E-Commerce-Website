const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/database',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let Schema = mongoose.Schema;

let User = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  mobileno:{
    type:Number,
    min:1000000000,
    max:9999999999
  },
  address:{
    type:String,
  },
  isAdmin:{
    type:Boolean,
    required:true,
    default:false
  },
  cart:[{
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
  }]
});

var user = mongoose.model('user',User);

module.exports = user;