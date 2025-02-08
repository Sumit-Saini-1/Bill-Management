const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY_FOR_TOKEN;

/**
 * 
 * @param {string} userId 
 * @param {string} username 
 * @param {string} name 
 * @returns 
 */
function createToken(userId, username, name) {
  const token = jwt.sign({
    userId,
    username,
    name
  },
    SECRET_KEY,
    { expiresIn: '30m' }
  );
  return token;
}

/**
 * 
 * @param {string} token 
 * @returns 
 */
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log(19, err);
        reject(false);
      }
      else {
        resolve(decoded);
      }
    });
  });
}

module.exports = {
  createToken,
  verifyToken
}