import './style.css'
import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import Card from './../Card'
import { useHistory } from 'react-router-dom'
import { GET_SERIES } from '../../config/query'

export default function Series() {
    const history = useHistory()
    const onSubmit = () => {
        history.push('/add-serie')
    }
    const { data, loading, error } = useQuery(GET_SERIES)

    if (loading) {
        return <>
            <div className="">
                <div className="">
                    <>loafing</>
                </div>
            </div>
        </>
    } else {
        return (
            <>
                <section id="top_shows" className="clearfix">
                <div className="wrapper">
                    <header className="clearfix">
                        <h2 style={{color: 'white', fontSize: '34px'}}>Tv Series</h2>
                        <p className="view_more button red" style={{color: 'white', cursor: "pointer"}} onClick={e => onSubmit(e)}>Add Series</p>
                    </header>

                    <div className="row">
                        {data.tvSeries.map((item, index) => {
                            return <Card item={item} key={index} />
                        })}
                    </div>
                    </div>
            </section>
            </>
        )
    }
}

