import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

//Carousel slider for product
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

interface AddressCarouselProps {
  images: string[];
}

const Carousel = ({ images }: AddressCarouselProps) => {
  const [state, setState] = React.useState<any>({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  const landingImage = images && images.length > 0 ? images[0] : undefined;

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  const { nav1, nav2 } = state;
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 5,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    centerMode: true,
    className: 'centerThumb',
    speed: 500,
    adaptiveHeight: true,
  };

  return (
    <Box width={'100%'}>
      {!images || images?.length === 0 ? ( // Check if images array is empty
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100px',
          }}
        >
          <ImageNotSupportedIcon></ImageNotSupportedIcon> No images
          {/* Replace IconComponent with your icon */}
        </div>
      ) : (
        <div>
          <Slider
            asNavFor={nav2}
            ref={(slider: any) => (slider1.current = slider)}
          >
            <Box>
              <img
                src={landingImage}
                alt={''}
                width="100%"
                height={'auto'}
                style={{ borderRadius: '5px', objectFit: 'cover' }}
              />
            </Box>
            {images.map((image, index) => (
              <Box key={index}>
                <img
                  src={image}
                  alt={''}
                  width="100%"
                  style={{ borderRadius: '5px' }}
                />
              </Box>
            ))}
          </Slider>
          <Slider
            asNavFor={nav1}
            ref={(slider: any) => (slider2.current = slider)}
            {...settings}
          >
            <Box sx={{ p: 1, cursor: 'pointer' }}>
              <img
                src={landingImage}
                alt={''}
                width="100%"
                style={{ borderRadius: '5px' }}
              />
            </Box>
            {images.map((image, index) => (
              <Box key={index} sx={{ p: 1, cursor: 'pointer' }}>
                <img
                  src={image}
                  alt={''}
                  width="100%"
                  style={{ borderRadius: '5px' }}
                />
              </Box>
            ))}
          </Slider>
        </div>
      )}
    </Box>
  );
};

export default Carousel;
