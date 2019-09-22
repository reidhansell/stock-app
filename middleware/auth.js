const config = require("config");
const { OAuth2Client } = require("google-auth-library");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const client = new OAuth2Client(config.get("secret"));
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.get("secret") // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];

      req.user = payload;

      next();
    }
    verify().catch(console.error);
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
