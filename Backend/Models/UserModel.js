import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profilePic: {
        type: String 
      },
    firstname: {
      type: String,
      requred: true,
    },
    lastname: {
      type: String,
      requred: true,
    },
    email: {
      type: String,
      requred: true,
      unique:true,
    },
    password: {
      type: String,
      requred: true,
    },
    role: {
      type: String,
      requred: true,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: String,
    },
    isVerified: {
      type:Boolean,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
  },
  
  { timestamps: true }
);
export const userModel = mongoose.model("user", userSchema);