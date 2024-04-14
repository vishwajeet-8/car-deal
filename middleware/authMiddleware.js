import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decode = jwt.verify(token, "the secret is the secret key");
    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;