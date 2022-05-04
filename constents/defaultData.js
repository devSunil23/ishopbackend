import { products, storeAccesories, brandData } from "./data.js";
import dataModel, { storeModelAc, brandModel } from "../model/productSchema.js";
const defaultData = async () => {
  try {
    await dataModel.deleteMany({});
    await dataModel.insertMany(products);
    await storeModelAc.deleteMany({});
    await storeModelAc.insertMany(storeAccesories);
    await brandModel.deleteMany({});
    await brandModel.insertMany(brandData);
    console.log("data inserted successfully");
  } catch (error) {
    console.log(`database save error:${error}`);
  }
};
export default defaultData;
