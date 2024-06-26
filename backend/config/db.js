import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://jagdishkate8080:8424013789@cluster0.oahbtul.mongodb.net/cars', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("db connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};
