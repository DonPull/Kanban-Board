import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./TaskContent.css";
import closeBtnIcon from "../../../assets/+_and_x_icon.svg";
import testCreatorIcon from "../../../assets/test_profile_pic_1.jpg";
import testAssigneeIcon from "../../../assets/test_profile_pic_2.jpg";

class TaskContent extends Component {
    state = { 
        taskInfo: this.props.taskInfo
     } 
    render() {
        let { taskInfo } = this.state;

        return (
            <div className='task-content-container flex column width-100-percent height-100-percent'>
                <div className='flex justify-space-between width-100-percent'>
                    <div className='task-title-container'>
                        <label>{taskInfo.taskTitle}</label>
                    </div>
                    <div className='close-button-container'>
                        <img src={closeBtnIcon} />
                    </div>
                </div>

                <div className='flex'>
                    <label>Created: {taskInfo.taskCreatedDate}</label>
                    <div className='separator-vertical'/>
                    <label>Last Updated: {taskInfo.taskUpdatedDate}</label>
                </div>

                <div className='flex width-100-percent'>
                    <label>Type: {taskInfo.taskType}</label>
                    <div className='separator-vertical'/>
                    <label>Priority: {taskInfo.taskPriority}</label>
                    <div className='separator-vertical'/>
                    <label>Status: {taskInfo.taskStatus}</label>
                </div>

                <div className='task-content-main-container flex justify-space-between'>
                    <div className='task-description-container flex column'>
                        <label>Description</label>
                        <div className='padding-top-20px'>
                            This is a sample description
                        </div>
                    </div>

                    <div className='flex column'>
                        <div className='flex column'>
                            <div>
                                <label>Creator:</label>
                                <img src={testCreatorIcon} />
                                <label>{taskInfo.taskCreator.name}</label>
                            </div>
                            <div>
                                <label>Assignee:</label>
                                <img src={testAssigneeIcon} />
                                <label>{taskInfo.taskAssignee.name}</label>
                            </div>
                        </div>

                        <div className='task-log-container'>
                            <label>Log</label>
                            <div className='padding-top-20px'>
                                This is a sample Log
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default TaskContent;