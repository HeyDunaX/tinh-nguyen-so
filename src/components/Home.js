import React from "react";
import { Container } from "react-bootstrap";
import bgImage from "../assets/Background_BDTN.jpg";
import charSplashSVG from "../assets/Layer_Background.svg";
import "../stylesheet/Home.css";

const Home = () => {
  return (
    <section id="home" className="hero-section">
      
      {/* Background */}
      <div
        className="hero-bg-layer"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-overlay-blue"></div>
      </div>

      <Container className="hero-content-fluid">
        <div className="hero-text-wrapper">

          {/* Subtitle + Slogan */}
          <div className="left-info-block">
            <h5 className="sub-title-label">CÔNG TRÌNH THANH NIÊN</h5>

            <div className="slogan-wrapper-left">
              <p className="slogan-text-final">
                Một hành trình dài bắt đầu từ <br />
                những bước đi nhỏ bé
              </p>
            </div>
          </div>

          {/* Main Titles */}
          <h1 className="title-fragment title-left">BẢN ĐỒ</h1>
          <h1 className="title-fragment title-right">TÌNH NGUYỆN</h1>

        </div>
      </Container>

      {/* Nhân vật trung tâm */}
      <div className="hero-main-character">
        <img
          src={charSplashSVG}
          alt="Volunteer"
          className="splash-svg-optimized"
        />
      </div>

    </section>
  );
};

export default Home;