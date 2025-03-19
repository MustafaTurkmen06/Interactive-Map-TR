import React from 'react'
import rusevi from "./images/rusevi.png"
import turkeyFlag from "./images/turkeyFlag.svg"
import russiaFlag from "./images/russiaFlag.svg"

const Navbar = () => {
  return (
    <div>
      <nav className="navbar p-0 navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid ps-0">
          <a className="navbar-brand p-0 d-flex align-items-center" href="#">
            <img src={rusevi} style={{width:"10%", flexShrink:0}} alt="" />
            <span style={{display:'inline-block', width:'50%', marginLeft:'0.5rem'}}>
              <p className='fw-bold m-0' style={{fontSize:"12px"}}>Rus Evi Ankara / Русский дом</p>
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">Ana Sayfa</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">Türkiyedeki</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">İletişim</a>
              </li>
            </ul>
            <div className="d-flex gap-2 ms-auto me-3">
              <div className="dropdown">
                <button className="btn dropdown-toggle d-flex align-items-center gap-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={turkeyFlag} style={{width:"20px"}} alt="TR Bayrağı" /> 
                  TR
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item d-flex align-items-center gap-2" type="button">
                      <img src={turkeyFlag} style={{width:"20px"}} alt="TR Bayrağı" />
                      <span>TR</span>
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item d-flex align-items-center gap-2" type="button">
                      <img src={russiaFlag} style={{width:"20px"}} alt="RU Bayrağı" />
                      <span>RU</span>
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item d-flex align-items-center gap-2" type="button">
                      <img src="/path-to-english-flag.svg" style={{width:"20px"}} alt="" />
                      <span>KURMANÇİ</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar