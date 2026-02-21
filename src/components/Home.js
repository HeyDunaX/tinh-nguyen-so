import React from 'react';
import { Container } from 'react-bootstrap';
import bgImage from '../assets/Background_BDTN.jpg';
import charSplashSVG from '../assets/Layer_Background.svg'; // Tên file SVG của bạn
import '../stylesheet/Home.css';

const Home = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-layer" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="hero-overlay-blue"></div>
      </div>

      <Container className="hero-content-fluid">
        <div className="asymmetric-layout">
          
          {/* KHỐI TRÁI: Subtitle + BẢN ĐỒ + Slogan (Lấp khoảng trống) */}
          <div className="content-left-block">
            <h5 className="sub-title-label">Công trình thanh niên</h5>
            <h1 className="title-fragment top-left">BẢN ĐỒ</h1>
            
            <div className="slogan-wrapper-left">
              <p className="slogan-text-final">
                Một hành trình dài bắt đầu từ <br/> những bước đi nhỏ bé
              </p>
            </div>
          </div>

          {/* KHỐI PHẢI: TÌNH NGUYỆN */}
          <div className="content-right-block">
            <h1 className="title-fragment bottom-right">TÌNH NGUYỆN</h1>
          </div>

        </div>
      </Container>
      
      {/* Nhân vật trung tâm giữ nguyên vị trí để làm trục chia */}
      <div className="hero-main-character">
        <img src={charSplashSVG} alt="Volunteer" className="splash-svg-optimized" />
      </div>
    </section>
  );
}

export default Home;