import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import { Grid, Typography, Button, Card, CardContent, CardMedia, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import Navbar from '../components/navbar/Navbar';

function Wishlist() {
  const { wishItem, items, removeFromWishlist, url } = useContext(MyContext);
  const navigate = useNavigate();

  const handleBookNow = (item) => {
    navigate('/cardelivery', { state: { product: item } });
  };

  return (
    <>
    <Navbar/>
    <Box sx={{ padding: 2,    backgroundColor:'#e0e0e0' ,height:"100"
         }}>
     
      <Typography variant="h4" sx={{ marginBottom: 2 ,textAlign:'center' }}>YOUR WISHLIST </Typography>
      <Grid container spacing={2}>
        {items.map((item, index) => {
          if (item && wishItem[item._id] > 0) {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={`${url}/image/${item.image}`}
                    alt={item.name}
                    sx={{ height: 140 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.brand}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ₹{item.price}
                    </Typography>
                  </CardContent>
                  <Box sx={{ padding: 2 }}>
                    <Button variant="contained" color="secondary" onClick={() => removeFromWishlist(item._id)}>
                      Remove
                    </Button>
                    <Button variant="contained" color="secondary" sx={{ ml: 2 }} onClick={() => handleBookNow(item)}>
                      Book Now
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </Box>
    </>
  );
}

export default Wishlist;
