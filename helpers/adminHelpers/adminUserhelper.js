const user =require("../../models/connection");
const multer= require('multer');
const { response } = require("../../app");



module.exports={

 //get user 
 getUsers: () => { 
    console.log(user);
    return new Promise(async (resolve, reject) => {
        let userDatas = []
        await user.user.find().exec().then((result) => {
            userDatas = result
        })
        console.log(userDatas);
        resolve(userDatas)
    })
},
//un block user
UnblockUser: (userID) => {
    console.log(userID);
    return new Promise(async (resolve, reject) => {
        await user.user.updateOne({ _id: userID }, { $set: { blocked: false } })
        .then((data) => {
            console.log('Data updated');
            resolve()
        })
       
    })

},
//    blockuser 

blockUser: (userID) => {
    console.log(userID);
    return new Promise(async (resolve, reject) => {

        await user.user.updateOne({ _id: userID }, { $set: { blocked: true } })
            .then((data) => {
                console.log('Data updated');
                resolve()
            })
           

    })

},
}