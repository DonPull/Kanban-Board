import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './authentication.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    componentDidMount(){
        let loginForm = document.querySelector(".form-background");
        // event listener that presses the sign in button on enter key press
        window.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                // Cancel the default action
                event.preventDefault();
                document.getElementById("sign-in").click();
            }
        });

         // sign in button on click event listener
         document.getElementById("sign-in").onclick = (event) => {
            loginForm.querySelectorAll("input").forEach(element => {
                console.log(element.value);
            });
        }
    }

    render() {
        return (
            <div className="form-background flex column align-center height-100-percent width-100-percent bg-color-main">
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