const userhelpers = require("../../helpers/UserHelpers/UserHelpers");
const user = require("../../models/connection");

let loggedinstatus;
let Number;

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require("twilio")(accountSid, authToken);

module.exports = {
  // user home
  getHome: (req, res) => {
    if (req.session.user){//loggedIn
      let users = req.session.user;
      res.render("user/user", { users });
    } else {
      res.render("user/user");
    }
  },
  // get user login
  getUserLogin: (req, res) => {
    if (req.session.loggedIn) {
      
      res.redirect("/");
    } else {
      res.render("user/login");
    }
  },
  // post user login
  postUserLogin: (req, res) => {
    userhelpers.doLogin(req.body).then((response) => {
      req.session.loggedIn = true;
      console.log(response);
      req.session.user = response;

      let loggedinstatus = response.loggedinstatus;
      let blockedStatus = response.blockedStatus;
      console.log(loggedinstatus + "loggedinstatus");

      if (loggedinstatus == true) {
        res.redirect("/");
      } else {
        res.render("user/login", { blockedStatus, loggedinstatus });
      }
    });
  },
  //get signup

  getSignUp: (req, res) => {
    emailStatus = true;
    if (req.session.userloggedIn) {
      res.redirect("/");
    } else {
      res.render("user/signup", { emailStatus });
    }
  },
  //post sign up
  postSignUp: (req, res) => {
    userhelpers.doSignUp(req.body).then((response) => {
      req.session.userloggedIn = true;

      var emailStatus = response.status;
      if (emailStatus == true) {
        res.redirect("/login");
      } else {
        res.render("user/signup", { emailStatus });
      }
    });
  },

  getotp: (req, res) => {
    res.render("user/reqotp");
  },

  //     reqotp:async (req, res) => {
  //       console.log(req.body.phonenumber);
  //   Number = req.body.phonenumber;
  //   let usernumber =  await user.user.find({ phonenumber: Number }).exec()
  //   console.log("my number"+usernumber);
  //   if (usernumber == false) {
  //     res.redirect('/login')
  //  } else{
  //     client.verify
  //         .services(serviceSid)
  //         .verifications.create({ to:`+91 ${Number}`, channel: "sms" })
  //         .then((verification) => console.log(verification.sid));
  //  }
  //       res.redirect("/getOtp");
  //     },

  reqotp: async (req, res) => {
    console.log(req.body.phonenumber);
    Number = req.body.phonenumber;
    let usernumber = await user.user.find({ phonenumber: Number }).exec();
    console.log(usernumber);
    if (usernumber == false) {
      res.redirect("/login");
    } else {
      client.verify.v2
        .services(serviceSid)
        .verifications.create({ to: `+91 ${Number}`, channel: "sms" })
        .then((verification) => console.log(verification.status))
        .then(() => {
          const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
          });
        });
    }
    res.render("user/reqotp");
  },

  verifyOtp: async (req, res) => {
    const verificationSid = "your_verification_sid"; // Replace with the sid of the verification you want to check
    const code = req.body.otp; // Replace with the code the user entered
    console.log(code);
    console.log(Number + " phonenumber");
    let userExist = await userhelpers.getUserUsingMobile(Number);
    if(userExist){
      client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: `+91 ${Number}`, code: code })
      .then((verification_check) => {
        console.log(verification_check);
        if (verification_check.valid) {
          req.session.user = userExist           //??????????????????????????????????????????????????????????
          res.redirect("/");
        } else {
          res.render("user/reqotp", { status: false });
        }
      });
    }
   
    // If the verification check was successful, the status will be 'approved'
    // If it was unsuccessful, the status will be 'pending' or 'failed'
  }, //redirect

  //getuser logout

  getLogout: (req, res) => {
    req.session.loggedIn = false;
    res.redirect("/login");
  },
};
