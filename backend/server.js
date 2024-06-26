import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import carRouter from "./routes/carRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/CartRoute.js"

import 'dotenv/config'
import bookingRouter from "./routes/BookingRoute.js"
//app config

const app= express();
const port= process.env.PORT || 4000;

// middleware 

app.use(express.json());
app.use(cors());
// db connection
connectDB();

// ENDpoint API
app.use("/api/car",carRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/book",bookingRouter)

// Serve static files directly from the uploads directory
app.use('/image', express.static(`${process.cwd()}/uploads`));

app.get("/",(req,res)=>{
    res.send("api is working now")

});

app.listen(port,()=>{
    console.log(`Server  Started on http://localhost:${port} `)
});



