import './style.css'
import Swal from 'sweetalert2'

export default function ImageHeader() {
    const clickEvent = () => {
        Swal.fire({
            title: 'Join Premium!',
            text: '',
            imageUrl: 'https://www.vpnunlimitedapp.com/img/new-blog/netflix-price-comparison-list/banner_11856.webp',
            imageWidth: 1400,
            width: 1400,
            height: 500,
            imageHeight: 400,
            imageAlt: 'Custom image',
            confirmButtonText: `Maybe Later!`,
          })
      }
    
    return (
        <>
            <div className="imageHeader">
                <img src="https://occ-0-769-768.1.nflxso.net/art/ce656/e3fd62b85404247b2af4a16dc899095b50bce656.webp" />
                <div className="details">
                    <div className="rating">★★★★☆</div>
                    <div className="year">2017</div>
                    <div className="seasons">5 seasons</div>
                    <div className="description">House of Cards is an American political drama web television series created by Beau Willimon. It is an adaptation of the BBC's miniseries of the same name and is based on the novel by Michael Dobbs.</div>
                    <a href="#play" className="button red" onClick={() => clickEvent()}>▶ Play</a>
                </div>
            </div>
        </>
    )
}

