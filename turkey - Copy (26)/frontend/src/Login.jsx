import React from 'react'
import matrushka from "./images/matrushka.png"
const Login = () => {
  return (
   <div className='w-100 position-relative'>
     <div className='container'>
        <div className='d-flex justify-content-center align-items-center w-100 vh-100'>
        <div className='w-50 p-5 shadow-lg  rounded-4'>
                <h3 className='text-center'>Login Sayfası</h3>
                <form action="" className='w-75 py-4 mx-auto'>
                    <label htmlFor="kullaniciAdi" style={{fontWeight:"500"}}>Kullanıcı Adı</label>
                    <input type="text" className='form-control mt-3 p-3 rounded-4' id='kullaniciAdi' placeholder='Kullanıcı Adı'/>
                    <label htmlFor="sifre" className='mt-4' style={{fontWeight:"500"}}>Şifre</label>
                    <input type="text" className='form-control mt-3 p-3 rounded-4' id='sifre' placeholder="Şifre"/>
                    <div className='mt-4 text-center'>
                    <button className='btn btn-outline-dark text-center'>Giriş Yap</button>
                    <button className='btn btn-outline-dark text-center ms-3'>Geri Dön</button>

                    <a href="https://www.emirkesimoglu.net.tr" target='_blank' className='btn ms-3 btn-outline-dark'>Tasarımcıyı Ziyaret Et!</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="position-absolute bottom-0 start-25 ms-5">
            <img src={matrushka} alt="" style={{width:"15%"}}/>
    </div>
    <div class="position-absolute top-0 end-0 me-5 rotateMat">
            <img src={matrushka} alt="" style={{width:"15%"}}/>
            </div>
   </div>
  )
}

export default Login
