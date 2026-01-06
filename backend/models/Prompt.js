import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema(
  {
    prompt: String,
    response: String,
  },
  { timestamps: true }
);

export default mongoose.model("Prompt", PromptSchema);
