/* eslint-disable @next/next/no-img-element */
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


import React from 'react'

const CarouselComponent = () => {
    return (
        <Carousel infiniteLoop={true}>
            <div>
                <img src="/path/to/image1.jpg" alt="Image 1" />
                <p className="legend">Legend 1</p>
            </div>
        </Carousel>
    )
}

export default CarouselComponent