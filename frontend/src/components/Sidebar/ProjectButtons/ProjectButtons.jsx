import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "./ProjectButtons.css";
import CreateProjectModalContent from './CreateProjectModalContent';
import Modal from './../../Modal';
import JoinProjectModalContent from './JoinProjectModalContent';
import { Link } from 'react-router-dom';
import Toast from './../../Toast';

class ProjectButtons extends Component {
    state = {
        createProjectId: "create-project-btn",
        joinProjectId: "join-project-btn",
        viewProjectsId: "view-projects-btn",
        toastObj: {
            show: false,
            message: null,
            duration: 3000,
            type: "error"
        }
    }

    modifyToastObjCallback = (tObj) => {
        this.setState(prevState => ({ toastObj: { ...prevState.toastObj, ...tObj } }));
    }

    render() { 
        const { toastObj, createProjectId, joinProjectId, viewProjectsId } = this.state;

        return (
            <div id="navbar-project-btn-container" className='flex column align-center navbar-content-container'>
                <div className='title-with-underline-container'>
                    <label>Projects</label>
                    <div className='separator-2'/>
                </div>
                <button id={createProjectId} className='button width-100-percent'>Create New Project</button>
                <button id={joinProjectId} className='button width-100-percent'>Join Project</button>
                <Link to={"/viewProjects"} style={{ all: "unset", width: "100%" }}>
                    <button id={viewProjectsId} className='button width-100-percent'>View My Projects</button>
                </Link>

                {toastObj.show && <Toast closeToastCallbackFunction={() => { this.setState(prevState => ({ toastObj: { ...prevState.toastObj, show: false } })) }} toastMessage={toastObj.message} notificationDurationInMs={toastObj.duration} notificationType={toastObj.type} />}
                <Modal modalContent={<CreateProjectModalContent modifyToastObjCallback={this.modifyToastObjCallback} />} openBtnId={createProjectId} />
                <Modal modalContent={<JoinProjectModalContent modifyToastObjCallback={this.modifyToastObjCallback} />} openBtnId={joinProjectId} />
            </div>
        );
    }
}
 
export default ProjectButtons;