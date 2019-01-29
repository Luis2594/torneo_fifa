import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'

import reducers from './modules/reducers'
import Router from './Router'

console.disableYellowBox = true;


const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(ReduxThunk)
  )
)

export default class App extends Component {

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyCrhWFDFIWEJeuv2EO3nN7cHv_lPO2i71E",
      authDomain: "torneofifa-b47a0.firebaseapp.com",
      databaseURL: "https://torneofifa-b47a0.firebaseio.com",
      projectId: "torneofifa-b47a0",
      storageBucket: "torneofifa-b47a0.appspot.com",
      messagingSenderId: "255523327223"
    };
    firebase.initializeApp(config);
  }

  render() {

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

