var express = require("express");
var router = express.Router();
const controllers=require('../controllers/usercontroller/usercontroller');
const userProductControllersjs = require("../controllers/usercontroller/userProductController.js");
const userProductController=require('../controllers/usercontroller/userProductController.js')
const auths=require('../middlewares/middleware')

/* GET home page. */
router.get("/",controllers.getHome)
  
router.get("/login",auths.userauth, controllers.getUserLogin)

router.post("/login", controllers.postUserLogin )

router.get("/signup",controllers.getSignUp)

router.post("/signup", controllers.postSignUp)

router.get("/shop",auths.userauth,userProductController.shopProduct)

router.get("/logout",controllers.getLogout);

router.get("/getOtp",controllers.getotp)

router.post("/reqotp",controllers.reqotp)

router.post('/verifyOtp',controllers.verifyOtp);

router.get("/cart",auths.userauth,userProductController.getcart)

router.get("/productdetails/:id",auths.userauth,userProductController.prodDetails)
  
module.exports = router;
