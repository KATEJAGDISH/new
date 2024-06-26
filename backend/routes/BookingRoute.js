
import express from "express";
import authMiddleware from "../middleware/auth.js";
import { cardeliver, listOfBooking, updatestatus } from "../controllers/BookingController.js";

const bookingRouter = express.Router();
bookingRouter.post("/deliver", authMiddleware, cardeliver);
bookingRouter.get('/list',listOfBooking)
bookingRouter.post('/status',updatestatus);
export default bookingRouter;
