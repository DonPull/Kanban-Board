import ReactDOM from 'react-dom';
import React, { Component } from 'react';

class Register extends Component {
    render() { 
        return (
            <div className="form-background flex justify-center height-100-percent width-100-percent bg-color-main">
                <div className="form-container filter flex column no-hover align-center bg-color-main-element" style={{ top: "18%" }}>
                    <h1>Sign up</h1>
                    <div className='authentication-field-sections flex column align-center'>
                        <div className="authentication-field-section">
                            <label className="authentication-label">Email</label>
                            <input type="text" className="authentication-field input"></input>
                        </div>
                        <div className="authentication-field-section">
                            <label className="authentication-label">Username</label>
                            <input type="text" className="authentication-field input"></input>
                        </div>
                        <div className="authentication-field-section">
                            <label className="authentication-label">Password</label>
                            <input type="password" className="authentication-field input"></input>
                        </div>
                        <div className="authentication-field-section">
                            <label className="authentication-label">Confirm Password</label>
                            <input type="password" className="authentication-field input"></input>
                        </div>
                    </div>
                    <button className="button">Sign up</button>
                </div>
            </div>
        );
    }
}
 
export default Register;