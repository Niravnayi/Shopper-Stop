import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const CarouselItem = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 5px;
  transition: width 0.3s ease-in-out;

  &.active {
    width: 20px;
    background-color: black;
  }
`;

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    const imageWidth = carousel.offsetWidth;
    carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  }, [currentIndex]);

  return (
    <div>
      <CarouselContainer className='mt-10'>
        <CarouselWrapper ref={carouselRef}>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
            </CarouselItem>
          ))}
        </CarouselWrapper>
      </CarouselContainer>
      <DotsContainer>
        {images.map((_, index) => (
          <Dot key={index} className={currentIndex === index ? 'active' : ''} />
        ))}
      </DotsContainer>
    </div>
  );
};

export default ImageCarousel;