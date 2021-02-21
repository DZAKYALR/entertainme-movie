import './style.css'
import React from 'react'
import FavoriteList from './../../components/FavoriteList'
import HeaderImage from './../../components/HeaderImage'
import Navbar from './../../components/Navbar'
import Footer from './../../components/Footer'

export default function Favorite() {

    return (
        <React.Fragment>
            <Navbar />
            {/* <HeaderImage /> */}
            <FavoriteList/>
            <Footer />
        </React.Fragment>
    )
}

