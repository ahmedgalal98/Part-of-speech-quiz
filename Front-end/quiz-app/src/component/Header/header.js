import React from 'react'
import logo from '../../assets/logo.png'
import './header.css'

function Header() {
return (
    <>
    <div className="header">
    <img className='logo' src={logo} width={150} height={120} alt="logo" />
    <h1 className='title'>nagwa</h1>
    </div>
    </>
)
}

export default Header