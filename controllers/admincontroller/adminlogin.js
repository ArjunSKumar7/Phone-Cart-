const { response } = require('../../app');
const adminHelper= require('../../helpers/adminHelpers/adminProductHelpers');
const { category } = require('../../models/connection');
const user = require("../../models/connection");




const adminCredential={
    name:'superAdmin',
    email:'admin@gmail.com',
    password:'admin123'
   }
  
module.exports={

 // get login

     getAdminLogin:(req, res)=> {
      let admins=req.session.admin
        if(req.session.adminloggedIn){
          res.render("admin/admin-dashboard",{layout:"adminLayout",admins})
        }else{
       
      res.render('admin/login',{layout:'adminLayout'})
        }
        
      },


  postAdminLogin:(req, res)=> {
        
        if(req.body.email==adminCredential.email && req.body.password==adminCredential.password){
          console.log(req.body);
          
        req.session.adminloggedIn=true
        
        req.session.admin=adminCredential
       
        res.redirect('/admin')
      }
      
        else{
          adminloginErr=true
        
        res.render('admin/login',{layout:'adminLayout',})
        }
       },
       
//get dashboard

  getDashboard: (req, res) =>{
    
   let adminstatus=req.session.adminloggedIn
  let admins=req.session.admin
    console.log(admins);
    
    res.render("admin/admin-dashboard",{ layout: "adminLayout" ,admins});
    },

  

//admin logout

getAdminLogOut:(req,res)=>{
  req.session.adminloggedIn=false

  res.render("admin/login",{layout: "adminLayout",})
},

}






