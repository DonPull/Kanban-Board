import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./TaskContent.css";
import closeBtnIcon from "../../../assets/+_and_x_icon.svg";
import testCreatorIcon from "../../../assets/test_profile_pic_1.jpg";
import testAssigneeIcon from "../../../assets/test_profile_pic_2.jpg";

class TaskContent extends Component {
    state = { 
        taskInfo: this.props.taskInfo,
        taskContentContainerRef: React.createRef(),
        taskContentContainerCloseBtnRef: React.createRef()
    }

    componentDidMount(){
        let { taskContentContainerRef, taskContentContainerCloseBtnRef } = this.state;
        this.props.getCloseBtn(taskContentContainerCloseBtnRef.current);

        let taskContentContainer = taskContentContainerRef.current;
        taskContentContainer.querySelectorAll(".content-pill").forEach(pill => {
            let taskContentContainerStyles = window.getComputedStyle(pill);
            let taskContentContainerHeight = Number(taskContentContainerStyles.height.replace("px", ""));
            let taskContentContainerPaddingTop = Number(taskContentContainerStyles.paddingTop.replace("px", ""));
            let taskContentContainerPaddingBottom = Number(taskContentContainerStyles.paddingBottom.replace("px", ""));

            pill.querySelectorAll(".separator-vertical").forEach(e => {
                //the line of code below makes all ".separator-vertical" that are inside of ".content-pill" 80% of the height of the ".content-pill" (we subtract the padding to get the real height numbers we need)
                e.style.height = ((taskContentContainerHeight - taskContentContainerPaddingTop - taskContentContainerPaddingBottom) / 100) * 80 + "px";
            });
        });
    }

    render() {
        let { taskInfo, taskContentContainerRef, taskContentContainerCloseBtnRef } = this.state;

        return (
            <div ref={taskContentContainerRef} className='task-content-container flex column width-100-percent height-100-percent'>
                <div className='flex justify-space-between width-100-percent'>
                    <div className='task-title-container'>
                        <label title={taskInfo.taskTitle}>{taskInfo.taskTitle}</label>
                    </div>
                    <div ref={taskContentContainerCloseBtnRef} className='close-button-container'>
                        <img src={closeBtnIcon} />
                    </div>
                </div>

                <div className='content-pill margin-top-10px'>
                    <label>Type: {taskInfo.taskType}</label>
                    <div className='separator-vertical'/>
                    <label>Priority: {taskInfo.taskPriority}</label>
                    <div className='separator-vertical'/>
                    <label>Status: {taskInfo.taskStatus}</label>
                </div>

                <div className='content-pill margin-top-10px'>
                    <label>Created: {taskInfo.taskCreatedDate}</label>
                    <div className='separator-vertical'/>
                    <label>Last Updated: {taskInfo.taskUpdatedDate}</label>
                </div>

                <div className='main-section-separator'/>
                {/* <div className='separator' style={{ margin: "2rem 0 0 0", width: "100%" }}/> */}

                <div className='task-content-main-container flex justify-space-between margin-top-20px'>
                    <div className='task-content-main-container-column'>
                        <div className='task-description-container'>
                            <label className='task-content-label'>Description</label>
                            <div>
                                This is a sample description
                            </div>
                        </div>

                        <div className='task-content-filters-container flex column'>
                            <label className='task-content-label' style={{ fontSize: "1.8rem" }}>Filters</label>
                            <div className='flex'>
                                {taskInfo.taskFilters.map(f => { return( <label className='task-filter'>{f}</label> ); })}
                            </div>
                        </div>
                    </div>

                    <div className='task-content-main-container-column' style={{ marginTop: "1rem" }}>
                        <div className='flex column'>
                            <div className='task-associated-people-container content-pill'>
                                <label>Creator:</label>
                                <label>{taskInfo.taskCreator.name}</label>
                                <img src={testCreatorIcon} />
                            </div>
                            <div className='task-associated-people-container content-pill'>
                                <label>Assignee:</label>
                                <label>{taskInfo.taskAssignee.name}</label>
                                <img src={testAssigneeIcon} />
                            </div>
                        </div>

                        <div className='task-log-container'>
                            <label className='task-content-label'>Log</label>
                            <div>
                                This is a sample Log
                            </div>
                        </div>

                        <div className='task-content-duration-info'>
                            <div className='content-pill column margin-top-10px'>
                                <label>Time Estimate: {taskInfo.taskEstimate}</label>
                                <div className='separator'/>
                                <label>Time Remaining: {taskInfo.timeRemainingBeforeDone}</label>
                                <div className='separator'/>
                                <label>Time In Current Column: {taskInfo.taskDurationInCurrentColumn}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default TaskContent;