import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
    state = {
        actionBtnRef: React.createRef(),
        emailInputRef: React.createRef(),
        usernameInputRef: React.createRef(),
        passwordInputRef: React.createRef(),
        confirmPasswordInputRef: React.createRef(),
        typingAnimationArray: "Already have an account? {Follow me}".split("")
    }

    componentDidMount(){
        let { actionBtnRef, emailInputRef, usernameInputRef, passwordInputRef, confirmPasswordInputRef} = this.state;
        let [ actionBtn, emailInput, usernameInput, passwordInput, confirmPasswordInput ] = [actionBtnRef.current, emailInputRef.current, usernameInputRef.current, passwordInputRef.current, confirmPasswordInputRef.current];

        let registerForm = document.querySelector(".form-background");
        // event listener that presses the sign in button on enter key press
        window.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                // Cancel the default action
                event.preventDefault();
                actionBtn.click();
            }
        });

         // sign in button on click event listener
         actionBtn.onclick = (event) => {
            registerForm.querySelectorAll("input").forEach(element => {
                console.log(element.value);
            });
        }
    }

    render() {
        let { actionBtnRef, emailInputRef, usernameInputRef, passwordInputRef, confirmPasswordInputRef, typingAnimationArray } = this.state;

        return (
            <div className="form-background flex column align-center height-100-percent width-100-percent bg-color-main">
                <div className="form-container filter flex column no-hover align-center bg-color-main-element" style={{ top: "18%" }}>
                    <h1>Sign up</h1>
                    <div className='authentication-field-sections flex column align-center'>
                        <div className="authentication-field-section">
                            <label className="authentication-label">Email</label>
                            <input ref={emailInputRef} type="text" className="authentication-field input"></input>
                        </div>
                        <div className="authentication-field-section">
                            <label className="authentication-label">Username</label>
                            <input ref={usernameInputRef} type="text" className="authentication-field input"></input>
                        </div>
                        <div className="authentication-field-section">
                            <label className="authentication-label">Password</label>
                            <input ref={passwordInputRef} type="password" className="authentication-field input"></input>
                        </div>
                        <div className="authentication-field-section">
                            <label className="authentication-label">Confirm Password</label>
                            <input ref={confirmPasswordInputRef} type="password" className="authentication-field input"></input>
                        </div>
                    </div>
                    <button ref={actionBtnRef} className="button">Sign up</button>
                </div>

                <div className='typing-animation-container flex column align-center' style={{ top: "18%" }}>
                    <label className="typing-animation-label"><Link to={"/login"}>{"Already have an account? {"}<span>Follow me</span>{"}"}</Link></label>

                    {/* <label className="typing-animation-label"><Link to={"/login"}>
                        {typingAnimationArray.map((item, index) => {
                            let currentChar = "";
                            setTimeout(() => {}, 100);

                        })}
                        <span>Follow me</span>
                        {"}"}
                    </Link></label> */}
                </div>
            </div>
        );
    }
}
 
export default Register;