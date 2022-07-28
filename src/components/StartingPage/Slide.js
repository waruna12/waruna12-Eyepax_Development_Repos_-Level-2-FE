import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { section } from "./../../data";
import { Link } from "react-router-dom";
// import classes from "./Slide.module.css";
import "./Slide.css";

function Slide(props) {
  const settings = {
    dots: true,
    infinite: false,
    // speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
  };

  return (
    <div className="slide">
      <h3 className="slide_header">Services</h3>
      <Slider {...settings}>
        {section.map((item) => (
          <div key={item.id} className="card">
            <div className="card-top">
              <img src={item.linkedImg} alt={item.title} />
              <h1>{item.title}</h1>
            </div>

            <div className="card-buttom">
              {/* <h3>{item.des}</h3> */}
              <Link
                to={{
                  pathname: `/${item.title}`,
                  state: { stateParam: true },
                }}
              >
                <button className="btn-style">Go Ahead</button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Slide;
