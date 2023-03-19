import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import apiEndpoint from './../../../index';
import axios from 'axios';
import { Link } from 'react-router-dom';
import unsetPfp from "../../../assets/unset_profile_picture.png";

class ProjectCard extends Component {
    state = {
        //projectTitle: this.props.projectTitle || "Title of the project",
        projectId: this.props.projectData["Id"],
        projectTitle: this.props.projectData["Name"],
        projectCreateDate: "02/11/2022",
        projectLastOpenDate: "05/11/2022",
        projectCompletedPercentage: "82%",
        //projectParticipants: [participantIcon, participantIcon2, participantIcon1, participantIcon2, participantIcon1, participantIcon, participantIcon2, participantIcon1, participantIcon2, participantIcon1, participantIcon, participantIcon1, participantIcon2, participantIcon1, participantIcon],
        projectParticipants: [],
        projectCardRef: React.createRef(),
        projectParticipantsIconsRef: React.createRef(),
        projectParticipantsLastIconRef: React.createRef(),
        numberOfUnrenderedAccounts: 0
    }
    
    async componentDidMount(){
        await axios.post(apiEndpoint + "/User/getUsersProfilePictures", this.props.projectData["ProjectParticipantsEmails"].split(","))
            .then(response => {
                this.setState({ projectParticipants: response.data }, () => {
                    this.spaceOutProjectParticipantsIcons();
                });
            }).catch(error => {
                console.log(error);
            });
        
        // Get all the Meters
        const meters = document.querySelectorAll('svg[data-value] .meter');
        meters.forEach((path) => {
            // Get the length of the path
            let length = path.getTotalLength();
            // get the value of the meter
            let value = parseInt(path.parentNode.getAttribute('data-value'));
            // calculate the percentage of the total length
            let to = length * ((100 - value) / 100);
            // trigger layout in safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
            path.getBoundingClientRect();
            // set the offset
            path.style.strokeDashoffset = Math.max(0, to);
            path.nextElementSibling.textContent = `${value}%`;
        });
    }

    spaceOutProjectParticipantsIcons(){
        let { projectCardRef, projectParticipantsIconsRef, projectParticipantsLastIconRef, projectParticipants } = this.state;
        let [projectCard, projectParticipantsIcons, projectParticipantsLastIcon] = [projectCardRef.current, projectParticipantsIconsRef.current, projectParticipantsLastIconRef.current];

        let imgOffsetValue = 10;
        let imgOffsetCounter = 0;
        let remainingNumberOfParticipantsWasRendered = false;
        
        let numberOfPhotosToRender = Math.round((Number(window.getComputedStyle(projectCard).width.replace("px", "")) - 30) / (32 - imgOffsetValue)); // this magic number 30 is the left and right padding of the project card plus the left and right padding of the projectParticipantsIconsContainer... (32 - imgOffsetValue) is the space one participant image takes after we remove the offset of the img (which offset decreases the amount of space the img takes)
        this.setState({ numberOfUnrenderedAccounts: (projectParticipants.length - (numberOfPhotosToRender - 2)) });

        projectParticipantsIcons.querySelectorAll("img").forEach((img) => {
            if(numberOfPhotosToRender <= 2){   // I am not entirely sure why here numberOfPhotosToRender must be lower or equal to 2 insted of 1 but it works so whatever...
                if(!remainingNumberOfParticipantsWasRendered){
                    projectParticipantsLastIcon.style.transform = `translateX(-${imgOffsetCounter}px)`;
                    projectParticipantsLastIcon.style.display = "flex";
                    remainingNumberOfParticipantsWasRendered = true;
                }
                img.style.display = "none";
            }else{
                img.style.transform = `translateX(-${imgOffsetCounter}px)`;
                imgOffsetCounter += imgOffsetValue;
            }
            numberOfPhotosToRender--;
        });
    }

    render() { 
        let { projectId, projectCardRef, projectParticipantsLastIconRef, projectParticipantsIconsRef, numberOfUnrenderedAccounts, projectTitle, projectCreateDate, projectLastOpenDate, projectCompletedPercentage, projectParticipants } = this.state;

        return (
            <Link to={"/projects/" + projectId}>
                <div ref={projectCardRef} className='project-card flex column'>
                    <label title={projectTitle} className='project-card-title'>{projectTitle}</label>
                    
                    {/* <div className='separator' style={{ margin: "0.5rem auto", width: "96%" }}/> */}
                    
                    <div className='project-card-dates-container flex'>
                        <div className='flex column'>
                            <label>Created: <span>{projectCreateDate}</span></label>
                            <label>Last open: <span>{projectLastOpenDate}</span></label>
                        </div>
                        <div title={`Project is ${projectCompletedPercentage} complete.`}>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" data-value={projectCompletedPercentage}>
                                <circle r="45" cx="50" cy="50" />
                                <path class="meter" d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0" stroke-linecap="round" stroke-linejoin="round" stroke-dashoffset="282.78302001953125" stroke-dasharray="282.78302001953125" />
                                <text x="50" y="50" text-anchor="middle" dominant-baseline="central" font-size="28"></text>
                            </svg>
                        </div>
                    </div>
                    
                    {/* <label>Project complete: {projectCompletedPercentage}</label> */}
                    
                    <div ref={projectParticipantsIconsRef} className='project-participants-icons-container flex'>
                        {projectParticipants.map(img => {
                            return <img src={img !== null ? img : unsetPfp}/>
                        })}
                        <div ref={projectParticipantsLastIconRef} className="project-participants-last-icon">
                            <label>{"+" + numberOfUnrenderedAccounts}</label>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}
 
export default ProjectCard;