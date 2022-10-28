import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "./ProjectButtons.css";

class ProjectButtons extends Component {
    render() { 
        return (
            <div id="navbar-project-btn-container" className='flex column align-center navbar-content-container' style={{ marginTop: "30px" }}>
                <div className='title-with-underline-container'>
                    <label>Projects</label>
                    <div className='separator margin-top-5px' style={{ margin: "5px auto" }}/>
                </div>
                <button className='button'>Create New Project</button>
                <button className='button'>Join Project</button>
                <button className='button'>View My Projects</button>
            </div>
        );
    }
}
 
export default ProjectButtons;