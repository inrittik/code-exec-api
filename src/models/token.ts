import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  tokenValue: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Token", tokenSchema);
