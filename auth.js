// authentication
const jwt = require('jsonwebtoken');

// secret
const secretKey = process.env.SECRET_KEY;

module.exports.createAccessToken = (user) => {
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  return jwt.sign(data, secretKey, {});
};

module.exports.verify = (req, res, next) => {
  let token = req.headers.authorization;
  if (typeof token === 'undefined') {
    res.send({ auth: 'Failed to verify token!' });
  } else {
    token = token.slice(7, token.length);
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        res.send({ auth: err });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
