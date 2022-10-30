import React, { Component, useRef } from 'react';
import ReactDOM from 'react-dom';

class TestModalContent extends Component {
    state = {
        modalCloseBtnRef: React.createRef()
    }

    componentDidMount(){
        this.props.getCloseBtn(this.state.modalCloseBtnRef.current);
    }

    render() {
        return (
            <div className='flex column bg-color-main-element' style={{ width: "75vw", height: "20vh" }}>
                <div className='flex bg-color-accent'>
                    <p>Test123</p>
                    <button ref={this.state.modalCloseBtnRef}>Click to close</button>
                </div>
                <label className='bg-color-accent-1'>Bottom label</label>
            </div>
        );
    }
}
 
export default TestModalContent;