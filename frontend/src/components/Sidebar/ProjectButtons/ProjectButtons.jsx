import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "./ProjectButtons.css";
import CreateProjectModalContent from './CreateProjectModalContent';
import Modal from './../../Modal';

class ProjectButtons extends Component {
    state = {
        createProjectId: "create-project-btn",
        joinProjectId: "join-project-btn",
        viewProjectsId: "view-projects-btn"
    }

    render() { 
        const { createProjectId, joinProjectId, viewProjectsId } = this.state;

        return (
            <div id="navbar-project-btn-container" className='flex column align-center navbar-content-container'>
                <div className='title-with-underline-container'>
                    <label>Projects</label>
                    <div className='separator-2'/>
                </div>
                <button id={createProjectId} className='button'>Create New Project</button>
                <button id={joinProjectId} className='button'>Join Project</button>
                <button id={viewProjectsId} className='button'>View My Projects</button>

                <Modal modalContent={<CreateProjectModalContent />} openBtnId={createProjectId} /> 
            </div>
        );
    }
}
 
export default ProjectButtons;