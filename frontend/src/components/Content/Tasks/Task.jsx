import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./Task.css";
import FilterPill from '../Filters/FilterPill';
import taskIcon from '../../../assets/task_icon.png';
import workpackIcon from '../../../assets/workpack.svg';
import lowPriority from '../../../assets/low_priority.png';
import mediumPriority from '../../../assets/medium_priority.png';
import highPriority from '../../../assets/high_priority.png';
import criticalPriority from '../../../assets/critical_priority.png';
import testCreatorProfilePic from '../../../assets/test_profile_pic_1.jpg';
import testAssigneeProfilePic from '../../../assets/test_profile_pic_2.jpg';

class Task extends Component {
    state = {
        taskInfo: this.props.taskInfo,
        // taskFilters: ["Backend", "Frontend", "Ivan", "Icovich"],
        // status: "Task Is Very Much Done And Complete",
        taskRef: React.createRef(),
        taskInfoContainerRef: React.createRef(),
        taskIconsContainerRef: React.createRef(),
        taskTypeContainerRef: React.createRef(),
        taskPriorityContainerRef: React.createRef(),
        statusLabelRef: React.createRef()
    };

    componentDidMount(){
        let { taskRef, taskInfoContainerRef, taskIconsContainerRef, taskTypeContainerRef, taskPriorityContainerRef, statusLabelRef } = this.state;
        let [task, taskInfoContainer, taskIconsContainer, taskTypeContainer, taskPriorityContainer, statusLabel] = [taskRef.current, taskInfoContainerRef.current, taskIconsContainerRef.current, taskTypeContainerRef.current, taskPriorityContainerRef.current, statusLabelRef.current];
        
        this.taskOnDrag(task);

        let taskInfoContainerWidth = Number(window.getComputedStyle(taskInfoContainer).width.replace("px", ""));
        let taskIconsContainerWidth = Number(window.getComputedStyle(taskIconsContainer).width.replace("px", ""));
        let statusLabelWidth = Number(window.getComputedStyle(statusLabel).width.replace("px", ""));

        statusLabel.style.maxWidth = (taskInfoContainerWidth - taskIconsContainerWidth - 10) + "px";

        function onMouseOver (event, element) {
            let imgMarginRight = Number(window.getComputedStyle(element.querySelector(".text-container")).width.replace("px", "")) + 5 + "px";
            if((statusLabelWidth + taskIconsContainerWidth + Number(imgMarginRight.replace("px", ""))) > taskInfoContainerWidth){
                statusLabel.style.opacity = "0.5";
                statusLabel.style.filter = "blur(4px)";
            }

            element.querySelector(".fading-effect").classList.add("text-slide-animation");
            element.querySelector(".image-container img").style.marginRight = imgMarginRight;
        };
        function onMouseOut (event, element) {
            statusLabel.style.opacity = "1";
            statusLabel.style.filter = "blur(0px)";
            element.querySelector(".fading-effect").classList.remove("text-slide-animation");
            element.querySelector(".image-container img").style.marginRight = "0px";
        }

        taskTypeContainer.onmouseover = (event) => { onMouseOver(event, taskTypeContainer) };
        taskTypeContainer.onmouseout = (event) => { onMouseOut(event, taskTypeContainer) };
        
        taskPriorityContainer.onmouseover = (event) => { onMouseOver(event, taskPriorityContainer) };
        taskPriorityContainer.onmouseout = (event) => { onMouseOut(event, taskPriorityContainer) };
    }

    taskOnDrag(task) {
        task.ondrag = (event) => {
            console.log("task on drag: ", event);
        };
    }

    renderTaskFilters() {
        let { taskInfo } = this.state;
        return (
            <div className='flex'>
                {taskInfo.taskFilters.map(filter => { return( <label className='task-filter'>{filter}</label> ) })}
            </div>
        );
    }

    render() {
        let { taskRef, taskInfo, taskInfoContainerRef, taskIconsContainerRef, taskTypeContainerRef, taskPriorityContainerRef, statusLabelRef } = this.state;

        return (
            <div ref={taskRef} id={this.props.taskId} className='task flex column'>

                <div className='flex' style={{ position: "relative" }}>
                    <div className='flex' style={{ position: "absolute", height: "3rem", marginLeft: "1rem", marginTop: "0.1rem" }}>
                        <img style={{
                            height: "100%",
                            borderRadius: "50%",
                            outline: "2px solid var(--theme-color-bg-1)"
                        }} src={testAssigneeProfilePic}/>
                        <div className='separator-vertical' style={{ marginLeft: "0.8rem", height: "80%" }} />
                    </div>
                    
                    <label title={taskInfo.taskTitle} className='task-title'>{taskInfo.taskTitle}</label>
                </div>

                <div className='task-content flex column'>

                    <div ref={taskInfoContainerRef} className='task-info-icons-container flex justify-space-between'>
                        <label ref={statusLabelRef} className="task-status">Status: {taskInfo.taskStatus}</label>

                        <div ref={taskIconsContainerRef} className='task-info-icons-animation-container flex'>

                            <div ref={taskTypeContainerRef} className='task-type-info-container flex'>
                                <div className="image-container">
                                    <img src={taskIcon}/>
                                </div>
                                <div className="text-container">
                                    <label>Task</label>
                                    <div className="fading-effect"></div>
                                </div>
                            </div>
                        
                            <div className='separator-vertical' style={{ zIndex: "5" }} />

                            <div ref={taskPriorityContainerRef} className='task-priority-info-container flex'>
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