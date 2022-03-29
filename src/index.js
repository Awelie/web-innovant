import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const getMobile = () => {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) {
    return "Android"
  }
  else if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)){
    return "iOS"
  }
  return "Other"
}

console.log(getMobile())
  if(getMobile() === "iOS") {
    document.documentElement.style.setProperty('--nav-margin', "25px");
  } else {
    document.documentElement.style.setProperty('--nav-margin', "0");
  }
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
