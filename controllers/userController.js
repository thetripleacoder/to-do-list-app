// model
const User = require('../models/userModel');

// libraries
// const bcrypt = require('bcrypt');
var bcrypt = require('bcryptjs');

// controller
const auth = require('../auth');

// controller modules
module.exports.register = (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let address = req.body.address;
  let email = req.body.email;
  let password = req.body.password;
  let mobileNo = req.body.mobileNo;

  User.findOne({ email: email })
    .then((foundUser) => {
      if (foundUser) {
        res.send({
          message: 'Email is already taken!',
        });
      } else {
        if (
          firstName != '' &&
          lastName != '' &&
          address != '' &&
          email != '' &&
          password != '' &&
          mobileNo != '' &&
          firstName != null &&
          lastName != null &&
          address != null &&
          email != null &&
          password != null &&
          mobileNo != null &&
          firstName != undefined &&
          lastName != undefined &&
          address != undefined &&
          email != undefined &&
          password != undefined &&
          mobileNo != undefined
        ) {
          const hashedPassword = bcrypt.hashSync(req.body.password, 10);

          let newUser = new User({
            firstName: firstName,
            lastName: lastName,
            address: address,
            email: email,
            password: hashedPassword,
            mobileNo: mobileNo,
          });

          newUser
            .save()
            .then((user) => {
              res.send(user);
            })
            .catch((err) => {
              res.send(err);
            });
        } else {
          res.send({
            message: 'All fields are required!',
          });
        }
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

