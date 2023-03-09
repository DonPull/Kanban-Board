import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './authentication.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import apiEndpoint from '../..';
import Toast from './../Toast';
import jwt_decode from "jwt-decode";

class Login extends Component {
    state = {
        loginFormRef: React.createRef(),
        emailInputRef: React.createRef(),
        passwordInputRef: React.createRef(),
        toastObj: {
            show: false,
            message: null,
            duration: 3000,
            type: "error"
        }
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

            if(emailInput.value.trim().length === 0 || passwordInput.value.trim().length === 0){
                this.setState(prevState => ({ toastObj: { ...prevState.toastObj, show: true, message: "Please fill out all required fields" } }));
                if(!loginForm.classList.contains("shake-animation")){
                    loginForm.classList.add("shake-animation");
                }
            }else{
                let result = await axios.post(apiEndpoint + "/Auth/login", { "Email": emailInput.value, "Password": passwordInput.value })
                    .then(response => {
                        //get token from response
                        const token = response.data;

                        let decoded = jwt_decode(token);

                        this.props.cookies.set("jwt_token", token, {
                            expires: new Date(decoded.exp * 1000),
                        });

                        //TODO: ON LOGIN/REGISTER SUCCESS DELETE THE INPUT.VALUE OF EVERY INPUT!

                        //redirect user to home page
                        window.location.href = '/';
                    })
                    .catch((error) => {
                        this.setState(prevState => ({ toastObj: { ...prevState.toastObj, show: true, type: "error", message: error.response === undefined ? error.message : error.response.data } }));
                        if(!loginForm.classList.contains("shake-animation")){
                            //console.log("shake animation triggered");
                            loginForm.classList.add("shake-animation");
                        }
                    });
            }
        }
    }

    render() {
        let { loginFormRef, toastObj, emailInputRef, passwordInputRef } = this.state;

        return (
            <React.Fragment>
                {toastObj.show && <Toast closeToastCallbackFunction={() => { this.setState(prevState => ({ toastObj: { ...prevState.toastObj, show: false } })) }} toastMessage={toastObj.message} notificationDurationInMs={toastObj.duration} notificationType={toastObj.type} />}
                <div className="form-background flex column align-center height-100-percent width-100-percent bg-color-main">
                    <div ref={loginFormRef} onAnimationEnd={() => { loginFormRef.current.classList.remove("shake-animation"); }} className="form-container filter flex column no-hover align-center bg-color-main-element">
                        <h1>Sign in</h1>
                        <div className='authentication-field-sections flex column align-center'>
                            <div className="authentication-field-section">
                                <label className="authentication-label">Email</label>
                                <input ref={emailInputRef} type="text" className="authentication-field input"></input>
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
            </React.Fragment>
        );
    }
}
 
export default Login;