import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("db connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};
