import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ViewProjects.css';
import collapseArrowIcon from '../../../assets/collapse_arrow.png';
import ProjectCard from './ProjectCard';
// import addProjectIcon from '../../../assets/+_and_x_icon_v2.png';
import addProjectIcon from '../../../assets/+_and_x_icon_v4.png';
import apiEndpoint, { claimsStr } from './../../../index';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import axios from 'axios';

class ViewProjects extends Component {
    state = {
        viewProjectsContainerRef: React.createRef(),
        myProjectsIsToggled: false,
        otherProjectsIsToggled: false,
        ownedProjectsList: [],
        joinedProjectsList: []
    }

    componentDidMount(){
        // get all projects to render them
        let cookies = new Cookies();
        let userEmail = jwt_decode(cookies.get("jwt_token"))[claimsStr + "emailaddress"];
        axios.post(apiEndpoint + "/Project/getProjects?userEmail=" + userEmail)
            .then(response => {
                console.log("response: ", response);
                console.log("response.data: ", response.data);
                this.setState({ ownedProjectsList: response.data["OwnedProjects"], joinedProjectsList: response.data["JoinedProjects"] });
            })
            .catch(error => {
                console.log("Unexpected error occurred. Failed to load projects.");
            });

        //let { myProjectsIsToggled, otherProjectsIsToggled } = this.state;
        let viewProjectsContainer = this.state.viewProjectsContainerRef.current;

        viewProjectsContainer.querySelectorAll(".add-project-action-button")[0].onclick = () => { document.getElementById("create-project-btn").click(); }
        viewProjectsContainer.querySelectorAll(".add-project-action-button")[1].onclick = () => { document.getElementById("join-project-btn").click(); }

        let myProjects = viewProjectsContainer.querySelectorAll(".project-cards-label-container")[0];
        myProjects.onclick = (event) => {
            let collapseIcon = myProjects.querySelector("img");
            //console.log(collapseIcon);
            //console.log("myProjectsIsToggled: ", myProjectsIsToggled);

            let addProjectBtn = viewProjectsContainer.querySelectorAll(".add-project-action-button")[0];
            if(this.state.myProjectsIsToggled){
                collapseIcon.style.transform = "rotate(-180deg)";
                viewProjectsContainer.querySelectorAll(".project-cards-container")[0].style.display = "";

                addProjectBtn.style.transform = "translateX(0px)";
                addProjectBtn.style.height = "";
                addProjectBtn.querySelector("img").style.height = "";
            }else{
                collapseIcon.style.transform = "rotate(0deg)";
                viewProjectsContainer.querySelectorAll(".project-cards-container")[0].style.display = "none";
            
                addProjectBtn.style.transform = "translateX(calc(-100% - 2rem))";
                addProjectBtn.style.height = "0%";
                addProjectBtn.querySelector("img").style.height = "0%";
            }

            //console.log("state before update myProjectsIsToggled: ", this.state.myProjectsIsToggled);
            this.setState({ myProjectsIsToggled: !this.state.myProjectsIsToggled });
        }

        let otherProjects = viewProjectsContainer.querySelectorAll(".project-cards-label-container")[1];
        otherProjects.onclick = (event) => {
            let collapseIcon = otherProjects.querySelector("img");
            //console.log(collapseIcon);
            //console.log("otherProjectsIsToggled: ", otherProjectsIsToggled);

            let addProjectBtn = viewProjectsContainer.querySelectorAll(".add-project-action-button")[1]; 
            if(this.state.otherProjectsIsToggled){
                collapseIcon.style.transform = "rotate(-180deg)";
                viewProjectsContainer.querySelectorAll(".project-cards-container")[1].style.display = "";

                addProjectBtn.style.transform = "translateX(0px)";
                addProjectBtn.style.height = "";
                addProjectBtn.querySelector("img").style.height = "";
            }else{
                collapseIcon.style.transform = "rotate(0deg)";
                viewProjectsContainer.querySelectorAll(".project-cards-container")[1].style.display = "none";

                addProjectBtn.style.transform = "translateX(calc(-100% - 2rem))";
                addProjectBtn.style.height = "0%";
                addProjectBtn.querySelector("img").style.height = "0%";
            }

            this.setState({ otherProjectsIsToggled: !this.state.otherProjectsIsToggled });
        }
    }

    render() {
        let { ownedProjectsList, joinedProjectsList, viewProjectsContainerRef } = this.state;

        return (
            <div ref={viewProjectsContainerRef} id="view-projects-container" className='flex column'>
                <div className='flex column'>
                    <div className='flex align-center' style={{ position: "relative", gap: "1rem" }}>
                        <div className='project-cards-label-container flex'>
                            <label>My Projects</label>
                            <div className='collapse-project-cards-icon-container'>
                                <img src={collapseArrowIcon} />
                            </div>
                        </div>
                        <div className='add-project-action-button'>
                            <img src={addProjectIcon}/>
                        </div>
                    </div>
                    <div className='project-cards-container flex'>
                        {/* <ProjectCard projectTitle="Online Ecommers Store" />
                        <ProjectCard /> */}
                        {ownedProjectsList.map(projectData =>{
                            return <ProjectCard projectData={projectData} />;
                        })}
                    </div>
                </div>

                <div className='flex column'>
                    <div className='flex align-center' style={{ position: "relative", gap: "1rem" }}>
                        <div className='project-cards-label-container flex'>
                            <label>Other Projects</label>
                            <div className='collapse-project-cards-icon-container'>
                                <img src={collapseArrowIcon} />
                            </div>
                        </div>
                        <div className='add-project-action-button'>
                            <img src={addProjectIcon}/>
                        </div>
                    </div>
                    <div className='project-cards-container flex'>
                        {/* <ProjectCard projectTitle="Kanban Board" />
                        <ProjectCard projectTitle="Migration to different technology" />
                        <ProjectCard projectTitle="Photography editing" />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard /> */}
                        {joinedProjectsList.map(projectData =>{
                            return <ProjectCard projectData={projectData} />;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ViewProjects;