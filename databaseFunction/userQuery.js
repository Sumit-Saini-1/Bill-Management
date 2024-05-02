const UserModel = require("../models/User");

function findUserByUserName(username) {
    return new Promise(function (resolve, reject) {
        UserModel.findOne({ primaryEmail: username }).then(function (user) {
            if (user) {
                resolve(user);
                return;
            }
            resolve(false);
            return;
        }).catch(function (err) {
            console.log(err);
            reject(err);
            return;
        });
    });
}


module.exports = {
    findUserByUserName,
}