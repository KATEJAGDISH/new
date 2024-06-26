

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import img1 from '../../assets/red-porsche-911-in-parking-lot-desktop-wallpaper-removebg-preview.png';
import img3 from '../../assets/red-ferrari-supercar-desktop-wallpaper-removebg-preview.png';
const Media = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Grid container spacing={2} sx={{ width: '1300px', height: '700px' }} /*xs={12} sm={10} m={15}*/>
        <Grid item xs={6} sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              position: 'absolute',
              top: '30%',
              left: '35%',
              transform: 'translate(-50%, -50%)',
              fontSize: '200px',
              zIndex: 1,
              color: 'black',
              marginTop:"30px",
              
            }}
          >
          Ferrari
          </Typography>
          <img
            src={img3}
            alt="Ferrari Car"
            style={{
              position: 'absolute',
              top: '68%',
              left: '35%',
              transform: 'translate(-50%, -50%)',
              height: '400px',
              zIndex: 2,
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
           
The Ferrari Stradale has 1 Petrol Engine on offer. The Petrol engine is 3990 cc . It is available with Automatic transmission.Depending upon the variant and fuel type the SF90 Stradale has a mileage of . The SF90 Stradale is a 2 seater 8 cylinder car and has length of 4710 mm, width of 1972 mm and a wheelbase of 2650 mm.

          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Special traditions stand the test of time: the heart of the 911 still beats at the rear – and sets the pulse of Porsche enthusiasts racing even faster than it did 60 years ago.
          Peak performance: 290 kW (394 PS). Top speed: 291 km/h. With this technical data, a maximum torque of 450 Nm and a sprint from 0 to 100 km/h in 4.3 s, it's highly unlikely that you will ever want to get out again.
          </Typography>
        </Grid>

        <Grid item xs={6} sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              position: 'absolute',
              top: '15%',
              left: '60%',
              transform: 'translate(-50%, -50%)',
              fontSize: '200px',
              zIndex: 1,
              color: 'black',
             
            }}
          >
            Porsche
          </Typography>
          <img
            src={img1}
            alt="Ferrari Car"
            style={{
              position: 'absolute',
              top: '60%',
              left: '55%',
              transform: 'translate(-50%, -50%)',
              height: '400px',
              zIndex: 2,
            }}
          />
        </Grid>
        
        
        
      </Grid>
      
    </Box>

    
  );
};

export default Media;

