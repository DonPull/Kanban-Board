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
        createColumnBoardId: this.props.createColumnBoardId || null,
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
        console.log("createColumnBoardId: ", this.state.createColumnBoardId);
        this.props.modalOnCloseCallback(this.clearInput);

        let { createColumnBoardId, joinProjectBtnRef, codeInputFieldRef } = this.state;
        let [joinProjectBtn, codeInputField] = [joinProjectBtnRef.current, codeInputFieldRef.current];
        joinProjectBtn.onclick = async (event) => {

            if(this.props.onClickCallback){
                this.props.onClickCallback();
            }

            let cookies = new Cookies();
            let token = cookies.get("jwt_token");

            let decoded = jwt_decode(token);

            let result;
            if(createColumnBoardId === null){
                result = await axios.post(apiEndpoint + "/Project/join", { "JoinProjectString": codeInputField.value, "UserEmail": decoded[claimsStr + "emailaddress"] }).catch(error => {
                    let newToastProperties = { show: true, type: "error", message: "Invalid join code" };
                    this.props.modifyToastObjCallback(newToastProperties);
                });
            }else{
                result = await axios.post(apiEndpoint + "/Column/create", { "Name": codeInputField.value, "BoardId": createColumnBoardId }).catch(error => {
                    let newToastProperties = { show: true, type: "error", message: "Couldn't create a new column. Please try again later!" };
                    this.props.modifyToastObjCallback(newToastProperties);
                });
            }
            console.log(result);
            if(result !== null && result !== undefined){
                let newToastProperties = { show: true, type: "success", message: createColumnBoardId === null ? `Joined project: "${result.data}"` : `Created column: "${result.data["name"]}"` };
                this.props.modifyToastObjCallback(newToastProperties);
            }
        }
    }

    clearInput = () => {
        this.state.codeInputFieldRef.current.value = "";
    }
    
    render() {
        let { createColumnBoardId } = this.state;

        return (
            <React.Fragment>
                <div style={{ gap: "1rem" }} className='flex column align-center'>
                    <div className='flex join-project-input-pill'>
                        <label>{createColumnBoardId === null ? "Join Code" : "Column Name"}</label>
                        <div style={{ margin: "0 0.5rem", height: "auto" }} className='separator-vertical' />
                        <input ref={this.state.codeInputFieldRef} type='text' placeholder={createColumnBoardId === null ? 'Enter Code...' : 'Enter Name...'} />
                    </div>
                    <button ref={this.state.joinProjectBtnRef} style={{ width: "max-content", marginTop: "1rem" }} className='button'>{createColumnBoardId === null ? 'Join Project' : 'Create'}</button>
                </div>
            </React.Fragment>
        );
    }
}
 
export default JoinProjectModalContent;