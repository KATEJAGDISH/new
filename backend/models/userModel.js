import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartdata: { type: Object, default: {} },
}, { minimize: false });

const userModel = mongoose.model("User", userSchema);

export default userModel;
