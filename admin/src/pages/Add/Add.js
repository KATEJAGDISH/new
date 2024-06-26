import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Grid
} from '@mui/material';
import { styled } from '@mui/system';


const Input = styled('input')({
  display: 'none',
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: 'black',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  margin: '10px 0',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: '10px 0',
  '& label.Mui-focused': {
    color: '#4A148C',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4A148C',
  },
}));

function Add() {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    fueltype: "petrol",
    bodytype: "Sedan",
    topspeed: "",
    enginetype: "",
    transmission: "automatic",
    color: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("brand", data.brand);
    formData.append("price", Number(data.price));
    formData.append("fueltype", data.fueltype);
    formData.append("bodytype", data.bodytype);
    formData.append("topspeed", data.topspeed);
    formData.append("enginetype", data.enginetype);
    formData.append("transmission", data.transmission);
    formData.append("color", data.color);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/car/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          brand: "",
          description: "",
          price: "",
          fueltype: "petrol",
          bodytype: "Sedan",
          topspeed: "",
          enginetype: "",
          transmission: "automatic",
          color: "",
        });
        setImage(null);
        toast.success(response.data.Message);
      }
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Failed to add car. Please try again.");
    }
  };

  return (
  
    <Box sx={{ flexGrow: 1, p: 4, backgroundColor: '#F3F4F6' }}>
      <ToastContainer />
   
      <Typography variant="h4" gutterBottom sx={{ color: '#546e7a', fontWeight: 'bold' }}>
        Add a New Car
      </Typography>
      <form onSubmit={onSubmitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ color: '#546e7a' }}>Upload Image</Typography>
            <label htmlFor="image">
              <Input
                accept="image/*"
                id="image"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
              <StyledButton variant="outlined" component="span"  >
                Upload
              </StyledButton>
              {image && (
                <Box mt={2}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="img"
                    style={{ width: "200px", height: "200px", borderRadius: '10px' }}
                  />
                </Box>
              )}
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Car Name"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          </Grid>
        
           <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ margin: '10px 0' }}>
              <InputLabel id="Brand Name" sx={{ color: '#546e7a' }}>Brand Name</InputLabel>
              <Select
                labelId="fueltype-label"
                name="brand"
                value={data.brand}
                onChange={onChangeHandler}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#546e7a',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6A1B9A',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4A148C',
                  },
                }}
              >
                <MenuItem value="BMW">BMW</MenuItem>
                <MenuItem value="MERCEDES">MERCEDES</MenuItem>
                <MenuItem value="PORSCHE">PORSCHE</MenuItem>
                <MenuItem value="LAMBORGINI">LAMBORGINI</MenuItem>
                <MenuItem value="FERRARI">FERRARI</MenuItem>
              </Select>
            </FormControl>
          </Grid>
 

          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              label="Description"
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ margin: '10px 0' }}>
              <InputLabel id="fueltype-label" sx={{ color: '#546e7a' }}>Fuel Type</InputLabel>
              <Select
                labelId="fueltype-label"
                name="fueltype"
                value={data.fueltype}
                onChange={onChangeHandler}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#546e7a',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6A1B9A',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#546e7a',
                  },
                }}
              >
                <MenuItem value="petrol">Petrol</MenuItem>
                <MenuItem value="diesel">Diesel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ margin: '10px 0' }}>
              <InputLabel id="bodytype-label" sx={{ color: '#546e7a' }}>Body Type</InputLabel>
              <Select
                labelId="bodytype-label"
                name="bodytype"
                value={data.bodytype}
                onChange={onChangeHandler}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#546e7a',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6A1B9A',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#546e7a',
                  },
                }}
              >
                <MenuItem value="Sedan">Sedan</MenuItem>
                <MenuItem value="SUV">SUV</MenuItem>
                <MenuItem value="Convertible">Convertible</MenuItem>
                <MenuItem value="Coupe">Coupe</MenuItem>
                <MenuItem value="Wagon">Wagon</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ margin: '10px 0' }}>
              <InputLabel id="transmission-label" sx={{ color: '#546e7a' }}>Transmission</InputLabel>
              <Select
                labelId="transmission-label"
                name="transmission"
                value={data.transmission}
                onChange={onChangeHandler}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#546e7a',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6A1B9A',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#546e7a',
                  },
                }}
              >
                <MenuItem value="automatic">Automatic</MenuItem>
                <MenuItem value="manual">Manual</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={data.price}
              onChange={onChangeHandler}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Top Speed"
              name="topspeed"
              value={data.topspeed}
              onChange={onChangeHandler}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Engine Type"
              name="enginetype"
              value={data.enginetype}
              onChange={onChangeHandler}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Color"
              name="color"
              value={data.color}
              onChange={onChangeHandler}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <StyledButton type="submit" variant="outlined">
              Add Car
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default Add;
