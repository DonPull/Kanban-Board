import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/UnderConstruction.css"
import underConstructionImg from "../assets/under_construction.png"

class UnderConstruction extends Component {
    render() { 
        return (
            <div className='under-construction-container flex column justify-center align-center'>
                <img src={underConstructionImg} />
                <label>Under Construction</label>
                <button ref={this.props.closeBtn} className="button width-100-percent">Continue</button>
            </div>
        );
    }
}
 
export default UnderConstruction;