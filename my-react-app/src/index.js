import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-mui";


const options = {
  timeout: 1000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};



ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);


