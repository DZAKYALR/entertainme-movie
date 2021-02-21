import {gql} from '@apollo/client'
export const UPDATE_MOVIE = gql`
mutation updateMovie($id: ID, $MovieInput: MovieInput) {
    updateMovie(_id: $id, data: $MovieInput) {
      title
      overview
      poster_path
      popularity
      tags
      _id
      video
    }
  }
`;
export const UPDATE_SERIE = gql`
mutation updateSerie($id: ID, $SerieInput: SerieInput) {
    updateSerie(_id: $id, data: $SerieInput) {
      title
      overview
      poster_path
      popularity
      tags
        video
        _id
    }
  }
`;

export const DELETE_SERIE = gql`
  mutation deleteSerie($id: ID){
    deleteSerie(_id: $id){
      title
      overview
      poster_path
      popularity
        video
        _id
    }
  }
`
export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID){
    deleteMovie(_id: $id){
      title
      overview
      poster_path
      popularity
        video
        _id
    }
  }
`

export const GET_FAVORITES = gql`
  query getFavorite {
    favoriteList @client
  }
`
export const ADD_MOVIE = gql`
mutation insertMovie($MovieInput: MovieInput ) {
    insertMovie(data: $MovieInput) {
      title
      overview
      poster_path
      popularity
      tags
      _id
      video

    }
  }
`;
export const ADD_SERIE = gql`
mutation insertSerie($SerieInput: SerieInput ) {
    insertSerie(data: $SerieInput) {
      title
      overview
      poster_path
      popularity
      tags
      _id
      video

    }
  }
`;
export const GET_MOVIES = gql`
  query {
      movies {
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
export const GET_SERIES = gql`
  query {
    tvSeries {
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