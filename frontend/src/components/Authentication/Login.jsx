import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './authentication.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import apiEndpoint from '../..';

class Login extends Component {
    state = {
        loginFormRef: React.createRef(),
        emailInputRef: React.createRef(),
        passwordInputRef: React.createRef()
    }

    componentDidMount(){
        let { loginFormRef } = this.state;
        let [ loginForm ] = [ loginFormRef.current ];

        // event listener that presses the sign in button on enter key press
        loginForm.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                // Cancel the default action
                event.preventDefault();
                document.getElementById("sign-in").click();
            }
        });

         // sign in button on click event listener
        document.getElementById("sign-in").onclick = async (event) => {
            let { emailInputRef, passwordInputRef } = this.state;
            let [emailInput, passwordInput] = [emailInputRef.current, passwordInputRef.current];

            loginForm.querySelectorAll("input").forEach(element => {
                console.log(element.value);
            });

            let result = await axios.post(apiEndpoint + "/Auth/login", { "Email": emailInput.value, "Password": passwordInput.value }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        }
    }

    render() {
        let { emailInputRef, passwordInputRef } = this.state;

        return (
            <div className="form-background flex column align-center height-100-percent width-100-percent bg-color-main">
                <div ref={this.state.loginFormRef} className="form-container filter flex column no-hover align-center bg-color-main-element">
                    <h1>Sign in</h1>
                    <div className='authentication-field-sections flex column align-center'>
                        <div className="authentication-field-section">
                            <label ref={emailInputRef} className="authentication-label">Email</label>
                            <input type="text" className="authentication-field input"></input>
                        </div>
                        <div className="authentication-field-section">
                            <label className="authentication-label">Password</label>
                            <input ref={passwordInputRef} type="password" className="authentication-field input"></input>
                        </div>
                    </div>
                    <button id='sign-in' className="button">Sign in</button>
                </div>

                <div className='typing-animation-container flex column align-center'>
                    <label className="typing-animation-label"><Link to={"/reset-password"}>{"Forgot your password? {"}<span>Click here</span>{"}"}</Link></label>
                    <label className="typing-animation-label"><Link to={"/register"}>{"New around here? {"}<span>Let's register</span>{"}"}</Link></label>
                </div>
            </div>
        );
    }
}
 
export default Login;