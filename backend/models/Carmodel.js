import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    name:{type:String,required:true},
    brand:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    fueltype:{type:String,required:true},
    bodytype:{type:String,required:true},
    topspeed:{type:String,required:true},
    enginetype:{type:String,required:true},
    transmission:{type:String,required:true},
    color:{type:String,required:true},

})

const carModel= mongoose.model.car || mongoose.model("car",carSchema);

export default carModel;