import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Cookies from 'universal-cookie';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const root = ReactDOM.createRoot(document.getElementById('root'));

const apiEndpoint = "https://localhost:7261/api";
const claimsStr = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
let cookies = new Cookies();
let user = cookies.get("jwt_token") === undefined ? null : 
  await axios.post(apiEndpoint + "/User/getUserInfo?userEmail=" + jwt_decode(cookies.get("jwt_token"))[claimsStr + "emailaddress"])
    .then(response => {
      return response.data;
    }).catch(err => {
      return null;
    });

console.log(user);

export default apiEndpoint;
export { claimsStr, user, cookies };

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
