import { Schema } from "mongoose";
import mongoose from "mongoose";
const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
});
const authSchema = new Schema({
  user: { type: [userSchema] },
});
const authUser = mongoose.model("authSchema", authSchema);
