import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./JoinProjectModalContent.css";

class JoinProjectModalContent extends Component {
    state = {
        codeInputFieldRef: React.createRef()
    }

    componentDidMount(){
        this.props.modalOnCloseCallback(this.clearInput);
    }

    clearInput = () => {
        this.state.codeInputFieldRef.current.value = "";
    }
    
    render() { 
        return (
            <div style={{ gap: "1rem" }} className='flex column align-center'>
                <div className='flex join-project-input-pill'>
                    <label>Join Project</label>
                    <div style={{ margin: "0 0.5rem", height: "auto" }} className='separator-vertical' />
                    <input ref={this.state.codeInputFieldRef} type='text' placeholder='Enter Code...' />
                </div>
                <button style={{ width: "max-content" }} className='button'>Request Access</button>
            </div>
        );
    }
}
 
export default JoinProjectModalContent;