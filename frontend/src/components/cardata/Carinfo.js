import React, { useContext ,useState } from 'react';
import MyContext from '../../context/MyContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Box } from '@mui/material';
import Navbar from "../navbar/Navbar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Login from '../../login/Login';
function Carinfo() {
  const { items, url, addToWishlist } = useContext(MyContext);
  const { name } = useParams();
  const navigate = useNavigate();
  const selectedItem = items.find(item => item.name === name);
  const [ showLogin,setShowLogin]=useState(false)
  const handleBookNow = (item) => {
    navigate('/cardelivery', { state: { product: item } });
  };

  if (!selectedItem) {
    return <div>Product not found</div>; 
  }

  return (
    <> {showLogin && <Login setShowLogin={setShowLogin} />}
        <Navbar setShowLogin={setShowLogin}  showLogin={showLogin} />
      <Grid container spacing={2} sx={{ backgroundColor: "#cfd8dc", height: "100%" ,mt:0 }}>
        <Grid item xs={12} md={6} mt={3} ml={0}>
          <Box sx={{ textAlign: 'center' }}>
            <img src={`${url}/image/${selectedItem.image}`} alt={selectedItem.name} style={{ maxWidth: '100%', height: '600px', borderRadius: '8px' }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} mt={2}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {selectedItem.name}
            </Typography>
            <Typography >
              {selectedItem.description}<br /><br />
              <b>Price: ₹</b>{selectedItem.price}<br />
            </Typography>
            <Button  variant="outlined"
                      
                      color="primary" sx={{ mt: 2 }} onClick={() => addToWishlist(selectedItem._id)}>
              <FavoriteIcon />
              Add to WishList
            </Button>
            <Button  variant="outlined"
                      
                      color="primary" sx={{ mt: 2, ml: 1 }} onClick={() => handleBookNow(selectedItem)}>
              Book Now
            </Button>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h5" >Additional Details:</Typography>
              <br/>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography fontStyle={'oblique'}><b>Fuel Type:</b> {selectedItem.fueltype}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontStyle={'oblique'}><b>Body Type:</b> {selectedItem.bodytype}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontStyle={'oblique'}><b>Top Speed:</b> {selectedItem.topspeed}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontStyle={'oblique'}><b>Engine Type:</b> {selectedItem.enginetype}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontStyle={'oblique'}><b>Transmission:</b> {selectedItem.transmission}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontStyle={'oblique'}><b>Color:</b> {selectedItem.color}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Carinfo;
