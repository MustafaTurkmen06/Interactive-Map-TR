import React from 'react';

const MiniNavbar = () => {
  return (
    <div className="mini-navbar">
      <div className="mini-nav-container">
        {/* First Column */}
        <div className="mini-nav-column">
          <h5 className="mini-nav-title">Kurumsal</h5>
          <ul className="mini-nav-list">
            <li className="mini-nav-item">
              <a href="#" className="mini-nav-link">Hakkımızda</a>
            </li>
            <li className="mini-nav-item">
              <a href="#" className="mini-nav-link">Vizyon & Misyon</a>
            </li>
            <li className="mini-nav-item">
              <a href="#" className="mini-nav-link">Ekibimiz</a>₺
            </li>
            <li className="mini-nav-item">
              <a href="#" className="mini-nav-link">Referanslar</a>
            </li>
          </ul>
        </div>

        {/* Second Column */}
        <div className="mini-nav-column">
          <h5 className="mini-nav-title">Hizmetler</h5>
          <ul className="mini-nav-list">
            <li className="mini-nav-item">
              <a href="#" className="mini-nav-link">Danışmanlık</a>
            </li>
            <li className="mini-nav-item">
              <a href="#" className="mini-nav-link">Eğitimler</a>
            </li>
            <li className="mini-nav-item">
              <a href="#" className="mini-nav-link">Projeler</a>
            </li>
            <li className="mini-nav-item">
              <a href="#" className="mini-nav-link">İş Ortaklıkları</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MiniNavbar;