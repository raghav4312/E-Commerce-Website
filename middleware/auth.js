let middleware = {
  authenticateAdmin : (req,res,next)=>{
    if(req.session.adminLogin==true)
    {
      return next();
    }
    res.send({error:"Admin Login is required"});
  },
  authenticateUser : (req,res,next)=>{
    if(req.session.isLoggedIn==true)
    {
      return next();
    }
    res.send({error:"Login is required"});
  },
  preventMultipleLogin : (req,res,next)=>{
    if(req.session.isLoggedIn==true)
    res.redirect('/');
    else
    return next();
  }
}
module.exports = middleware;