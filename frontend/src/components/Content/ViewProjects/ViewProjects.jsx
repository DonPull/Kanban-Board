import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ViewProjects.css';
import collapseArrowIcon from '../../../assets/collapse_arrow.png';
import ProjectCard from './ProjectCard';

class ViewProjects extends Component {
    state = {
        viewProjectsContainerRef: React.createRef(),
        myProjectsIsToggled: false,
        otherProjectsIsToggled: false
    }

    componentDidMount(){
        //let { myProjectsIsToggled, otherProjectsIsToggled } = this.state;
        let viewProjectsContainer = this.state.viewProjectsContainerRef.current;

        let myProjects = viewProjectsContainer.querySelectorAll(".project-cards-label-container")[0];
        myProjects.onclick = (event) => {
            let collapseIcon = myProjects.querySelector("img");
            console.log(collapseIcon);
            //console.log("myProjectsIsToggled: ", myProjectsIsToggled);
            
            if(this.state.myProjectsIsToggled){
                collapseIcon.style.transform = "rotate(0deg)";
                viewProjectsContainer.querySelectorAll(".project-cards-container")[0].style.display = "";
            }else{
                collapseIcon.style.transform = "rotate(-180deg)";
                viewProjectsContainer.querySelectorAll(".project-cards-container")[0].style.display = "none";
            }

            //console.log("state before update myProjectsIsToggled: ", this.state.myProjectsIsToggled);
            this.setState({ myProjectsIsToggled: !this.state.myProjectsIsToggled }, () => { console.log("state after update myProjectsIsToggled: ", this.state.myProjectsIsToggled);});
        }

        let otherProjects = viewProjectsContainer.querySelectorAll(".project-cards-label-container")[1];
        otherProjects.onclick = (event) => {
            let collapseIcon = otherProjects.querySelector("img");
            console.log(collapseIcon);
            //console.log("otherProjectsIsToggled: ", otherProjectsIsToggled);

            if(this.state.otherProjectsIsToggled){
                collapseIcon.style.transform = "rotate(0deg)";
                viewProjectsContainer.querySelectorAll(".project-cards-container")[1].style.display = "";
            }else{
                collapseIcon.style.transform = "rotate(-180deg)";
                viewProjectsContainer.querySelectorAll(".project-cards-container")[1].style.display = "none";
            }

            this.setState({ otherProjectsIsToggled: !this.state.otherProjectsIsToggled });
        }
    }

    render() {
        let { viewProjectsContainerRef } = this.state;

        return (
            <div ref={viewProjectsContainerRef} id="view-projects-container" className='flex column'>
                <div className='flex column'>
                    <div className='project-cards-label-container flex'>
                        <label>My Projects</label>
                        <div className='collapse-project-cards-icon-container'>
                            <img src={collapseArrowIcon} />
                        </div>
                    </div>
                    <div className='project-cards-container flex'>
                        <ProjectCard />
                        <ProjectCard />
                    </div>
                </div>

                <div className='flex column'>
                    <div className='project-cards-label-container flex'>
                        <label>Other Projects</label>
                        <div className='collapse-project-cards-icon-container'>
                            <img src={collapseArrowIcon} />
                        </div>
                    </div>
                    <div className='project-cards-container flex'>
                        <ProjectCard />
                        <ProjectCard />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ViewProjects;