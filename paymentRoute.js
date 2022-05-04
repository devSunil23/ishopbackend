import express from "express";
const router = express.Router();
import PaytmChecksum from "./PaytmChecksum.js";
import env from "dotenv";
import { v4 as uuidv4 } from "uuid";
router.post("/post", (req, res) => {
  env.config();
  var paytmParams = {};

  /* initialize an array */
  (paytmParams["M_ID"] = process.env.MERCHANT_ID),
    (paytmParams["ORDER_ID"] = uuidv4()),
    (paytmParams["CHANNEL_ID"] = process.env.CHANNEL_ID),
    (paytmParams["INDUSTRY_TYPE_ID"] = process.env.INDUSTRY_TYPE),
    (paytmParams["WEBSITE"] = process.env.WEBSITE),
    (paytmParams["CUST_ID"] = "");
  paytmParams["TXN_AMOUNT"] = "50";
  paytmParams["CALLBACK_URL"] = "http://localhost:3000/api/callback";
  paytmParams["EMAIL"] = "sunilkumarbais25@gmail.ocm";
  paytmParams["MOBILE_NO"] = "9399030661";

  /**
   * Generate checksum by parameters we have
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */
  var paytmChecksum = PaytmChecksum.generateSignature(
    paytmParams,
    process.env.MERCHANT_KEY
  );
  paytmChecksum
    .then(function (checksum) {
      console.log("generateSignature Returns: " + checksum);
    })
    .catch(function (error) {
      console.log(error);
    });
});
export default router;
