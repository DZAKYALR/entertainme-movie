import './style.css'
import HeaderImage from './../../components/HeaderImage'
import Navbar from './../../components/Navbar'
import Footer from './../../components/Footer'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const GET_SERIE = gql`
query serie($id: ID) {
    serie(_id: $id){
      _id
      title
      overview
      poster_path
      popularity
      tags
      video
    }
  }
`;

export default function DetailSerie() {
    const { id } = useParams()
    let { data, loading, error } = useQuery(GET_SERIE, {
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
        console.log(data);
        return (
            <>
                <div>
                    <Navbar />
                    <HeaderImage item={data.serie}/>
                    <Footer />
                </div>
            </>
        )
    }

}

