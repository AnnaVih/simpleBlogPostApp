import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { RequestProvider } from 'react-request-hook'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/'
})


ReactDOM.render(
<RequestProvider value={axiosInstance}>
  <App />
</RequestProvider>,
document.getElementById('root'));
