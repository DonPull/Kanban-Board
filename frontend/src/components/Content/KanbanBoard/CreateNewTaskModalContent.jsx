import React, { useState, useEffect } from 'react';
import AccountAsListItem from '../../AccountAsListItem';
import './CreateNewTaskModalContent.css';
import addAccountIcon from '../../../assets/+_and_x_icon_v4.png';
import axios from 'axios';
import apiEndpoint from './../../../index';

function CreateNewTaskModalContent(props) {
    const [boardParticipantsObj, setBoardParticipantsObj] = useState([]);
    const [createTaskBtnRef, setCreateTaskBtnRef] = useState(React.createRef());
    const [taskAssigneesIds, setTaskAssigneesIds] = useState([]);
    const [typePriorityStatusInputsContainerId, setTypePriorityStatusInputsContainerId] = useState("create-new-task-enter-type-priority-status-container");
    const [taskDescriptionContainerId, setTaskDescriptionContainerId] = useState("task-description-container");
    const [taskTimeEstimatesContainerId, setTaskTimeEstimatesContainerId] = useState("task-time-estimates-container");
    const [newTaskTitleContainerId, setNewTaskTitleContainerId] = useState("create-new-task-title-container");

    useEffect(() => {
        setBoardParticipantsObj(props.boardParticipantsObj);
    }, [props.boardParticipantsObj]);

    useEffect(() => {
        createTaskBtnRef.current.onclick = () => {
            let { projectId, boardId } = props;
            let taskObj = {"ProjectRefId": projectId, "BoardRefId": boardId, "ColumnRefId": ""}; // TODO: DA SE DOVURSHI

            axios.post(apiEndpoint + "/Task/create", taskObj).then(response => {
                setBoardParticipantsObj(response.data);
            }).catch(error => {
                console.log("Failed to get board participants.");
            });

            console.log(taskAssigneesIds);
        }
    }, [createTaskBtnRef]);

    let taskAssigneeAccoutOnClickCallback = (clickedAccountElement, accountIsSelected, accountObj) => {
        let addOrRemoveIcon = clickedAccountElement.querySelectorAll("img")[1];
        
        if(accountIsSelected){
            taskAssigneesIds.push(accountObj["Id"]);
            clickedAccountElement.style.borderColor = "#B7F7C4";
            addOrRemoveIcon.style.transform = "rotate(45deg)";
            addOrRemoveIcon.style.filter = "var(--theme-color-green-filter)";
        }else{
            taskAssigneesIds.splice(taskAssigneesIds.indexOf(accountObj["Id"]), 1);
            clickedAccountElement.style.borderColor = "var(--theme-color-bg-element)";
            addOrRemoveIcon.style.transform = "rotate(0deg)";
            addOrRemoveIcon.style.filter = "";
        }

        setTaskAssigneesIds(taskAssigneesIds);
    }

    return ( 
        <div id="create-new-task-modal-content-container" className='flex column align-center'>
            <div id={newTaskTitleContainerId} className='flex join-project-input-pill'>
                <label>Task Title</label>
                <div style={{ margin: "0 0.5rem", height: "auto" }} className='separator-vertical' />
                <input type='text' />
            </div>

            <div id={typePriorityStatusInputsContainerId} className='flex join-project-input-pill'>
                <div className='flex'>
                    <label>Type:</label>
                    <input />
                </div>
                <div style={{ margin: "0 0.5rem", height: "auto" }} className='separator-vertical' />
                <div className='flex'>
                    <label>Priority:</label>
                    <input />
                </div>
                <div style={{ margin: "0 0.5rem", height: "auto" }} className='separator-vertical' />
                <div className='flex'>
                    <label>Status:</label>
                    <input />
                </div>
            </div>

            <div id={taskDescriptionContainerId}>
                <label className='crete-new-task-label'>Description</label>
                <textarea placeholder='Type your task description here.'/>
            </div>

            <div id="task-assignees-and-time-estimates-container" className='flex justify-space-between width-100-percent'>
                <div className='flex column'>
                    <label className='crete-new-task-label'>Task Assignees</label>
                    <div id="task-assignees-showcase-container">
                        {boardParticipantsObj.map(e => {
                            return <AccountAsListItem onClickCallback={(clickedAccountElement, accountIsSelected) => { taskAssigneeAccoutOnClickCallback(clickedAccountElement, accountIsSelected, e) }} accountName={e["FullName"]} accountEmail={e["Email"]} accountPfp={e["ProfilePicture"]} accountActionIcon={addAccountIcon} />
                        })}
                        {/* <AccountAsListItem boardParticipantsObj={boardParticipantsObj} />
                        <AccountAsListItem />
                        <AccountAsListItem />
                        <AccountAsListItem />
                        <AccountAsListItem />
                        <AccountAsListItem /> */}
                    </div>
                </div>

                <div className='flex column align-center'>
                    <div id={taskTimeEstimatesContainerId}>
                        <div className='flex'>
                            <label>Estimate: </label>
                            <input />
                        </div>
                        <div className='separator' style={{ width: "100%", margin: "1rem auto" }} />
                        <div className='flex'>
                            <label>Remaining: </label>
                            <input />
                        </div>
                    </div>

                    <button ref={createTaskBtnRef} className='button width-100-percent' style={{ marginTop: "auto" }}>Create Task</button>
                </div>
            </div>
        </div>
    );
}

export default CreateNewTaskModalContent;