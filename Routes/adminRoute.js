const express = require("express");
const router = express.Router();
const adminModel = require("../Models/adminModel");
// const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const jwtSecretAdmin = "HELLOMYNAMEWISHEYYDH";

router.post("/adminLogin", async (req, res) => {
  let adminEmail = req.body.adminEmail;

  //   const error = validationResult(req);
  //   if (!error.isEmpty()) {
  //     return res.status(400).json({ error: error.array() });
  //   }

  try {
    const adminData = await adminModel.findOne({ adminEmail });
    console.log(adminData);
    if (!adminData) {
      return res
        .status(400)
        .json({ error: "Try logging with correct credentials" });
    }

    if (req.body.password != adminData.password) {
      return res
        .status(400)
        .json({ error: "Try logging with correct credentials" });
    } else {
      const data = {
        admin: {
          id: adminData._id,
          name: adminData.adminName,
          email: adminData.adminEmail,
        },
      };
      const adminAuthToken = jwt.sign(data, jwtSecretAdmin);
      const adminDetail = {
        name: adminData.adminName,
        email: adminData.adminEmail,
      };
      return res.json({ success: true, adminAuthToken, adminDetail });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, msg: "Please enter correct credentials" });
  }
});

module.exports = router;
