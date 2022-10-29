import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TestModalContent extends Component {
    render() { 
        return (
            <div style={{ width: "75vw", height: "20vh" }}>
                <div id="modal-content-resize-animation" className='flex column bg-color-main-element'>
                    <div className='flex bg-color-accent'>
                        <p>Test123</p>
                        <button>Click to close</button>
                    </div>
                    <label className='bg-color-accent-1'>Bottom label</label>
                </div>
            </div>
        );
    }
}
 
export default TestModalContent;