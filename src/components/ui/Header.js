import React from 'react'
import logo from '../../img/logo.png'

const Header = () => {
    return (
        <header className='center'>
            <img src={logo} alt='' className='pokeLogo' />
        </header>
    )
}

export default Header