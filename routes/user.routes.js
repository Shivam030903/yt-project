import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import { json } from "body-parser";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const uploadImage = await cloudinary.uploader.upload(
      req.files.logoUrl.tempFilePath,
    );
    console.log("Possible =>", req.files.logoUrl.tempFilePath);
    console.log(hashedPassword);
    

    console.log("image", uploadImage);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashedPassword,
      channelName: req.body.channelName,
      phone: req.body.phone,
      logoUrl: uploadImage.secure_url,
      logoId: uploadImage.public_id,
    });

    let user = await newUser.save();
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
