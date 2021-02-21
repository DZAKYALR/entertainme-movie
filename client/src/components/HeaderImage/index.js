import './style.css'
import VideoPlayer from 'react-player'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, gql, useMutation } from '@apollo/client';
import favoriteListVar from '../../config/cache'
import { DELETE_SERIE, DELETE_MOVIE, UPDATE_SERIE, UPDATE_MOVIE, GET_MOVIES, GET_SERIES, GET_FAVORITES } from '../../config/query'
let editMode = false

export default function HeaderImage(props) {
    const { title, _id, poster_path, popularity, tags, overview, kindOf, video } = props.item
    const [favorite, setFavorite] = useState(false)
    let { data, error, loading } = useQuery(GET_FAVORITES)
    const id = _id
    const history = useHistory()
    const [inputUpdate, setInputUpdate] = useState({
        title: '',
        poster_path: '',
        popularity: '',
        overview: '',
        tags: '',
        video_url: ''
    })
    const edit = () => {
        editMode = true
    }
    const addToFavorite = (_id) => {
        setFavorite(true)
        let newFav = favoriteListVar()
        favoriteListVar([...newFav, props.item])
    }
    const delFromFavorite = (_id) => {
        setFavorite(false)
        let newFav = data.favoriteList.filter(e => e._id !== _id)
        favoriteListVar([...newFav])
    }
    const [updateMovie, { }] = useMutation(UPDATE_MOVIE, {
        refetchQueries: [{ query: GET_SERIES }, { query: GET_MOVIES }]
    })
    const [updateSerie, { }] = useMutation(UPDATE_SERIE, {
        refetchQueries: [{ query: GET_SERIES }, { query: GET_MOVIES }]
    })
    const [deleteSerie, { }] = useMutation(DELETE_SERIE, {
        refetchQueries: [{ query: GET_SERIES }, { query: GET_MOVIES }]
    })
    const [deleteMovie, { }] = useMutation(DELETE_MOVIE, {
        refetchQueries: [{ query: GET_SERIES }, { query: GET_MOVIES }]
    })

    const submitDelete = () => {
        if (kindOf === "movies") {
            deleteMovie({
                variables: { id }
            })
            history.push('/')

        } else {
            deleteSerie({
                variables: { id }
            })
            history.push('/')
        }
    }
    useEffect(() => {
        setInputUpdate({
            title: title,
            overview: overview,
            poster_path: poster_path,
            popularity: Number(popularity),
            tags: tags.toString(),
            video_url: video 
        })
    }, [props.item])

    useEffect(() => {
        let validate = data.favoriteList.filter(favorite => favorite.title === title)
        if (validate.length > 0) setFavorite(true)
    }, [data, title])

    const onChange = e => {
        let { name, value } = e.target
        const inputValue = { ...inputUpdate, [name]: value }
        setInputUpdate(inputValue)
    }

    const onSubmit = e => {
        e.preventDefault()
        if (kindOf === "movies") {
            updateMovie({
                variables: {
                    id,
                    MovieInput: {
                        title: inputUpdate.title,
                        poster_path: inputUpdate.poster_path,
                        popularity: Number(inputUpdate.popularity),
                        overview: inputUpdate.overview,
                        tags: [inputUpdate.tags],
                        video: inputUpdate.video_url 
                    }
                }
            })
        } else {
            updateSerie({
                variables: {
                    id,
                    SerieInput: {
                        title: inputUpdate.title,
                        poster_path: inputUpdate.poster_path,
                        popularity: Number(inputUpdate.popularity),
                        overview: inputUpdate.overview,
                        tags: [inputUpdate.tags],
                        video: inputUpdate.video_url 
                    }
                }
            })
        }

        history.push('/')
        editMode = false
    }

    if (editMode) {
        return (
            <>
                <section id="banner" className="clearfix">
                    <div id="banner_content_wrapper">
                        <div id="poster">
                            <img src={poster_path} alt={poster_path} className="featured_image" />
                        </div>
                        <div id="content">
                            <a>Title :</a><br />
                            <input
                                name="title"
                                type="text"
                                className=""
                                style={{ color: 'black', width: '24em' }}
                                value={inputUpdate.title}
                                onChange={e => onChange(e)}
                            /><br />
                            <a>overview :</a><br />
                            <input
                                name="overview"
                                type="text"
                                className=""
                                style={{ color: 'black', width: '24em' }}
                                onChange={e => onChange(e)}
                                value={inputUpdate.overview} /><br />
                            <a>poster_path :</a><br />
                            <input
                                name="poster_path"
                                type="text"
                                className=""
                                style={{ color: 'black', width: '24em' }}
                                onChange={e => onChange(e)}
                                value={inputUpdate.poster_path} /><br />
                            <a>popularity :</a><br />
                            <input
                                name="popularity"
                                type="number"
                                className=""
                                style={{ color: 'black', width: '24em' }}
                                onChange={e => onChange(e)}
                                value={inputUpdate.popularity} /><br />
                            <a>tags :</a><br />
                            <input
                                name="tags"
                                type="text"
                                className=""
                                style={{ color: 'black', width: '24em' }}
                                onChange={e => onChange(e)}
                                value={inputUpdate.tags} /><br />
                            <a style={{ color: "white" }}>Video Url :</a><br />
                            <input
                                name="video"
                                type="text"
                                className=""
                                style={{ color: 'black', width: '24em' }}
                                onChange={e => onChange(e)}
                                value={inputUpdate.video_url} /><br />
                            <hr />
                            <a href="#" className="amazing plain" onClick={e => onSubmit(e)}>Update</a>
                            <a href="#" className="amazing plain red button" onClick={() => submitDelete()} style={{ margin: "10px" }}>Delete</a>
                        </div>
                    </div>
                </section>
            </>
        )
    } else {
        return (
            <>
                <div id="player-wrapper">
                    <VideoPlayer
                        className="react-player"
                        url={video}
                        width='100%'
                        height='100%'
                        controls={true}
                        playing={true}
                        config={{
                            youtube: {
                                playerVars: { showinfo: 1 },
                            }
                        }}
                    />
                </div>
                <section id="banner" className="clearfix">
                    <div id="banner_content_wrapper">
                        <div id="poster">
                            <img src={poster_path} alt={poster_path} className="featured_image" />
                        </div>
                        <div id="content">
                            <h2 className="title">{title}</h2>
                            <div className="ratings">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star inactive"></i>
                            </div>

                            <p className="description">Lorem ipsum loren fox jump from the begining Lorem ipsum loren fox jump from the begining Lorem ipsum loren fox jump from the begining.</p>

                            <p className="info">R <span>|</span> 108 min <span>|</span>{tags}<span>|</span> 12 February 2016</p>
                            {favorite ? <><a href="#" className="amazing plain" onClick={() => delFromFavorite(_id)}>- My List</a></> : <a href="#" className="amazing plain" onClick={() => addToFavorite(_id)}>＋ My list</a>}
                            <a href="#" className="amazing plain" style={{ margin: "10px" }} onClick={() => edit()} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
            </>
        )
    }


}

