import mongoose from "mongoose";

const connection = async (userName, password) => {
  const url = `mongodb+srv://${userName}:${password}@ishop.bhumg.mongodb.net/Ishop?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(url);
    console.log("connection is successful");
  } catch (error) {
    console.log(error);
  }
};
export default connection;
