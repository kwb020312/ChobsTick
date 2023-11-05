import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  { timestamps: true }
);

const ChobsTick =
  mongoose.models.ChobsTick || mongoose.model("ChobsTick", ticketSchema);

export default ChobsTick;
