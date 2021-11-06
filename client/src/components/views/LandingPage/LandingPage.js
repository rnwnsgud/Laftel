import React, { useEffect } from "react";
import axios from "axios";
import { Carousel, Button } from "react-bootstrap";

function LandingPage() {
  return (
    <>
      <div className="carousel_cotainer">
        <Carousel className="carousel">
          <Carousel.Item interval={5000} className="carousel_item_1">
            <Carousel.Caption className="carousel_label">
              <h3>빙과</h3>
              <p>소소한 일상에서의 추리물</p>
              <a href="product/61840833ebb5690dd92dd7af">
                <Button variant="light">보러가기 &nbsp; {" > "}</Button>
              </a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000} className="carousel_item_2">
            <Carousel.Caption className="carousel_label">
              <h3>장난을 잘 치는 타카기양</h3>
              <p>풋풋한 시절의 로맨스</p>
              <a href="product/61840870ebb5690dd92dd7bb">
                <Button variant="light">보러가기 &nbsp; {" > "}</Button>
              </a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000} className="carousel_item_3">
            <Carousel.Caption className="carousel_label">
              <h3>바이올렛 에버가든</h3>
              <p>자동수기인형서비스</p>
              <a href="product/61840671ebb5690dd92dd78c">
                <Button variant="light">보러가기 &nbsp; {" > "}</Button>
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="cotainer"></div>
    </>
  );
}

export default LandingPage;
