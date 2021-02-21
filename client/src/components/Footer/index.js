import './style.css'

export default function Footer() {

    return (
        <>
            

            <footer id="main_footer">
                <p className="logo" style={{color: 'whitesmoke'}}>Movies<span>&amp;</span>Tv-Show</p>
                <p className="copyright">&copy;2021 Movies &amp; Tv-Show. All Rights Reserved.</p>
                <div className="links">
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </footer>
        </>
    )
}

