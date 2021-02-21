import './style.css'
import React from 'react'
import Navbar from './../../components/Navbar'
import Footer from './../../components/Footer'

export default function Page404() {

    return (
        <React.Fragment>
            <Navbar />
            <h1 style={{fontSize: '40em', textAlign: 'center'}}>404</h1>
            <Footer />
        </React.Fragment>
    )
}

