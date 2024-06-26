import mongoose from "mongoose"



const bookingSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    items: { type: Array, require: true },
    price: { type: Number, require: true },
    userdata: { type: Object, require: true },
    status: { type: String, default: "car booked" },
    date: { type: Date, default: Date.now },
    payment: { type: Boolean, default: false }
});

const BookingModel = mongoose.models.book || mongoose.model("book", bookingSchema);
export default BookingModel;