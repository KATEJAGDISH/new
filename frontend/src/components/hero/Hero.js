import React, { useState } from 'react';
import { Box, Grid, IconButton } from '@mui/material';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import video1 from "../../assets/WhatsApp Video 2024-06-21 at 00.00.58_fd18cd14.mp4";
import video2 from "../../assets/WhatsApp Video 2024-06-21 at 11.28.42_356eb624.mp4";
import video3 from "../../assets/WhatsApp Video 2024-06-21 at 11.29.40_4b31ecfd.mp4";
import video4 from "../../assets/Untitled video - Made with Clipchamp.mp4";
import video5 from "../../assets/bmw.mp4";
import video6 from "../../assets/mercedes-GLS.mp4";
import img1 from "../../assets/red-porsche-911-in-parking-lot-desktop-wallpaper-removebg-preview.png";
import img2 from "../../assets/lamborghini-huracan-removebg-preview.png";
import img3 from "../../assets/red-ferrari-supercar-desktop-wallpaper-removebg-preview.png";
import img4 from "../../assets/Stage_presenation111-removebg-preview.png";
import img5 from "../../assets/mercedes-GLS-400d-removebg-preview.png";
import img6 from "../../assets/lamborghini-huracan-removebg-preview.png";

const videos = [
  {
    src: video1,
    title: 'Video 1',
  },
  {
    src: video2,
    title: 'Video 2',
  },
  {
    src: video3,
    title: 'Video 3',
  },
  {
    src: video4,
    title: 'Video 4',
  },
  {
    src: video5,
    title: 'Video 5',
  },
  {
    src: video6,
    title: 'Video 6',
  },
];

const images = [
  {
    src: img1,
    alt: 'Thumbnail 1',
  },
  {
    src: img2,
    alt: 'Thumbnail 2',
  },
  {
    src: img3,
    alt: 'Thumbnail 3',
  },
  {
    src: img4,
    alt: 'Thumbnail 4',
  },
  {
    src: img5,
    alt: 'Thumbnail 5',
  },
  {
    src: img6,
    alt: 'Thumbnail 6',
  },
];

const VideoCarousel = ({ videos }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedVideoIndex(index);
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: '0 auto', mt: 0, position: 'relative' }}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        selectedItem={selectedVideoIndex}
        onChange={(index) => setSelectedVideoIndex(index)}
      >
        {videos.map((video, index) => (
          <div key={index}>
            <video width="100%" autoPlay loop muted playsInline style={{ height: '630px', objectFit: 'cover' }}>
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </Carousel>
      <Grid container justifyContent="center" sx={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
        {images.slice(selectedVideoIndex - 1, selectedVideoIndex +2).map((img, index) => (
          <Grid item key={index} sx={{ marginX: 1 }}>
            <IconButton onClick={() => handleThumbnailClick(index + selectedVideoIndex - 1)} sx={{ padding: 0, border: index === 1 ? '5px solid #fff9c4 ' : 'none',borderRadius:"16px" }}>
              <img src={img.src} alt={img.alt} height="40px" />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Hero = () => {
  return (
    <Box>
      <VideoCarousel videos={videos} />
    </Box>
  );
};

export default Hero;