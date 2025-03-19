import React from 'react';
import MiniNavbar from './MiniNavbar';

const Footer = () => {
  return (
    <footer className="footer-wrapper mt-5">
      <div className="container py-5">
        <div className="row g-4">
          {/* Site Info Column */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-content">
              <h3 className="footer-title">siteismi.com</h3>
              <p className="footer-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aspernatur, quod nostrum architecto aliquam odio veritatis fuga magnam laborum quo?</p>
              <hr className="footer-divider" />
              <h4 className="footer-subtitle">İletişim</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">
                  <i className="fa-solid fa-phone me-2"></i> telefon
                </a>
                <a href="#" className="footer-link">
                  <i className="fa-solid fa-envelope me-2"></i> siteismi.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-content">
              <h3 className="footer-title">Hızlı Bağlantılar</h3>
              <MiniNavbar />
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-content">
              <h3 className="footer-title">Bize Ulaşın</h3>
              <div className="footer-form">
                <div className="mb-3">
                  <input type="text" className="footer-input form-control" placeholder="Email" />
                </div>
                <div className="mb-3">
                  <textarea className="footer-input form-control" placeholder="Mesajınız" rows="3"></textarea>
                </div>
                <button className="footer-button">
                  <i className="fa-solid fa-paper-plane me-2"></i> Gönder
                </button>
              </div>
            </div>
          </div>

          {/* Latest News Column */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-content">
              <h3 className="footer-title">Son Haberler</h3>
              <div className="footer-news">
                <div className="news-item">
                  <h5 className="news-title">Son Gelişmeler</h5>
                  <p className="news-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, blanditiis.</p>
                  <span className="news-date">28 Şubat 2025</span>
                </div>
                <div className="news-item mt-3">
                  <h5 className="news-title">Güncel Duyurular</h5>
                  <p className="news-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <span className="news-date">25 Şubat 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="footer-bottom">
        <div className="container py-3">
        <p className="copyright-text mb-0 text-center">© 2025 siteismi.com. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;