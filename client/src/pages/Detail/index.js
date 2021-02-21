import './style.css'
import HeaderImage from './../../components/HeaderImage'
import Navbar from './../../components/Navbar'
import Footer from './../../components/Footer'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const GET_MOVIE = gql`
query movie($id: ID) {
    movie(_id: $id){
      _id
      title
      overview
      poster_path
      popularity
      tags
      kindOf
      video
    }
  }
`;

export default function Detail() {
    const { id } = useParams()
    let { data, loading, error } = useQuery(GET_MOVIE, {
        variables: { id }
    })
    if (loading) {
        return <div style={{
            margin: "auto",
            width: "50%",
            padding: "10px"
        }} >
            <img src="https://i.pinimg.com/originals/85/e2/4b/85e24bd18e3658cd321688b4c34cc576.gif" alt="loading" />
        </div>
    } else {
        return (
            <>
                <div>
                    <Navbar />
                    <HeaderImage  item={data.movie}/>
                    <Footer />
                </div>
            </>
        )
    }

}

