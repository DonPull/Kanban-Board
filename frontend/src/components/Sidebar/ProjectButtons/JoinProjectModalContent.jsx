import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import apiEndpoint, { claimsStr } from '../../..';
import Toast from '../../Toast';
import "./JoinProjectModalContent.css";
import jwt_decode from "jwt-decode";

class JoinProjectModalContent extends Component {
    state = {
        codeInputFieldRef: React.createRef(),
        joinProjectBtnRef: React.createRef(),
        toastObj: {
            show: false,
            message: null,
            duration: 3000,
            type: "error"
        }
    }

    componentDidMount(){
        this.props.modalOnCloseCallback(this.clearInput);

        let { joinProjectBtnRef, codeInputFieldRef } = this.state;
        let [joinProjectBtn, codeInputField] = [joinProjectBtnRef.current, codeInputFieldRef.current];
        joinProjectBtn.onclick = async (event) => {
            let cookies = new Cookies();
            let token = cookies.get("jwt_token");

            let decoded = jwt_decode(token);

            let result = await axios.post(apiEndpoint + "/Project/join", { "JoinProjectString": codeInputField.value, "UserEmail": decoded[claimsStr + "emailaddress"] })
                .catch(error => {
                    let newToastProperties = { show: true, type: "error", message: "Invalid join code" };
                    this.props.modifyToastObjCallback(newToastProperties);
                });
            console.log(result);
            if(result !== null && result !== undefined){
                let newToastProperties = { show: true, type: "success", message: `Joined project: "${result.data}"` };
                this.props.modifyToastObjCallback(newToastProperties);
            }
        }
    }

    clearInput = () => {
        this.state.codeInputFieldRef.current.value = "";
    }
    
    render() {
        return (
            <React.Fragment>
                <div style={{ gap: "1rem" }} className='flex column align-center'>
                    <div className='flex join-project-input-pill'>
                        <label>Join Code</label>
                        <div style={{ margin: "0 0.5rem", height: "auto" }} className='separator-vertical' />
                        <input ref={this.state.codeInputFieldRef} type='text' placeholder='Enter Code...' />
                    </div>
                    <button ref={this.state.joinProjectBtnRef} style={{ width: "max-content" }} className='button'>Join Project</button>
                </div>
            </React.Fragment>
        );
    }
}
 
export default JoinProjectModalContent;