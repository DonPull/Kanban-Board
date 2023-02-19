import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EmailValidator from 'email-validator';
import Toast from '../Toast';

class Register extends Component {
    state = {
        registerFormRef: React.createRef(),
        actionBtnRef: React.createRef(),
        emailInputRef: React.createRef(),
        usernameInputRef: React.createRef(),
        passwordInputRef: React.createRef(),
        confirmPasswordInputRef: React.createRef(),
        typingAnimationArray: "Already have an account? {Follow me}".split(""),
        toastObj: {
            show: false,
            message: null,
            possition: "top",
            duration: 2000,
            type: "error"
        }
    }

    componentDidMount(){
        let { registerFormRef, actionBtnRef, emailInputRef, usernameInputRef, passwordInputRef, confirmPasswordInputRef} = this.state;
        let [ registerForm, actionBtn, emailInput, usernameInput, passwordInput, confirmPasswordInput ] = [registerFormRef.current, actionBtnRef.current, emailInputRef.current, usernameInputRef.current, passwordInputRef.current, confirmPasswordInputRef.current];

        // event listener that presses the sign in button on enter key press
        registerForm.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                // Cancel the default action
                event.preventDefault();
                actionBtn.click();
            }
        });

        // sign in button on click event listener
        actionBtn.onclick = (event) => {
            let result = this.isRegisterDataValid(emailInput.value, passwordInput.value, confirmPasswordInput.value);
            
            this.setState(prevState => ({ toastObj: { ...prevState.toastObj, show: true, message: result.message } }));
            if(result.dataIsValid !== true){
                this.setState(prevState => ({ toastObj: { ...prevState.toastObj, type: "error" } }));
                // if the register information is invalid show an error message and do a little shake animation of the registration form
                if(!registerForm.classList.contains("shake-animation")){
                    console.log("shake animation triggered");
                    registerForm.classList.add("shake-animation");
                }
            }else{
                this.setState(prevState => ({ toastObj: { ...prevState.toastObj, type: "success" } }));
            }
        }
    }

    isRegisterDataValid = (email, password, confirmPassword) => {
        if(!EmailValidator.validate(email)){
            return { dataIsValid: false, message: "Email is not valid"};
        }
        if(password !== confirmPassword || password === ""){
            return { dataIsValid: false, message: "Confirm password is different from the password"}; 
        }

        return { dataIsValid: true, message: "Your registration is almost complete, please check your email to verify your account!"};
    }

    render() {
        let { toastObj, registerFormRef, actionBtnRef, emailInputRef, usernameInputRef, passwordInputRef, confirmPasswordInputRef, typingAnimationArray } = this.state;

        return (
            <React.Fragment>
                {toastObj.show && <Toast closeToastCallbackFunction={() => { this.setState(prevState => ({ toastObj: { ...prevState.toastObj, show: false } })) }} toastMessage={toastObj.message} possition={toastObj.possition} notificationDurationInMs={toastObj.duration} notificationType={toastObj.type} />}
                <div className="form-background flex column align-center height-100-percent width-100-percent bg-color-main">
                    <div ref={registerFormRef} onAnimationEnd={() => { registerFormRef.current.classList.remove("shake-animation"); }} className="form-container filter flex column no-hover align-center bg-color-main-element" style={{ top: "18%" }}>
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
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Register;