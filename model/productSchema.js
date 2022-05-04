import mongoose from "mongoose";
const schema = mongoose.Schema({
  id: String,
  url: String,
  title: String,
  starRating: Number,
  netPrice: Number,
  mrp: Number,
  quantity: Number,
});
const storeSchema = mongoose.Schema({
  acName: String,
  acValue: Number,
});
const brandSchema = mongoose.Schema({
  brandName: String,
  brandCount: Number,
});
const dataModel = mongoose.model("ishopProduct", schema);
export const storeModelAc = mongoose.model("storeAcessories", storeSchema);
export const brandModel = mongoose.model("brandStore", brandSchema);
export default dataModel;
