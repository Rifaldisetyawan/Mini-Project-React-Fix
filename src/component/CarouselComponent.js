import React from 'react'
import { Carousel, Container } from 'react-bootstrap'

const CarouselComponent = () => {
  return (
    <Container fluid className='carousel'>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./assets/images/banner1.png"
            style={{'border-radius':'5px'}}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./assets/images/banner2.png"            
            style={{'border-radius':'5px'}}
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./assets/images/banner3.png"
            style={{'border-radius':'5px'}}
          />

        </Carousel.Item>
      </Carousel>
    </Container>

  )
}

export default CarouselComponent