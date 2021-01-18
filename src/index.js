import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import './index.css';
import App from './components/App';
import {rootReducer} from "./reducers/rootReducer";
import apiMiddleware from "./middlewares/api/api.middleware";
import {appMiddleware} from "./middlewares/app.middleware";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk,
      apiMiddleware,
      appMiddleware
    )
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);