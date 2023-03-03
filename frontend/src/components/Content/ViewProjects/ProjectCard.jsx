import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ProjectCard extends Component {
    state = {
        projectTitle: "Title of the project",
        projectCreateDate: "02/11/2022",
        projectLastOpenDate: "05/11/2022",
        projectCompletedPercentage: "82%",
        projectParticipants: []
    }

    render() { 
        let { projectTitle, projectCreateDate, projectLastOpenDate, projectCompletedPercentage, projectParticipants } = this.state;

        return (
            <div className='project-card flex column'>
                <label title={projectTitle} className='project-card-title'>{projectTitle}</label>
                
                {/* <div className='separator' style={{ margin: "0.5rem auto", width: "96%" }}/> */}
                
                <div className='project-card-dates-container flex column'>
                    <label>Created: {projectCreateDate}</label>
                    <label>Last open: {projectLastOpenDate}</label>
                </div>
                
                <label>Project complete: {projectCompletedPercentage}</label>
                
                <div className='flex'>
                    <label>Project participants:</label>
                </div>
            </div>
        );
    }
}
 
export default ProjectCard;