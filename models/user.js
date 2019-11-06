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
    required:true
  },
  password:{
    type:String,
    required:true
  },
  mobileno:{
    type:String,
    min:1111111111,
    max:9999999999
  },
  address:{
    type:String,
  },
  isAdmin:{
    type:Boolean,
    required:true,
    default:false
  }
});

var user = mongoose.model('user',User);

module.exports = user;