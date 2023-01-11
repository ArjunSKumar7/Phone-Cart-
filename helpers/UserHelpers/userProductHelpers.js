
const { shopProduct } = require("../../controllers/usercontroller/userProductController.js");
const user = require("../../models/connection");


 //display shop
 
 module.exports={
 shopListProduct:()=>{
    return new Promise(async(resolve, reject) => {
      await user.product.find().exec().then((response)=>{
        resolve(response)
      })
    })
  },

  productdetails:(prodId)=>{
    return new Promise(async(resolve, reject) => {
      await user.product.find({_id:prodId}).exec().then((response)=>{
        resolve(response)
      })
      
    })
   }
}