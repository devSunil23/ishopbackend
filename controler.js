import Users from "./model/userSchema.js";
import bcrypt from "bcryptjs";
export const registration = async (req, res) => {
  const { name, mobile, email, password, confirmpassword } = req.body;
  if (!name || !mobile || !email || !password || !confirmpassword) {
    return res.status(422).json({ err: "please fill the field properly" });
  }
  try {
    const exist = await Users.findOne({ email: email });
    if (exist) {
      return res.status(422).json("user is already exist.");
    } else if (password != confirmpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const newUser = new Users({
        name,
        mobile,
        email,
        password,
        confirmpassword,
      });
      await newUser.save();
      res.status(201).json("user is successfully registerd.");
    }
  } catch (error) {
    alert("Error", error.message);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Plz Filled the data" });
  }
  const userLogin = await Users.findOne({ email: email });
  if (userLogin) {
    const isMatch = await bcrypt.compare(password, userLogin.password);
    const tokens = await userLogin.generateAuthToken();
    res.cookie("jwt", tokens, {
      httpOnly: true,
      expires: new Date(Date.now() + 300000),
    });
    console.log("coockie store succesfully");
    console.log(tokens);
    if (!isMatch) {
      res.status(400).json({ message: "invalid data" });
      console.log("invalid data");
    } else {
      res.status(200).json({ message: "user login successfully !" });
      console.log("user login successfully happy !");
    }
  } else {
    res.status(400).json({ message: "invalid data" });
    console.log("invalid data");
  }
};
