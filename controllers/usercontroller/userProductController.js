
     const userproductHelpers=require('../../helpers/UserHelpers/userProductHelpers')
     const userhelpers =require("../../helpers/UserHelpers/UserHelpers")
     
    
  module.exports={   
     
   
    //shop

  shopProduct: (req, res) => {
    let users = req.session.user
            userproductHelpers.shopListProduct().then((response) => {
            res.render('user/shop', { response,users })
            })
        
                  },

                  
      prodDetails:(req,res)=>{
        userproductHelpers.productdetails(req.params.id).then((response1)=>{

          let response=response1[0]                                                                                                            
          console.log(response);

          res.render("user/productdetails",{response})
        })
  

                     },
        getcart:(req,res)=>{
         res.render("user/cart",{cartItems})
        },


                   
      







                
                
                }