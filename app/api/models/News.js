import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({

  title: String,
  subTitle: String,
  post: String,
  author: String,
  date: String,
  image: String,
});

export default mongoose.models.News || mongoose.model("News", NewsSchema);
