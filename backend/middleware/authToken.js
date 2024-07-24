const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("Authentication error:", err);
        return res.status(401).json({
          message: "Invalid or expired token",
          error: true,
          success: false,
        });
      }
      req.userId = decoded?.userId;
      next();
    });
  } catch (err) {
    console.error("Error in authToken middleware:", err);
    res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
