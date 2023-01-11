



  module.exports={
    auth:(function(req,res,next){
        if(req.session.adminloggedIn){
          next()
        }else{
          res.render('admin/login',{layout:'adminlayout'})
        }
       
      }),
      userauth:(function(req,res,next){

        if(req.session.loggedIn ){
          next()
        }else{
          res.render('user/login')
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

  