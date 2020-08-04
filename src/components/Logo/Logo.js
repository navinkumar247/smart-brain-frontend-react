import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import faceId from './faceid.png'

const Logo = () => {
    return (
    <div className='logo'>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3 "> 
                <img style={{paddingTop: '5px'}} src={faceId} alt='Logo'/> 
            </div>
        </Tilt>   
    </div>
    )
}

export default Logo;