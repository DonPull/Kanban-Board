import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FilterPill from './../Filters/FilterPill';
import taskIcon from '../../../assets/task_icon.png';
import lowPriority from '../../../assets/low_priority.png';
import mediumPriority from '../../../assets/medium_priority.png';
import highPriority from '../../../assets/high_priority.png';
import criticalPriority from '../../../assets/critical_priority.png';
import testCreatorProfilePic from '../../../assets/test_profile_pic_1.jpg';
import testAssigneeProfilePic from '../../../assets/test_profile_pic_2.jpg';

class Task extends Component {
    state = {
        taskFilters: ["Backend", "Frontend", "Ivan", "Icovich"],
        status: "Not Done"
    };

    componentDidMount(){
        let taskTypeContainer = document.querySelector(".task-type-info-container");
        let taskPriorityContainer = document.querySelector(".task-priority-info-container");
        taskTypeContainer.onmouseover = (event) => {
            // taskTypeContainer.querySelector(".image-container img").classList.add("image-slide-animation");
            taskTypeContainer.querySelector(".fading-effect").classList.add("text-slide-animation");
            taskTypeContainer.querySelector(".image-container img").style.marginRight = Number(window.getComputedStyle(taskTypeContainer.querySelector(".text-container")).width.replace("px", "")) + 5 + "px";
        };
        taskTypeContainer.onmouseout = (event) => {
            // taskTypeContainer.querySelector(".image-container img").classList.remove("image-slide-animation");
            taskTypeContainer.querySelector(".fading-effect").classList.remove("text-slide-animation");
            taskTypeContainer.querySelector(".image-container img").style.marginRight = "0px";
        };
        
        taskPriorityContainer.onmouseover = (event) => {
            //taskPriorityContainer.querySelector(".image-container img").classList.add("image-slide-animation");
            taskPriorityContainer.querySelector(".fading-effect").classList.add("text-slide-animation");
            taskPriorityContainer.querySelector(".image-container img").style.marginRight = Number(window.getComputedStyle(taskPriorityContainer.querySelector(".text-container")).width.replace("px", "")) + 5 + "px";
        };
        taskPriorityContainer.onmouseout = (event) => {
            //taskPriorityContainer.querySelector(".image-container img").classList.remove("image-slide-animation");
            taskPriorityContainer.querySelector(".fading-effect").classList.remove("text-slide-animation");
            taskPriorityContainer.querySelector(".image-container img").style.marginRight = "0px";
        };
    }

    renderTaskFilters() {
        let { taskFilters } = this.state;

        return (
            <div className='flex'>
                {taskFilters.map(filter => { return( <label className='task-filter'>{filter}</label> ) })}
            </div>
        );
    }

    render() {
        let { status } = this.state;

        return (
            <div className='task flex column'>

                <div className='flex'>
                    <div className='flex' style={{ position: "absolute", height: "3rem", marginLeft: "10px" }}>
                        <img style={{
                            height: "100%",
                            borderRadius: "50%",
                            outline: "2px solid var(--theme-color-bg-1)"
                        }} src={testAssigneeProfilePic}/>
                        <div className='separator-vertical' style={{ marginLeft: "0.8rem", height: "80%" }} />
                    </div>
                    
                    <label style={{ lineHeight: "3rem", textIndent: "5rem", fontSize: "2rem", margin: "0 0 0.8rem 1rem" }}>Task Name</label>
                </div>

                <div className='task-content flex column'>

                    {/* <div className='separator width-100-percent' style={{ margin: "0.2rem auto 1rem auto" }}/> */}

                    {/* <div className='task-associated-people-container flex justify-space-between'>
                        <div className='flex align-center justify-center'>
                            <label>Creator:</label>
                            <img src={testCreatorProfilePic}/>
                        </div>
                        <div className='flex align-center justify-center'>
                            <label>Assignee:</label>
                            <img src={testAssigneeProfilePic}/>
                        </div>
                    </div> */}

                    <div className='task-info-icons-container flex justify-space-between'>
                        <label style={{ marginRight: "auto" }}>Status: {status}</label>

                        <div className='task-info-icons-animation-container flex'>
                            <div className='task-type-info-container flex'>
                                <div className="image-container">
                                    <img src={taskIcon}/>
                                </div>
                                <div className="text-container">
                                    <label>Task</label>
                                    <div className="fading-effect"></div>
                                </div>
                            </div>
                        
                            <div className='separator-vertical' style={{ zIndex: "5" }} />

                            <div className='task-priority-info-container flex'>
                                <div className="image-container">
                                    <img src={highPriority}/>
                                </div>
                                <div className="text-container">
                                    <label>High</label>
                                    <div className="fading-effect"></div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='task-filters-container flex'>
                        {this.renderTaskFilters()}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Task;