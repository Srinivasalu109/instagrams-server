import { Schema } from "mongoose";
import mongoose from "mongoose";
const CommnetSchema = new Schema({
  msgID: String,
  msg: String,
});
const PostSchema = new Schema({
  imageURL: { type: String },
  likes: { type: Number },
  time: { type: Date },
  comments: { type: [CommnetSchema] },
});
const allPostsScheme = new Schema({
  postDetails: { type: [PostSchema] },
});
const Posts = mongoose.model("allPostsScheme", allPostsScheme);
export default Posts;
