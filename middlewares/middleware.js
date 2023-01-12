const user = require('../models/connection')



  module.exports={
    auth:(function(req,res,next){
      
        if(req.session.adminloggedIn){
          next()
        }else{
          res.render('admin/login',{layout:'adminlayout'})
        }
       
      }),


      userauth:(async function(req,res,next){
        try{
        console.log(req.session);
       
        if(req.session.loggedIn ){
          console.log(req.session.user.userId);
          let userDetail =await user.user.findById(req.session.user.userId)
          if(userDetail.blocked){
          
            req.session.loggedIn = false;
            res.redirect('/login')
          }else{
            
            req.session.loggedIn = true;
            
          }
          next()
        }else{
          res.redirect('/login')
        }
      }catch(err){
        console.log(err);
      }
      })
    
    
  }

    // module.exports={
    // auth:(function(req,res,next){
    //     if(req.session.adminloggedIn){
    //       next()
    //     }else{
    //       res.render('admin/login',{layout:'adminlayout'})
    //     }
       
    //   }),
    //   userauth: (function(req, res, next) {
    //     if (req.session.user && req.session.loginStatus) {
    //       next();
    //     } else if(req.session.loginStatus){
    //        res.render('user/shop')
    //     }else {
    //       req.session.user = null
    //       req.session.loginStatus = false
    //       res.render('user/login',);
    //     }
    //   }),
    // };

  