

import express from 'express';
import { addCar, listCar, removeCar } from '../controllers/carController.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const carRouter = express.Router();

// Ensure the uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Image storage configuration
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route for adding a car
carRouter.post('/add', upload.single('image'), addCar);
carRouter.get('/list', listCar);
carRouter.post('/remove', removeCar);

export default carRouter;

