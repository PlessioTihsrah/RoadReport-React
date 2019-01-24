import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: '1.jpg',
    altText: 'Slide 1',

  },
  {
    src: '2.jpg',
    altText: 'Slide 2',

  },
  {
    src: '3.jpg',
    altText: 'Slide 3',

  }
];

const Carousel = () => <UncontrolledCarousel items={items} indicators={false} />;

export default Carousel;
