var mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const db =mongoose .connect("mongodb://0.0.0.0:27017/ecommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true })   
        
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));





const userschema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
      Password: {
        type: String,
        required: true,
        // minlength: 5,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phonenumber:{
        type:Number,
        // minlength:10,
        unique:true,
      },
      blocked:{
        type:Boolean,default:false
      },
      CreatedAt:{
      type:Date,
      default:Date.now,
      },
   
})
const categorySchema= new mongoose.Schema({
  CategoryName:{
    type:String
  }

})

 const productSchema=new mongoose.Schema({
    Productname:{
      type:String
    },
    ProductDescription:{
      type:String
    },
    Quantity:{
      type:Number
    },
    Image:{
      type:String,
     

    },
    Price:{
  type:Number
    },
    category:{
      type:String
    },
    
    listbol:{
      type:Boolean,
      default:false
    }
    

 })

 const cartSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "user"
  } ,
  
  cartItems:[
    {

   productId:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
   Quantity:{type:Number,default:1},
   price:{type:Number}
    }
  ],
 })

module.exports={
 user :mongoose.model('user',userschema),
category:mongoose.model('Category',categorySchema),
cart:mongoose.model('cart',cartSchema),
  product:mongoose.model('product',productSchema)
}
