import './style.css'
import React from 'react'
import Main from './../../components/Main'
import HeaderImage from './../../components/HeaderImage'
import Navbar from './../../components/Navbar'
import Footer from './../../components/Footer'

export default function Home() {

    return (
        <React.Fragment>
            <Navbar />
            {/* <HeaderImage /> */}
            <Main/>
            <Footer />
        </React.Fragment>
    )
}

