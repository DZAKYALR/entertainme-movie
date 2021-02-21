import React from 'react'
import Home from './pages/Home'
import Page404 from './pages/Page404'
import AddMovie from './pages/Add'
import AddSerie from './pages/AddSerie'
import Favorite from './pages/Favorite'
import Detail from './pages/Detail'
import DetailSerie from './pages/DetailSerie'
import { ApolloProvider } from '@apollo/client';
import client from './config/apolloClient'

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/movie/:id'>
            <Detail />
          </Route>
          <Route path='/serie/:id'>
            <DetailSerie />
          </Route>
          <Route path='/add-movie'>
            <AddMovie />
          </Route>
          <Route path='/add-serie'>
            <AddSerie />
          </Route>
          <Route path='/favorite'>
            <Favorite />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

