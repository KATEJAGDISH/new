import React, { useContext, useState } from 'react';
import { Box, Typography, Grid, TextField, Button, Paper, CardMedia } from '@mui/material';
import { useLocation } from 'react-router';
import MyContext from '../context/MyContext';
import axios from 'axios';
import Navbar from '../components/navbar/Navbar';
import Login from '../login/Login';
function CarDelivery() {
  const location = useLocation();
  const product = location.state?.product || {};
  const { url, token } = useContext(MyContext); 


  const [ showLogin,setShowLogin]=useState(false)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  });

  const [validation, setValidation] = useState({
    firstName: true,
    lastName: true,
    email: true,
    street: true,
    city: true,
    state: true,
    pincode: true,
    country: true,
    phone: true
  });

  const onchangehandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setValidation(prevValidation => ({
      ...prevValidation,
      [name]: !!value
    }));
  };

  const handlePayment = async () => {
  
    const isValid = Object.values(validation).every(value => value);
    if (!isValid) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post(`${url}/api/book/deliver`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });

      if (response.data.success) {
       
        console.log('Booking created successfully:', response.data.bookingId);
        alert('Booking created successfully!');

      
      } else {
        console.error('Booking creation failed:', response.data.message);
        alert('Booking creation failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment');
    }
  };

  const price = product.price || 0;
  const sgst = (price * 0.06).toFixed(2);
  const cgst = (price * 0.06).toFixed(2);
  const serviceTax = (price * 0.05).toFixed(2);
  const totalPrice = (price + parseFloat(sgst) + parseFloat(cgst) + parseFloat(serviceTax)).toFixed(2);

  const bookingData = {
    userId: '',  
    items: [{ name: product.name, price: totalPrice, quantity: 1 }],
    price: totalPrice,
    userdata: data
  };

  return (
    <>{showLogin && <Login setShowLogin={setShowLogin} />}
        <Navbar setShowLogin={setShowLogin}  showLogin={showLogin} />
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 3 }}>
      <Typography variant="h3" gutterBottom  textAlign={'center'} >
        Delivery Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  size="small"
                  name='firstName'
                  value={data.firstName}
                  onChange={onchangehandler}
                  required
                  error={!validation.firstName} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  name='lastName'
                  value={data.lastName}
                  onChange={onchangehandler}
                  required
                  error={!validation.lastName} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  size="small"
                  type="email"
                  name='email'
                  value={data.email}
                  onChange={onchangehandler}
                  required
                  error={!validation.email} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  variant="outlined"
                  size="small"
                  name='street'
                  value={data.street}
                  onChange={onchangehandler}
                  required
                  error={!validation.street} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  size="small"
                  name='city'
                  value={data.city}
                  onChange={onchangehandler}
                  required
                  error={!validation.city} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  variant="outlined"
                  size="small"
                  name='state'
                  value={data.state}
                  onChange={onchangehandler}
                  required
                  error={!validation.state} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pin Code"
                  variant="outlined"
                  size="small"
                  name='pincode'
                  value={data.pincode}
                  onChange={onchangehandler}
                  required
                  error={!validation.pincode} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  variant="outlined"
                  size="small"
                  name='country'
                  value={data.country}
                  onChange={onchangehandler}
                  required
                  error={!validation.country} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  size="small"
                  name='phone'
                  value={data.phone}
                  onChange={onchangehandler}
                  required
                  error={!validation.phone} 
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: "auto" }}>
            {product.name ? (
              <Box>
                <CardMedia
                  component="img"
                  image={product.image ? `${url}/image/${product.image}` : 'default_image_url'}
                  alt={product.name}
                  sx={{ height: 250, mb: 2 }}
                />
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Price: ₹{price}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>SGST (6%): ₹{sgst}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>CGST (6%): ₹{cgst}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Service Tax (5%): ₹{serviceTax}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Price: ₹{totalPrice}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={handlePayment}
                >
                  Proceed to Booking
                </Button>
              </Box>
            ) : (
              <Typography variant="body1">No product selected</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

export default CarDelivery;
