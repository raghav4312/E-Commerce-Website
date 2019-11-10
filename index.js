const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const session = require('express-session');
const bodyParser = require('body-parser');

/*************** SETTING UP THE MONGOOSE CONNECTION ******************/
mongoose.connect(db,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
})
.then(()=>{console.log("MongoDB Connected");})
.catch((err)=>{console.log(err);});

const product = require('./models/product');
const cart = require('./models/cart');
const user = require('./models/user');

/*************** SETTING UP BASIC MIDDLEWARES AND VIEW ENGINE *****************/
app.use(session({
  'secret':'ertgbv946cxdrtyui393nbv',
  saveUninitialized:true,
  resave:true}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'static')));
app.use(express.static(path.join(__dirname,'views')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/************************** REQUIRING THE ROUTES *********************************/
const userRoute = require('./routes/userRoutes');
const prodRoute = require('./routes/prodRoutes');
// const cartRoute = require('./routes/cartRoutes');

app.use('/user',userRoute);
app.use('/prod',prodRoute);
// app.use('/cart',cartRoute);

app.get('/',(req,res)=>{
  product.find({},(err,data)=>{
    if(!req.session.isLoggedIn)
      res.render('home',{data:data,user:null});
    else
    {
      if(res.session.loggedInUser.isAdmin==true)
      res.render('products',{data:data,user:req.session.loggedInUser.name});
      else
      res.render('home',{data:data,user:req.session.loggedInUser.name});
    }

  })
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));