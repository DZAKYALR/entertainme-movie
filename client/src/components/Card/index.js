import './style.css'
import { useHistory, useRouteMatch } from 'react-router-dom'

export default function Card(props) {
    const { title, _id, poster_path, popularity, tags, kindOf, video } = props.item
    let randomMinutes = Math.floor(Math.random() * 100 ) + 30
    const history = useHistory()
    const gotoDetails = id => {
        kindOf === 'movies' ? history.push(`/movie/${id}`) : history.push(`/serie/${id}`)
      }
    return (
        <>
            <div className="post" onClick={() => gotoDetails(_id)} style={{cursor: "pointer"}} >
                <img src={poster_path} alt={title} />
                <h3 className="title" style={{color: 'white'}}>{title}</h3>
                <p className="post_info">{popularity}% | {randomMinutes} Minutes</p>
            </div>
        </>
    )
}

