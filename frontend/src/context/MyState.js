

import React, { useState, useEffect } from "react";
import MyContext from "./MyContext";
import axios from "axios";

function MyState({ children }) {
  const [items, setItems] = useState([]);
  const [wishItem, setWishItem] = useState({});
  const [wishlistCount, setWishlistCount] = useState(0);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(""); // Added userId state
  const url = "http://localhost:4000";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/api/car/list`)
      .then((response) => {
        setItems(response.data.data); // Update items  data array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addToWishlist = async (id) => {
    try {
      setWishItem((prev) => {
        const updated = { ...prev, [id]: (prev[id] || 0) + 1 };
        return updated;
      });
      setWishlistCount((prevCount) => prevCount + 1);

      if (token) {
        await axios.post(`${url}/api/cart/addlist`, { userId, itemId: id }, { headers: { Authorization: `Bearer ${token}` } });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      setWishItem((prevWishItem) => {
        const newWishItem = { ...prevWishItem };
        if (newWishItem[itemId] > 0) {
          newWishItem[itemId] -= 1;
          setWishlistCount((prevCount) => prevCount - 1);
        }

        if (newWishItem[itemId] === 0) {
          delete newWishItem[itemId];
        }

        return newWishItem;
      });

      if (token) {
        await axios.post(`${url}/api/cart/remove`, { userId, itemId }, { headers: { Authorization: `Bearer ${token}` } });
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const contextValue = {
    items,
    wishItem,
    addToWishlist,
    removeFromWishlist,
    wishlistCount,
    url,
    token,
    setToken,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
