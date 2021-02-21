import './style.css'
import AddForm from './../../components/AddForm'
import Navbar from './../../components/Navbar'
import Footer from './../../components/Footer'



export default function AddSerie() {
const kindOf = "serie"
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

