import React from 'react'
import './Navbar.css'
import menu from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search from '../../assets/search.png'
import upload from '../../assets/upload.png'
import more from '../../assets/more.png'
import notif from '../../assets/notification.png'
import profile from '../../assets/jack.png'
import { Link } from 'react-router-dom'



const Navbar = ({setSidebar}) => {
    return (
        <nav className='flex-div'>
            <div className="navl">
                <img src={menu} onClick={()=>setSidebar(prev=>prev===false?true:false)} className='menu' alt="" />
                <Link to="/"><img src={logo} className='logo' alt="" /></Link>
            </div>
            <div className="navm flexd">
                <div className="searchb flex-div">
                    <input type="text" placeholder='Search' />
                    <img src={search} alt="" />
                </div>
            </div>

            <div className="navr flexd">
                <img src={upload} alt="" />
                <img src={more} alt="" />
                <img src={notif} alt="" />
                <img src={profile} className='user' alt="" />
            </div>
        </nav>
    )
}

export default Navbar