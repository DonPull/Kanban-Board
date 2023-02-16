import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './authentication.css';

class Login extends Component { 
    render() {
        return (
            <div className="form-background flex justify-center height-100-percent width-100-percent bg-color-main">
                <div className="form-container filter flex column no-hover align-center bg-color-main-element">
                    <h1>Sign in</h1>
                    <div className='authentication-field-sections flex column align-center'>
                        <div className="authentication-field-section">
                            <label className="authentication-label">Username</label>
                            <input type="text" className="authentication-field input"></input>
                        </div>
                        <div className="authentication-field-section">
                            <label className="authentication-label">Password</label>
                            <input type="password" className="authentication-field input"></input>
                        </div>
                    </div>
                    <button className="button">Sign in</button>
                </div>
            </div>
        );
    }
}
 
export default Login;