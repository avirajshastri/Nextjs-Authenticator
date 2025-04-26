import { verify } from "crypto";
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
     username: {
        type: String,
        required: [true, "username is required"],
        unique: true
     },
     email:{
        type: String,
        required: [true, "email is required"],
        unique: true
     },
     password: {
        type: String, 
        required: [true, "password is required"]
     },
     isVerified:{
        type: Boolean, 
        default: false
     },
     isAdmin: {
        type: Boolean,
         default: false
     },
     forgotPasswordToken : String,
     forgotPasswordTokenExpiry: Date,
     verifyToken: String,
     verifyTokenExpiry: Date
})


const User = mongoose.models["User"] || mongoose.model("User",userSchema) //mongoose.models ek object h jo sare models store krta

export default User;