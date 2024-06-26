

import carModel from '../models/Carmodel.js';
import fs from 'fs';
import path from 'path';

// Add car items
const addCar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    let image_filename = `${req.file.filename}`;

    const car = new carModel({
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      price: req.body.price,
      image: image_filename,
      fueltype: req.body.fueltype,
      bodytype: req.body.bodytype,
      topspeed: req.body.topspeed,
      enginetype: req.body.enginetype,
      transmission: req.body.transmission,
      color: req.body.color
    });

    await car.save();
    res.json({ success: true, message: 'Car added' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error' });
  }
};

// List of cars
const listCar = async (req, res) => {
  try {
    const cars = await carModel.find({});
    res.json({ success: true, data: cars });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error' });
  }
};

// Delete car item
const removeCar = async (req, res) => {
  try {
    const car = await carModel.findById(req.body.id);
    if (car) {
      const imagePath = path.join(process.cwd(), 'uploads', car.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.log(err);
      });

      await carModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: 'Car removed' });
    } else {
      res.status(404).json({ success: false, message: 'Car not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error' });
  }
};

export { addCar, listCar, removeCar };
