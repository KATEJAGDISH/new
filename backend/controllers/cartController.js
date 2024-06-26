

import userModel from "../models/userModel.js";

// Add item to user's wishlist
const addTOWishlist = async (req, res) => { 
  try {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
    }

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartdata = userData.cartdata || {};

    if (!cartdata[itemId]) {
      cartdata[itemId] = 1;
    } else {
      cartdata[itemId] += 1;
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, { cartdata }, { new: true });

    res.json({ success: true, message: "Added to wishlist", updatedUser });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ success: false, message: "Error adding to wishlist" });
  }
};

// Remove item from user's wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
    }

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartdata = userData.cartdata || {};
    if (cartdata[itemId]) {
      delete cartdata[itemId];
      await userModel.findByIdAndUpdate(userId, { cartdata });
      res.json({ success: true, message: "Removed from wishlist" });
    } else {
      res.status(404).json({ success: false, message: "Item not found in wishlist" });
    }
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ success: false, message: "Error removing from wishlist" });
  }
};

// Get user's wishlist data
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, wishlist: userData.cartdata || {} });
  } catch (error) {
    console.error("Error getting wishlist:", error);
    res.status(500).json({ success: false, message: "Error getting wishlist" });
  }
};

export { addTOWishlist, removeFromWishlist, getWishlist };
