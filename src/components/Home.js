import React from "react";
import { Container } from "react-bootstrap";
import bgImage from "../assets/Background_BDTN.jpg";
import charSplashSVG from "../assets/Layer_Background.svg";
import "../stylesheet/Home.css";

const Home = () => {
  return (
    <section id="home" className="hero-section">

      <div
        className="hero-bg-layer"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-overlay-blue"></div>
      </div>

      <Container className="hero-content-fluid">
        <div className="hero-layout">

          {/* LEFT INFO */}
          <div className="info-block">
            <h5 className="sub-title">CÔNG TRÌNH THANH NIÊN</h5>

            <div className="slogan-block">
              <p>
                Một hành trình dài bắt đầu từ <br />
                những bước đi nhỏ bé
              </p>
            </div>
          </div>

          {/* TITLE CENTERED BLOCK */}
          <div className="title-wrapper">
            <h1 className="title-top">BẢN ĐỒ</h1>
            <h1 className="title-bottom">TÌNH NGUYỆN</h1>
          </div>

        </div>
      </Container>

      <div className="hero-main-character">
        <img src={charSplashSVG} alt="Volunteer" />
      </div>

    </section>
  );
};

export default Home;