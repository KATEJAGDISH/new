import React, { useState, useContext } from 'react';
import { Tabs, Tab, Box, Typography, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import MyContext from '../../context/MyContext';
import img2 from '../../assets/BMW.png';
import img3 from '../../assets/mercedes.png';
import img4 from '../../assets/porsche.png';
import img5 from '../../assets/lamborghini.png';
import img6 from '../../assets/ferrari.png';
import { useNavigate } from 'react-router-dom';

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function DisplayCar() {
  const [value, setValue] = useState(0);
  const { items, url, addToWishlist } = useContext(MyContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterItemsByBrand = (brand) => {
    const lowerCaseBrand = brand.trim().toLowerCase();
    return items.filter(item => item.brand && item.brand.trim().toLowerCase() === lowerCaseBrand);
  };

  const brands = [
    { label: 'BMW', img: img2 },
    { label: 'Mercedes', img: img3 },
    { label: 'Porsche', img: img4 },
    { label: 'Lamborgini', img: img5 },
    { label: 'Ferrari', img: img6 },
  ];

  const navigate = useNavigate();

  const handleProductClick = (carname) => {
    navigate(`/carinfo/${encodeURIComponent(carname)}`);
  };
  
  const handleBookNow = (item) => {
    navigate('/cardelivery', { state: { product: item } });
  };



  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange}  indicatorColor='' textColor='' >
        <Tab label="All Brands" {...a11yProps(0)} />
        {brands.map((brand, index) => (
          <Tab
            key={index}
            label={brand.label}
            icon={<img src={brand.img} alt={brand.label} style={{ width: 60, height: 60, margin: 40 }} />}
            {...a11yProps(index + 1)}
          />
        ))}
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px solid #ccc', borderRadius: '14px' }}
                onClick={() => handleProductClick(item.name)}
              >
                <img
                  src={`${url}/image/${item.image}`}
                  style={{ width: '40%', maxWidth: 400, height: '300px', borderRadius: '4px', marginRight: 40 }}
                  alt={item.name}
                />
                <div>
                  <Typography variant="h6">
                    <b>{item.name}</b>
                  </Typography>
                  <Typography>
                    <b>Brand:</b> {item.brand}<br />
                    <b>Description:</b> {item.description}<br />
                    <b>Price:</b> {item.price}<br />
                  </Typography>
                  <Button
                    variant="outlined"
                      
                    color="primary"
                    sx={{ mt: 2 ,borderRadius: '10px'}}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(item._id);
                    }}
                  >
                    Add to WishList
                  </Button>
                  <Button variant="outlined"
                      
                      color="primary"
                      sx={{ mt: 2 ,borderRadius: '10px' , ml:1}}   onClick={()=>navigate('/cardlivery')}>
                    Book Now
                  </Button>
                </div>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CustomTabPanel>

      {brands.map((brand, index) => (
        <CustomTabPanel key={index + 1} value={value} index={index + 1}>
          <Grid container spacing={2}>
            {filterItemsByBrand(brand.label).map((item, idx) => (
              <Grid item xs={12} key={idx}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px solid #ccc', borderRadius: '14px' }}
                  onClick={() => handleProductClick(item.name)}
                >
                  <img
                    src={`${url}/image/${item.image}`}
                    style={{ width: '40%', maxWidth: 400, height: '300px', borderRadius: '4px', marginRight: 40 }}
                    alt={item.name}
                  />
                  <div>
                    <Typography variant="h6">
                      <b>{item.name}</b>
                    </Typography>
                    <Typography>
                      <b>Brand:</b> {item.brand}<br />
                      <b>Description:</b> {item.description}<br />
                      <b>Price:</b> {item.price}<br />
                    </Typography>
                    <Button
                      variant="outlined"
                      
                      color="primary"
                      sx={{ mt: 2 ,borderRadius: '10px'}}
                    
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(item._id);
                      }}
                    >
                      Add to WishList
                    </Button>
                    <Button variant="outlined"
                      
                      color="primary"
                      sx={{ mt: 2 ,borderRadius: '10px' , ml:1}} onClick={(e) => { e.stopPropagation(); handleBookNow(item); }}>
                      Book Now
                    </Button>
                  </div>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CustomTabPanel>
      ))}
    </Box>
  );
}

export default DisplayCar;
