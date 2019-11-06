const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const session = require('express-session');
const bodyParser = require('body-parser');

/*************** SETTING UP THE MONGOOSE CONNECTION ******************/
mongoose.connect(db,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{console.log("MongoDB Connected");})
.catch((err)=>{console.log(err);});

/*************** SETTING UP BASIC MIDDLEWARES AND VIEW ENGINE *****************/
app.use(session({
  'secret':'ertgbv946cxdrtyui393nbv',
  saveUninitialized:true,
  resave:true}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'views')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* REQUIRING THE ROUTES */
const userRoute = require('./routes/userRoutes');
const prodRoute = require('./routes/prodRoutes');
const cartRoute = require('./routes/cartRoutes');


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));