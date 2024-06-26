import BookingModel from "../models/BookingModel.js";
import userModel from "../models/userModel.js";

// Function to create a new booking
const cardeliver = async (req, res) => {
    try {
        console.log("Request body:", req.body); // Log the request body for debugging

        const newBook = new BookingModel({
            userId: req.body.userId,
            items: req.body.items,
            price: req.body.price,
            userdata: req.body.userdata,
        });

        await newBook.save();
        console.log("Booking saved successfully:", newBook);

        // Example: Clear user's cart data 
        await userModel.findByIdAndUpdate(req.body.userId, { cartdata: {} });
        console.log("User cart data updated");

        // Example: Create line items for payment processing
        const Line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, 
            },
            quantity: item.quantity || 1, 
        }));

        console.log("Line items created:", Line_items);

        res.json({ success: true, bookingId: newBook._id }); 
    } catch (error) {
        console.error("Error in cardeliver function:", error);
        res.json({ success: false, message: "Booking creation failed: " + error.message });
    }
};

// Function to list all bookings
const listOfBooking = async (req, res) => {
    try {
        const bookings = await BookingModel.find({});
        res.json({ success: true, data: bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.json({ success: false, message: "Error fetching bookings: " + error.message });
    }
};

// Function to remove a booking by ID
const removeBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBooking = await BookingModel.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        res.json({ success: true, message: "Booking removed successfully" });
    } catch (error) {
        console.error("Error removing booking:", error);
        res.status(500).json({ success: false, message: "Error removing booking: " + error.message });
    }
};

// Function to update a booking statu
const updatestatus = async (req, res) => {
    try { 
        await BookingModel.findByIdAndUpdate(req.body.bookingId,{status:req.body.status});
        res.json({ success: true, message: "Booking updated successfully" });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.json({ success: false, message: "Error updating booking: "});
    }
};

export { cardeliver, listOfBooking, removeBooking, updatestatus};
