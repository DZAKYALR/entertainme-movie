import './style.css'
import AddForm from './../../components/AddForm'
import Navbar from './../../components/Navbar'
import Footer from './../../components/Footer'



export default function AddMovie() {
    const kindOf ="movies"

    return (
        <>
            <div>
                <Navbar />
                <AddForm item={kindOf} />
                <Footer />
            </div>
        </>
    )

}

