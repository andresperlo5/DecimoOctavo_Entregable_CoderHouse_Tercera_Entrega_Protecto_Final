import React from 'react'
import NavbarHome from '../Components/NavbarHome'
import '../css/home.css'
function HomePages() {
    return (
        <div className='overflowY'>
            <NavbarHome />
            <div>
                <img className='imgBodyHome' src="https://res.cloudinary.com/dbb9coys1/image/upload/v1635991983/WhatsApp_Image_2021-11-03_at_19.49.41_r47e6i.jpg" alt="" />
            </div>

        </div>
    )
}

export default HomePages;