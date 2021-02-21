import './style.css'
import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import Card from './../Card'
import { GET_FAVORITES } from '../../config/query'

export default function FavoriteContainer() {
    let { data, loading, error } = useQuery(GET_FAVORITES)
    
    if (loading) {
        return <>
            <div className="flex justify-center items-center flex-col flex-wrap p-20">
                <h1 className="text-3xl font-bold italic mb-10 mt-10">MOVIES</h1>
                <div className="flex justify-center items-center flex-wrap">
                    <>loading</>
                </div>
            </div>
        </>
    } else {
        return (
            <>
                 <section id="top_movies" className="clearfix">
                <div className="wrapper">
                    <header className="clearfix" >
                        <h2 style={{color: 'white', fontSize: "34px"}}>Favorites List</h2>
                        <hr/>
                    </header>
                    { data.favoriteList.length === 0 ? <h4 style={{color:'whitesmoke', fontWeight:'400'}}> its seem you dont have any </h4> : ""}
                    <div className="row">
                        {data.favoriteList.map((item, index) => {
                            return <Card item={item} key={index}/>
                        })}
                    </div>
                    </div>
            </section>
            </>
        )
    }
    
}

