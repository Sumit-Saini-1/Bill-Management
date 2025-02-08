const { verifyToken } = require("./utils/jwt");

const isLogin = function (req, res, next) {
    // If the user is already logged in via session, allow the request to continue
    if (req.session?.isLoggedIn) {
        return next();
    }

    // Check for token in the authorization header if not logged in via session
    const token = req.headers?.authorization;
    if (!token) {
        return res.redirect("/login");  // If no token, redirect to login page
    }

    // Attempt to verify the token
    verifyToken(token)
        .then(result => {
            if (result) {
                // If token is valid, set the session and allow the request to continue
                req.session.isLoggedIn = true;
                req.session.username = result.username;
                req.session.name = result.name;
                req.session._id = result.userId;
                return next();
            } else {
                // If token verification fails, send a 401 Unauthorized error
                return res.status(401).json({ err: "Not logged in" });
            }
        })
        .catch(err => {
            console.error("Token verification failed:", err);
            return res.status(401).json({ err: "Not logged in" });
        });
};

module.exports = {
    isLogin
};
