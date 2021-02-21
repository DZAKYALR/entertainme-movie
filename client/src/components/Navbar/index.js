import './style.css'
import { useHistory, useRouteMatch, Link } from 'react-router-dom'

export default function Navbar() {
    const history = useHistory()
    const gotoHome = () => {
        history.push(`/`)
      }
    return (
        <>
            <header id="top_header" className="clearfix">
                <div className="wrapper">
                    <h1 className="logo" style={{color: 'white', fontSize: '30px', cursor: 'pointer'}} onClick={() => gotoHome()}>Movies<span>&amp;</span>Tv Show</h1>
                    <a href="#" className="menu"><i className="fa fa-bars"></i></a>
                    <nav id="main_nav" style={{color: 'white', fontSize: '19px'}}>
                        <Link href="#top_movies"to="/">Movies</Link>
                        <Link href="#top_shows"to="/">TV Shows</Link>
                        <Link href="#top_shows"to="/favorite">Favorite</Link>
                    </nav>
                </div>
            </header>
        </>
    )
}

