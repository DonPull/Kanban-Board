import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "./ProjectButtons.css";
import CreateProjectModalContent from './CreateProjectModalContent';
import Modal from './../../Modal';
import JoinProjectModalContent from './JoinProjectModalContent';

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
                <button id={createProjectId} className='button width-100-percent'>Create New Project</button>
                <button id={joinProjectId} className='button width-100-percent'>Join Project</button>
                <button id={viewProjectsId} className='button width-100-percent'>View My Projects</button>

                <Modal modalContent={<CreateProjectModalContent />} openBtnId={createProjectId} /> 
                <Modal modalContent={<JoinProjectModalContent />} openBtnId={joinProjectId} /> 
            </div>
        );
    }
}
 
export default ProjectButtons;