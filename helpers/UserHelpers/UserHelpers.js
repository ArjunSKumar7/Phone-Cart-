const user = require("../../models/connection");
const bcrypt=require('bcrypt');
const { response } = require("../../app");

module.exports = {
  //sign up
  doSignUp: (userData) => {
     let response={};
    return new Promise(async(resolve,reject)=>{
      
  try{
    email=userData.email;
    existingUser =await user.user.findOne({email})
    if(existingUser)
    {
        response={status:false}
    return resolve(response)

    }
    else{
        var hashedPassword=await bcrypt.hash(userData.password,10);
        const data=new user.user({
           
              username: userData.username,
               Password: hashedPassword,
               email: userData.email,
               phonenumber: userData.phonenumber,
             })
       
        await data.save(data).then((data)=>{
          resolve({data,status:true})
        })
      }
    }
   
  catch(err){
     console.log(err);
  }

    
  })
  
  

  },

  //login


  doLogin: (userData) => {

    return new Promise(async (resolve, reject) => {
        try {
            let response = {}
            let users = await user.user.findOne({ email: userData.email })
            if (users) {
              if(users.blocked==false){
                await bcrypt.compare(userData.password, users.Password).then((status) => {
                    if (status) {
                     userName=users.username,

                        // response.status
                        resolve({response,loggedinstatus:true,userName,userId:users._id})
                        console.log(userName);
                    } else {
                        resolve({ loggedinstatus: false })
                    }
                })
              }
              else{
                resolve({blockedStatus:true})
              }

              
            } else {
                resolve({loggedinstatus:false })
            }
        } catch (err) {
            console.log(err);   
        }
    })


  },
  getUserUsingMobile : (mobile) =>{
    return new Promise((resolve, reject) => {
       user.user.find({phonenumber : mobile}).then((response) =>{
        resolve(response);
       }).then(() =>{
        reject(false)
       })
    })
  },
  addToCartItem:(proId,userId)=>{
    return new Promise((resolve, reject) => {
      
    })
  }

 
  
}
