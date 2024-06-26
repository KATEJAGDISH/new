import express from 'express';
import { addTOWishlist,removeFromWishlist,getWishlist } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';
const carRouter = express.Router();

carRouter.post("/addlist",authMiddleware, addTOWishlist);
carRouter.post("/remove",authMiddleware, removeFromWishlist);
carRouter.post("/get",authMiddleware, getWishlist);


export default carRouter;