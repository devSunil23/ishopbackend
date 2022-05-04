import jwt from "jsonwebtoken";
import Users from "../model/userSchema.js";
const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyToken = jwt.verify(token, process.env.SECRETKEY);
    const rootUser = await Users.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User Not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res.status(401).send("Unautorized :No token provided");
    console.log(error);
  }
};
export default Authenticate;
