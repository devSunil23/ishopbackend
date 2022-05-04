import express from "express";
import Users from "../model/userSchema.js";
import bcrypt from "bcryptjs";
import { login } from "../controler.js";
import { registration } from "../controler.js";
import Authenticate from "../middleware/auhtenticate.js";
const routes = express.Router();
routes.post("/register", registration);
routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Plz Filled the data" });
  }
  const userLogin = await Users.findOne({ email: email });
  if (userLogin) {
    const isMatch = await bcrypt.compare(password, userLogin.password);
    const tokens = await userLogin.generateAuthToken();
    if (!isMatch) {
      res.status(400).json({ message: "invalid data" });
      console.log("invalid data");
    } else {
      res.cookie("jwtoken", tokens, {
        httpOnly: true,
        expires: new Date(Date.now() + 300000),
      });
      console.log("cookies store successfully");
      console.log(tokens);
      res.status(200).json({ message: "user login successfully !" });
      console.log("user login successfully happy !");
    }
  } else {
    res.status(400).json({ message: "invalid data" });
    console.log("invalid data");
  }
});
// routes.get("/profile", Authenticate, (req, res) => {
//   console.log("hello world");
//   res.send(req.rootUser);
// });
export default routes;
