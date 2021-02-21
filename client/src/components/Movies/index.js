import './style.css'
import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import Card from './../Card'
import { useHistory } from 'react-router-dom'
import { GET_MOVIES } from '../../config/query'


export default function Movies() {
    const history = useHistory()
    const onSubmit = () => {
        history.push('/add-movie')
    }
    const { data, loading, error } = useQuery(GET_MOVIES)
    if (loading) {
        return <>
            <div style={{
                margin: "auto",
                width: "50%",
                padding: "10px"
            }} >
                <img src="https://i.pinimg.com/originals/85/e2/4b/85e24bd18e3658cd321688b4c34cc576.gif" alt="loading" />
            </div>
        </>
    } else {
        let kindOf = null
        if (data.movies) {
            kindOf = "movies"
        }
        if (data.tvSeries) {
            kindOf = "movies"
        }
        return (
            <>
                <section id="top_movies" className="clearfix">
                    <div className="wrapper">
                        <header className="clearfix" >
                            <h2 style={{ color: 'white', fontSize: "34px" }}>Movies</h2>
                            <p style={{ color: 'white', cursor: 'pointer' }} className="view_more button red" onClick={e => onSubmit(e)}>Add Movie</p>
                        </header>

                        <div className="row">
                            {data.movies.map((item, index) => {
                                return <Card item={item} key={index} />
                            })}
                        </div>
                    </div>
                </section>
            </>
        )
    }

}

