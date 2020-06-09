const _secret = require('../secretkey');
const jwt = require('jsonwebtoken');

/**
 * Validates token and user grants
 * @param token Request object
 * @param res Response object
 * @param grant Entity
 * @returns promise
 */
exports.validateUser = (token, res, grant) => {
  let promise = new Promise ((resolve, reject) => {
    jwt.verify(token, _secret.secret.secretKey, function (err, authData) {
      if (err) {
        if (err.name == 'TokenExpiredError') {
          res.json({
            message: 'Access token expired',
            expireDate: err.expiredAt
          });
          reject(false);
        } else {
          res.json(err);
          reject(false);
        }
      } else {
        if (validateUserType(token, grant)) {
          resolve(true);
        } else {
          res.json(messages.user.error.loginError);
          reject(false);
        }
      }
    });
  });

  return promise;
};
/**
 * Validates if user's type is equal to user's
 * typestoraged in access token
 * @param {*} token 
 * @param {*} userTypes 
 */
function validateUserType(token, userTypes) {
  var promise = new Promise(function(resolve, reject){
      var decoded = jwt.decode(token, {complete: true});
      var result = false;
      var userType = decoded.payload.type;
      
      userTypes.forEach(type => {
          if (type === userType) {
              result = true;
          }
      });
      resolve(result);
  })

  return promise;
}