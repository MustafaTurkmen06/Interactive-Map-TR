import React from 'react'
import turkeyHigh from "./images/fly.png"
// import rusevi from "./images/rusevi.png"
import matrushka from "./images/matrushka.png"
import decoration from "./images/homepage-offer-decoration.svg"
import ornekDergi from "./images/ornekDergi.jpg"
import ruseviBina from "./images/ruseviBina.jpg"
import blogOrnek from "./images/aaa.webp"
const MainPage = () => {
  return (
    <div>
     <div className='w-100 py-5 overflow-hidden mainPageFirst position-relative' style={{backgroundColor:"#e2e9ff"}}>
     <div className='container px-5 pt-5 pb-5 '>
        <div className='row g-0 px-3'>
            <div className='col-lg'>
            <h1 className='mainBaslik'>Rusya’da yüksek öğrenim: giriş, eğitim, kariyer</h1>
                <div className='gradient-text'>
                  <div className='d-flex '>
                <h3 className='baslikAlt'>Хочешь учиться в России?</h3>
                <img src={decoration} className='mt-2' style={{width:"20%"}} alt="" />
                <h6 className='baslikAlt'>Выбери университет</h6>
                  </div>
                </div>  
                <div className='d-flex gap-2'>
                <a href="" className='btn rusEviButton pe-5 tgButton' style={{paddingLeft:"2.2rem"}}>Rusevi</a>
                <a href="" className='btn tgButton'>Telegram <i class="fa-brands fa-telegram"></i></a>
                </div>
            </div>
            <div className='col-lg'>
            <img src={turkeyHigh} className='turkeyMapMain' style={{width:"120%"}} alt="" />
            </div>
        </div>
        
      </div>
      <div class="position-absolute bottom-0 start-25 ms-5">
        <img src={matrushka} alt="" style={{width:"15%"}}/>
        </div>
        <div class="position-absolute top-0 end-0 me-5 rotateMat">
        <img src={matrushka} alt="" style={{width:"15%"}}/>
        </div>
        {/* dergiler */}
        <div className='container mt-5 px-5'>
          <div className='d-flex px-3 justify-content-between w-100'>
          <h2 className='normalBaslik'>Rus Evi Ankara Dergisi</h2>
          <button className='btn dergiButton px-3 py-2'>Tüm Sayılar <i className="fa-solid fa-arrow-right"></i></button>
          </div>
          {/* dergi row and col */}
          <div className='row mt-4 px-3 gap-5'>
          <a href="" className="text-decoration-none w-auto">
          <div className="col-lg">
            <div className="card border-0 cardBoxDergi bg-transparent" style={{ width: "15rem" }}>
              <div className="cardDergiImgWrapper">
                <img src={ornekDergi} className="card-img-top cardDergiImg" alt="..." />
              </div>
              <div className="card-body">
                <h5 className="card-title text-center dergiCardText">Martin Eden Dergisi</h5>
              </div>
            </div>
          </div>
           </a>
           <a href="" className="text-decoration-none w-auto">
          <div className="col-lg">
            <div className="card border-0 cardBoxDergi bg-transparent" style={{ width: "15rem" }}>
              <div className="cardDergiImgWrapper">
                <img src={ornekDergi} className="card-img-top cardDergiImg" alt="..." />
              </div>
              <div className="card-body">
                <h5 className="card-title text-center dergiCardText">Martin Eden Dergisi</h5>
              </div>
            </div>
          </div>
           </a>
           <a href="" className="text-decoration-none w-auto">
          <div className="col-lg">
            <div className="card border-0 cardBoxDergi bg-transparent" style={{ width: "15rem" }}>
              <div className="cardDergiImgWrapper">
                <img src={ornekDergi} className="card-img-top cardDergiImg" alt="..." />
              </div>
              <div className="card-body">
                <h5 className="card-title text-center dergiCardText">Martin Eden Dergisi</h5>
              </div>
            </div>
          </div>
           </a>
          </div>
        </div>
     </div>
     <div className='container mt-5 px-5'>
     <div className='d-flex px-3 justify-content-between w-100'>
          <h2 className='normalBaslik'>Bazı Kurumları Tanıyın!</h2>
          <button className='btn dergiButton px-3 py-2'>Tüm Kurumlar <i className="fa-solid fa-arrow-right"></i></button>
          </div>
          <div className='row px-3 pt-4 g-5'>
        <div className='col-lg-4'> 
          <div className='kurumCard'>
            <a href="">
              <img src={ruseviBina} className='rounded-4' alt="" />
              <div className='photo-dark-overlay'></div>
              <div className='kurumCard-content'>
                <div className='custom-fit p-2 d-inline-block ms-2'>
                  <p className='d-inline'>Konsolosluk</p>
                </div>
                <div className='kurumCardYazilar'> 
                  <h5>İstanbul Başkonsolusluğu</h5>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis perferendis labore velit repellat sit harum nisi praesentium, aspernatur asperiores.</p>
                  <a href="" className='btn kurumButton'>Kurumu Görün!</a>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className='col-lg-4'> 
          <div className='kurumCard'>
            <a href="">
              <img src={ruseviBina} className='rounded-4' alt="" />
              <div className='photo-dark-overlay'></div>
              <div className='kurumCard-content'>
                <div className='custom-fit p-2 d-inline-block ms-2'>
                  <p className='d-inline'>Konsolosluk</p>
                </div>
                <div className='kurumCardYazilar'> 
                  <h5>İstanbul Başkonsolusluğu</h5>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis perferendis labore velit repellat sit harum nisi praesentium, aspernatur asperiores.</p>
                  <a href="" className='btn kurumButton'>Kurumu Görün!</a>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className='col-lg-4'> 
          <div className='kurumCard'>
            <a href="">
              <img src={ornekDergi} className='rounded-4' alt="" />
              <div className='photo-dark-overlay'></div>
              <div className='kurumCard-content'>
                <div className='custom-fit p-2 d-inline-block ms-2'>
                  <p className='d-inline'>Konsolosluk</p>
                </div>
                <div className='kurumCardYazilar'> 
                  <h5>İstanbul Başkonsolusluğu</h5>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis perferendis labore velit repellat sit harum nisi praesentium, aspernatur asperiores.</p>
                  <a href="" className='btn kurumButton'>Kurumu Görün!</a>
                </div>
              </div>
            </a>
          </div>
        </div>
</div>
      </div>
      <div className='container mt-5 px-5 '>
     <div className='d-flex px-3 justify-content-between w-100'>
          <h2 className='normalBaslik'>Bizden Haberler</h2>
          <button className='btn dergiButton px-3 py-2'>Tüm Kurumlar <i className="fa-solid fa-arrow-right"></i></button> 
          </div>
          <div className="row g-4 mt-1">
      {/* Main Featured Post - Left Side */}
      <a href="" className='col-lg-7 text-decoration-none'>
      <div className="">
        <div className="featured-post">
          <div className="featured-image-wrapper">
            <img src={blogOrnek} className="featured-image" alt="Featured blog post" />
            <div className="category-badge">
              <p className="m-0">IT Alanı</p>
            </div>
          </div>
          
          <div className="featured-content">
            <div className="post-meta mb-3">16 Haziran 2006</div>
            <h2 className="post-title">How Tech Shapes the Future of Work in 2024</h2>
            <p className="post-excerpt">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere enim nibh, eu condimentum erat varius non varius non...
            </p>
          </div>
        </div>
      </div>
      </a>
      
      {/* Right Side Posts */}
      <div className="col-lg-5">
        {/* First Right Post */}
        <a href="" className='text-decoration-none'>
        <div className="side-post mb-3">
          <div className="row g-0">
            <div className="col-7">
              <div className="side-post-content">
                <div className="post-meta mb-1">16 Haziran 2006</div>
                <h3 className="side-post-title">How Tech Shapes the Future of Work in 2024</h3>
                <p className="side-post-excerpt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere enim nibh...
                </p>
                <div className="category-badge-small">
                  <p className="m-0">IT Alanı</p>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="side-image-wrapper">
                <img src={blogOrnek} className="side-image" alt="Blog post" />
              </div>
            </div>
          </div>
        </div>
        </a>
        <a href="" className='text-decoration-none'>
        <div className="side-post mb-3">
          <div className="row g-0">
            <div className="col-7">
              <div className="side-post-content">
                <div className="post-meta mb-1">16 Haziran 2006</div>
                <h3 className="side-post-title">How Tech Shapes the Future of Work in 2024</h3>
                <p className="side-post-excerpt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere enim nibh...
                </p>
                <div className="category-badge-small">
                  <p className="m-0">IT Alanı</p>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="side-image-wrapper">
                <img src={blogOrnek} className="side-image" alt="Blog post" />
              </div>
            </div>
          </div>
        </div>
        </a>
        <a href="" className='text-decoration-none'>
        <div className="side-post mb-3">
          <div className="row g-0">
            <div className="col-7">
              <div className="side-post-content">
                <div className="post-meta mb-1">16 Haziran 2006</div>
                <h3 className="side-post-title">How Tech Shapes the Future of Work in 2024</h3>
                <p className="side-post-excerpt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere enim nibh...
                </p>
                <div className="category-badge-small">
                  <p className="m-0">IT Alanı</p>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="side-image-wrapper">
                <img src={blogOrnek} className="side-image" alt="Blog post" />
              </div>
            </div>
          </div>
        </div>
        </a>
      </div>
    </div>
        </div>
    </div>
  )
}

export default MainPage
