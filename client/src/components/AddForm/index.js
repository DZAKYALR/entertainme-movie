import './style.css'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import { ADD_MOVIE, ADD_SERIE, GET_MOVIES, GET_SERIES } from '../../config/query'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddForm(props) {

    const history = useHistory()
    const [inputForm, setInputForm] = useState({
        title: '',
        poster_path: '',
        popularity: '',
        overview: '',
        tags: '',
        kindOf: '',
        video: ''
    })

    const [insertMovie, { data }] = useMutation(ADD_MOVIE, {
        refetchQueries: [{ query: GET_SERIES }, { query: GET_MOVIES }]
    })
    const [insertSerie, { }] = useMutation(ADD_SERIE, {
        refetchQueries: [{ query: GET_SERIES }, { query: GET_MOVIES }]
    })

    const onChange = e => {
        let { name, value } = e.target
        const inputValue = { ...inputForm, [name]: value }
        setInputForm(inputValue)
    }
    const toastNotification = errMessage => {
        toast.error(`⚠️ ${errMessage}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const onSubmit = e => {
        e.preventDefault()
        let validationPass = true
        if (inputForm.title.length === 0) {
            validationPass = false
            toastNotification('Title Cannot be empty')
        }
        if (inputForm.poster_path.length === 0) {
            validationPass = false
            toastNotification('Poster Url Cannot be empty')
        }
        if (inputForm.popularity.length === 0 || inputForm.popularity < 0 || inputForm.popularity >100 ) {
            validationPass = false
            toastNotification('Please Provide Rating scale in scale of 100%')
        }
        if (inputForm.overview.length === 0) {
            validationPass = false
            toastNotification('Please include some of review')
        }
        if (inputForm.tags.length === 0) {
            validationPass = false
            toastNotification('Please Provide some tags')
        }
        if (inputForm.video.length === 0) {
            validationPass = false
            toastNotification('Video url Cannot be empty')
        }

        if (validationPass) {
            if (props.item === "movies") {
                insertMovie({
                    variables: {
                        MovieInput: {
                            title: inputForm.title,
                            poster_path: inputForm.poster_path,
                            popularity: Number(inputForm.popularity),
                            overview: inputForm.overview,
                            tags: [inputForm.tags],
                            kindOf: props.item,
                            video: inputForm.video
                        }
                    }
                })
            } else {
                insertSerie({
                    variables: {
                        SerieInput: {
                            title: inputForm.title,
                            poster_path: inputForm.poster_path,
                            popularity: Number(inputForm.popularity),
                            overview: inputForm.overview,
                            tags: [inputForm.tags],
                            video: inputForm.video
                        }
                    }
                })
            }
            toast.success('✔️ Movie Added', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            setTimeout(function(){ history.push('/'); }, 2000)
            

        }

    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <section id="banner" className="clearfix">
                <div id="banner_content_wrapper">
                    <div id="poster">
                        <img src='https://i.imgur.com/hB97Oaz.jpg' alt='' className="featured_image" />
                    </div>
                    <div id="content">
                        <a style={{ color: "white" }}>Title :</a><br />
                        <input
                            name="title"
                            type="text"
                            className=""
                            style={{ color: 'black', width: '24em' }}
                            value={inputForm.title}
                            onChange={e => onChange(e)}
                        /><br />
                        <a style={{ color: "white" }}>Review :</a><br />
                        <input
                            name="overview"
                            type="text"
                            className=""
                            style={{ color: 'black', width: '24em' }}
                            onChange={e => onChange(e)}
                            value={inputForm.overview} /><br />
                        <a style={{ color: "white" }}>Poster Url :</a><br />
                        <input
                            name="poster_path"
                            type="text"
                            className=""
                            style={{ color: 'black', width: '24em' }}
                            onChange={e => onChange(e)}
                            value={inputForm.poster_path} /><br />
                        <a style={{ color: "white" }}>Rating :</a><br />
                        <input
                            min="0" max="100"
                            name="popularity"
                            type="number"
                            className=""
                            style={{ color: 'black', width: '24em' }}
                            onChange={e => onChange(e)}
                            value={inputForm.popularity} /><br />
                        <a style={{ color: "white" }}>Tags :</a><br />
                        <input
                            name="tags"
                            type="text"
                            className=""
                            style={{ color: 'black', width: '24em' }}
                            onChange={e => onChange(e)}
                            value={inputForm.tags} /><br />
                        <a style={{ color: "white" }}>Video Url :</a><br />
                        <input
                            name="video"
                            type="text"
                            className=""
                            style={{ color: 'black', width: '24em' }}
                            onChange={e => onChange(e)}
                            value={inputForm.video} /><br />
                        <hr />
                        <a href="#" className="amazing plain" onClick={e => onSubmit(e)}>Save</a>
                    </div>
                </div>
            </section>
        </>
    )

}

