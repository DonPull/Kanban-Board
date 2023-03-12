import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Home.css';
import createProject from '../assets/create_project.png';
import joinProject from '../assets/join_project.png';
import viewProject from '../assets/view_project.png';

class Home extends Component {
    state = {
        homeContainerRef: React.createRef(),
        homeLogoContainerRef: React.createRef(),
        createProjectRef: React.createRef(),
        joinProjectRef: React.createRef(),
        viewProjectRef: React.createRef()
    }

    componentDidMount(){
        let { homeContainerRef, homeLogoContainerRef, createProjectRef, joinProjectRef, viewProjectRef } = this.state;
        let [homeContainer, homeLogoContainer, createProject, joinProject, viewProject] = [homeContainerRef.current, homeLogoContainerRef.current, createProjectRef.current, joinProjectRef.current, viewProjectRef.current];

        homeContainer.onmouseover = () => {
            homeLogoContainer.style.transform = "translateY(-4rem)";
        }
        homeContainer.onmouseout = () => {
            homeLogoContainer.style.transform = "translateY(0)";
        }

        createProject.onclick = () => { document.getElementById("create-project-btn").click() };
        joinProject.onclick = () => { document.getElementById("join-project-btn").click() };
        viewProject.onclick = () => { document.getElementById("view-projects-btn").click() };
    }

    render() { 
        let { homeContainerRef, homeLogoContainerRef, createProjectRef, joinProjectRef, viewProjectRef } = this.state;

        return (
            <div ref={homeContainerRef} id="home-container" className='flex column justify-center align-center'>
                <div ref={homeLogoContainerRef} id='home-logo-container'>
                    <label>FLEXBOARD</label>
                </div>

                <div className='flex' style={{ gap: "4rem" }}>
                    <div ref={createProjectRef} className='home-project-button-container'>
                        <label>Create Project</label>
                        <img src={createProject} />
                    </div>

                    <div ref={joinProjectRef} className='home-project-button-container'>
                        <label>Join Project</label>
                        <img src={joinProject} />
                    </div>

                    <div ref={viewProjectRef} className='home-project-button-container'>
                        <label>View Projects</label>
                        <img src={viewProject} />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Home;