//import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import Task from '../Tasks/Task';
import { useParams } from 'react-router-dom';
import "./KanbanBoard.css";
import addBtn from '../../../assets/+_and_x_icon.svg';
import KanbanColumn from './KanbanColumn';
import apiEndpoint from './../../../index';
import JoinProjectModalContent from './../../Sidebar/ProjectButtons/JoinProjectModalContent';
import Modal from './../../Modal';
import axios from 'axios';
import Toast from './../../Toast';
import CreateNewTaskModalContent from './CreateNewTaskModalContent';

function KanbanBoard () {
    const { projectId, boardId } = useParams();
    const [mainActionBtnIsToggled, setMainActionBtnIsToggled] = useState(false);
    const [mainActionBtnRef, setMainActionBtnRef] = useState(React.createRef());
    const [createNewTaskBtnRef, setCreateNewTaskBtnRef] = useState(React.createRef());
    const [createNewTaskBtnId, setCreateNewTaskBtnId] = useState("create-new-task-btn");
    const [createNewColumnBtnRef, setCreateNewColumnBtnRef] = useState(React.createRef());
    const [createNewColumnBtnId, setCreateNewColumnBtnId] = useState("create-new-column-btn");
    const [toastObj, setToastObj] = useState({
        show: false,
        message: null,
        duration: 3000,
        type: "error"
    });
    const [tasksInfo, setTasksInfo] = useState([
        { columnName: "ToDo", tasks: [
                {
                    projectOriginOfTask: "Project 1",
                    taskType: "Task",
                    taskPriority: "High",
                    taskStatus: "ToDo",
                    taskTitle: "Task 1 in ToDo Task 1 in ToDo Task 1 in ToDo Task 1 in ToDo Task 1 in ToDo Task 1 in ToDo Task 1 in ToDo Task 1 in ToDo Task 1 in ToDo Task 1 in ToDo Task 1 in ToDo",
                    taskDescription: "Sample HTML",
                    taskAttachments: "Sample attachments",
                    taskAssignee: {
                        name: "Ivan Konalev",
                        picture: "Blob format picture"
                    },
                    taskCreator: {
                        name: "Mitko Gatev",
                        picture: "Blob format picture"
                    },
                    taskFilters: ["Bug", "Backend", "Frontend", "Ivan", "Icovich"],
                    taskCreatedDate: "25.11.2022",
                    taskUpdatedDate: "03.12.2022",
                    taskEstimate: "01.12.2022",
                    timeRemainingBeforeDone: "5days, 2hours",
                    taskWorkLog: "Ivan Konalev worked 2 hours on the task on 27.11.2022",
                    taskDurationInCurrentColumn: "11days"
                },
                {
                    projectOriginOfTask: "Project 1",
                    taskType: "WorkPack",
                    taskPriority: "Critical",
                    taskStatus: "Task Is Very Much Done And Complete",
                    taskTitle: "Task 2 in ToDo",
                    taskDescription: "Sample HTML",
                    taskAttachments: "Sample attachments",
                    taskAssignee: {
                        name: "Ivan Konalev",
                        picture: "Blob format picture"
                    },
                    taskCreator: {
                        name: "Mitko Gatev",
                        picture: "Blob format picture"
                    },
                    taskFilters: ["Icovich"],
                    taskCreatedDate: "25.11.2022",
                    taskUpdatedDate: "03.12.2022",
                    taskEstimate: "01.12.2022",
                    timeRemainingBeforeDone: "5days, 2hours",
                    taskWorkLog: "Ivan Konalev worked 2 hours on the task on 27.11.2022",
                    taskDurationInCurrentColumn: "11days"
                }
            ]
        },
        { columnName: "Doing", tasks: [
                {
                    projectOriginOfTask: "Project 1",
                    taskType: "Task",
                    taskPriority: "Low",
                    taskStatus: "Currently Doing",
                    taskTitle: "Task 1 in Doing",
                    taskDescription: "Sample HTML",
                    taskAttachments: "Sample attachments",
                    taskAssignee: {
                        name: "Ivan Konalev",
                        picture: "Blob format picture"
                    },
                    taskCreator: {
                        name: "Mitko Gatev",
                        picture: "Blob format picture"
                    },
                    taskFilters: ["Backend", "Ivan", "Icovich"],
                    taskCreatedDate: "25.11.2022",
                    taskUpdatedDate: "03.12.2022",
                    taskEstimate: "01.12.2022",
                    timeRemainingBeforeDone: "5days, 2hours",
                    taskWorkLog: "Ivan Konalev worked 2 hours on the task on 27.11.2022",
                    taskDurationInCurrentColumn: "11days"
                }
            ]
        },
        { columnName: "Done", tasks: [
                {
                    projectOriginOfTask: "Project 1",
                    taskType: "WorkPack",
                    taskPriority: "Medium",
                    taskStatus: "Done",
                    taskTitle: "Task 1 in Done",
                    taskDescription: "Sample HTML",
                    taskAttachments: "Sample attachments",
                    taskAssignee: {
                        name: "Ivan Konalev",
                        picture: "Blob format picture"
                    },
                    taskCreator: {
                        name: "Mitko Gatev",
                        picture: "Blob format picture"
                    },
                    taskFilters: ["Backend", "Icovich"],
                    taskCreatedDate: "25.11.2022",
                    taskUpdatedDate: "03.12.2022",
                    taskEstimate: "01.12.2022",
                    timeRemainingBeforeDone: "5days, 2hours",
                    taskWorkLog: "Ivan Konalev worked 2 hours on the task on 27.11.2022",
                    taskDurationInCurrentColumn: "11days"
                },
                {
                    projectOriginOfTask: "Project 1",
                    taskType: "Task",
                    taskPriority: "High",
                    taskStatus: "Task Is Very Much Done",
                    taskTitle: "Task 2 in Done",
                    taskDescription: "Sample HTML",
                    taskAttachments: "Sample attachments",
                    taskAssignee: {
                        name: "Ivan Konalev",
                        picture: "Blob format picture"
                    },
                    taskCreator: {
                        name: "Mitko Gatev",
                        picture: "Blob format picture"
                    },
                    taskFilters: ["Ivan", "Icovich", "Mitko"],
                    taskCreatedDate: "25.11.2022",
                    taskUpdatedDate: "03.12.2022",
                    taskEstimate: "01.12.2022",
                    timeRemainingBeforeDone: "5days, 2hours",
                    taskWorkLog: "Ivan Konalev worked 2 hours on the task on 27.11.2022",
                    taskDurationInCurrentColumn: "11days"
                },
                {
                    projectOriginOfTask: "Project 1",
                    taskType: "Epic",
                    taskPriority: "High",
                    taskStatus: "Task Is Very Much Done And Complete",
                    taskTitle: "Task 3 in Done",
                    taskDescription: "Sample HTML",
                    taskAttachments: "Sample attachments",
                    taskAssignee: {
                        name: "Ivan Konalev",
                        picture: "Blob format picture"
                    },
                    taskCreator: {
                        name: "Mitko Gatev",
                        picture: "Blob format picture"
                    },
                    taskFilters: ["Frontend", "Ivan"],
                    taskCreatedDate: "25.11.2022",
                    taskUpdatedDate: "03.12.2022",
                    taskEstimate: "01.12.2022",
                    timeRemainingBeforeDone: "5days, 2hours",
                    taskWorkLog: "Ivan Konalev worked 2 hours on the task on 27.11.2022",
                    taskDurationInCurrentColumn: "11days"
                },
                {
                    projectOriginOfTask: "Project 1",
                    taskType: "WorkPack",
                    taskPriority: "Medium",
                    taskStatus: "Done",
                    taskTitle: "Task 1 in Done",
                    taskDescription: "Sample HTML",
                    taskAttachments: "Sample attachments",
                    taskAssignee: {
                        name: "Ivan Konalev",
                        picture: "Blob format picture"
                    },
                    taskCreator: {
                        name: "Mitko Gatev",
                        picture: "Blob format picture"
                    },
                    taskFilters: ["Backend", "Icovich"],
                    taskCreatedDate: "25.11.2022",
                    taskUpdatedDate: "03.12.2022",
                    taskEstimate: "01.12.2022",
                    timeRemainingBeforeDone: "5days, 2hours",
                    taskWorkLog: "Ivan Konalev worked 2 hours on the task on 27.11.2022",
                    taskDurationInCurrentColumn: "11days"
                },
                {
                    projectOriginOfTask: "Project 1",
                    taskType: "WorkPack",
                    taskPriority: "Medium",
                    taskStatus: "Done",
                    taskTitle: "Task 1 in Done",
                    taskDescription: "Sample HTML",
                    taskAttachments: "Sample attachments",
                    taskAssignee: {
                        name: "Ivan Konalev",
                        picture: "Blob format picture"
                    },
                    taskCreator: {
                        name: "Mitko Gatev",
                        picture: "Blob format picture"
                    },
                    taskFilters: ["Backend", "Icovich"],
                    taskCreatedDate: "25.11.2022",
                    taskUpdatedDate: "03.12.2022",
                    taskEstimate: "01.12.2022",
                    timeRemainingBeforeDone: "5days, 2hours",
                    taskWorkLog: "Ivan Konalev worked 2 hours on the task on 27.11.2022",
                    taskDurationInCurrentColumn: "11days"
                },
                {
                    projectOriginOfTask: "Project 1",
                    taskType: "WorkPack",
                    taskPriority: "Medium",
                    taskStatus: "Done",
                    taskTitle: "Task 1 in Done",
                    taskDescription: "Sample HTML",
                    taskAttachments: "Sample attachments",
                    taskAssignee: {
                        name: "Ivan Konalev",
                        picture: "Blob format picture"
                    },
                    taskCreator: {
                        name: "Mitko Gatev",
                        picture: "Blob format picture"
                    },
                    taskFilters: ["Backend", "Icovich"],
                    taskCreatedDate: "25.11.2022",
                    taskUpdatedDate: "03.12.2022",
                    taskEstimate: "01.12.2022",
                    timeRemainingBeforeDone: "5days, 2hours",
                    taskWorkLog: "Ivan Konalev worked 2 hours on the task on 27.11.2022",
                    taskDurationInCurrentColumn: "11days"
                }
            ]
        },
        { columnName: "Extra Column", tasks: [
                {
                    projectOriginOfTask: "Project 1",
                    taskType: "Task",
                    taskPriority: "Medium",
                    taskStatus: "Task Is Very Much Done And Complete",
                    taskTitle: "Task 1 in Extra Column",
                    taskDescription: "Sample HTML",
                    taskAttachments: "Sample attachments",
                    taskAssignee: {
                        name: "Ivan Konalev",
                        picture: "Blob format picture"
                    },
                    taskCreator: {
                        name: "Mitko Gatev",
                        picture: "Blob format picture"
                    },
                    taskFilters: ["Frontend"],
                    taskCreatedDate: "25.11.2022",
                    taskUpdatedDate: "03.12.2022",
                    taskEstimate: "01.12.2022",
                    timeRemainingBeforeDone: "5days, 2hours",
                    taskWorkLog: "Ivan Konalev worked 2 hours on the task on 27.11.2022",
                    taskDurationInCurrentColumn: "11days"
                },
                {
                    projectOriginOfTask: "Project 1",
                    taskType: "WorkPack",
                    taskPriority: "High",
                    taskStatus: "Test Status",
                    taskTitle: "Task 2 in Extra Column",
                    taskDescription: "Sample HTML",
                    taskAttachments: "Sample attachments",
                    taskAssignee: {
                        name: "Ivan Konalev",
                        picture: "Blob format picture"
                    },
                    taskCreator: {
                        name: "Mitko Gatev",
                        picture: "Blob format picture"
                    },
                    taskFilters: ["Backend"],
                    taskCreatedDate: "25.11.2022",
                    taskUpdatedDate: "03.12.2022",
                    taskEstimate: "01.12.2022",
                    timeRemainingBeforeDone: "5days, 2hours",
                    taskWorkLog: "Ivan Konalev worked 2 hours on the task on 27.11.2022",
                    taskDurationInCurrentColumn: "11days"
                }
            ]
        }
    ]);


    /*state = {
        mainActionBtnIsToggled: false,
        mainActionBtnRef: React.createRef(),
        createNewTaskBtnRef: React.createRef(),
        createNewTaskBtnId: "create-new-task-btn",
        createNewColumnBtnRef: React.createRef(),
        createNewColumnBtnId: "create-new-column-btn",
        toastObj: {
            show: false,
            message: null,
            duration: 3000,
            type: "error"
        },
        tasksInfo: []
    }
    */

    let mainActionBtnOnClick = () => {
        //let { mainActionBtnIsToggled, mainActionBtnRef } = this.state;
        let mainActionBtn = mainActionBtnRef.current;
        let listOfActionButtons = document.querySelectorAll(".create-action-btn-container > *");

        //let tempMainActionBtnIsToggled = !mainActionBtnIsToggled;
        setMainActionBtnIsToggled(!mainActionBtnIsToggled);

        if(!mainActionBtnIsToggled){
            mainActionBtn.style.transform = "rotate(45deg)";
            //mainActionBtn.style.transform = "rotate(135deg)";
            listOfActionButtons.forEach(e => {
                if(e !== mainActionBtn){
                    e.style.transform = "translateY(0)";
                    e.style.opacity = "1";
                    e.style.cursor = "pointer";
                }
            });
        }else{
            mainActionBtn.style.transform = "rotate(0deg)";
            listOfActionButtons.forEach(e => {
                if(e !== mainActionBtn){
                    e.style.transform = "translateY(-3rem)";
                    e.style.opacity = "0";
                    e.style.cursor = "default";
                }
            });
        }
    }
    
    useEffect(() => {
        mainActionBtnRef.current.onclick = mainActionBtnOnClick;
    }, [mainActionBtnIsToggled]);

    //componentDidMount(){
    useEffect(() => {
        //let { mainActionBtnIsToggled, mainActionBtnRef, createNewTaskBtnRef, createNewColumnBtnRef } = this.state;

        let listOfActionButtons = document.querySelectorAll(".create-action-btn-container > *");
        let [mainActionBtn, createNewTaskBtn, createNewColumnBtn] = [mainActionBtnRef.current, createNewTaskBtnRef.current, createNewColumnBtnRef.current];

        listOfActionButtons.forEach(e => {
            if(e !== mainActionBtn){
                //center each action button relative to the main action button
                e.style.marginRight = `calc(${(Number(mainActionBtn.getBoundingClientRect().width) - Number(e.getBoundingClientRect().width)) + "px"} / 2)`;

                let eImg = e.querySelector("img");
                let eLabel = e.querySelector("label");

                e.onmouseover = (event) => {
                    // eImg.style.margin = `0 ${parseInt(Number(eLabel.getBoundingClientRect().width)) + 22 + "px"} 0 1rem`;
                    eImg.style.marginRight = parseInt(Number(eLabel.getBoundingClientRect().width)) + 12 + "px";
                    eLabel.style.opacity = "1";
                }
                e.onmouseout = (event) => {
                    eImg.style.margin = "0";
                    eLabel.style.opacity = "0";
                }
            }
        });
    }, []);
    //}

    let modifyToastObjCallback = (tObj) => {
        //this.setState(prevState => ({ toastObj: { ...prevState.toastObj, ...tObj } }));
        setToastObj(prevToastObj => { return { ...prevToastObj, ...tObj } })
    }

    //render() {
        //let { tasksInfo, mainActionBtnRef, createNewTaskBtnRef, createNewColumnBtnRef, createNewTaskBtnId, createNewColumnBtnId } = this.state;
        return (
            <div className="kanban-board flex width-100-percent">
                {tasksInfo.map(info => { 
                        return( 
                            <React.Fragment>
                                <KanbanColumn tasksInfo={info} />
                                {/* the line of code below renders separators between the columns but not after the last one so that we don't have a trailing separator */}
                                {tasksInfo.indexOf(info) !== tasksInfo.length - 1 ? <div className="separator-vertical" style={{ margin: "auto 2rem", backgroundColor: "rgb(56 56 56)" }} /> : ""}
                            </React.Fragment>
                        ); 
                    })
                }
                <div className='create-action-btn-container flex column'>
                    <div ref={createNewTaskBtnRef} id={createNewTaskBtnId} className='new-task-action-btn action-btn' >
                        <img src={addBtn} style={{ width: "2rem" }} />
                        <div className="action-btn-text-container">
                            <label>New Task</label>
                        </div>
                    </div>
                    
                    <div ref={createNewColumnBtnRef} id={createNewColumnBtnId} className='new-column-action-btn action-btn' >
                        <img src={addBtn} style={{ width: "2rem" }} />
                        <div className="action-btn-text-container">
                            <label>New Column</label>
                        </div>
                    </div>

                    <div ref={mainActionBtnRef} className='action-btn'>
                        <img src={addBtn}/>
                    </div>
                </div>

                {toastObj.show && <Toast closeToastCallbackFunction={() => { setToastObj(prevToastObj => { return { ...prevToastObj, show: false } }) }} toastMessage={toastObj.message} notificationDurationInMs={toastObj.duration} notificationType={toastObj.type} />}
                <Modal modalContent={<JoinProjectModalContent createColumnBoardId={boardId} modifyToastObjCallback={modifyToastObjCallback} />} openBtnId={createNewColumnBtnId} />
                <Modal modalContent={<CreateNewTaskModalContent modifyToastObjCallback={modifyToastObjCallback} />} openBtnId={createNewTaskBtnId} />
            </div>
        );
    //}
}
 
export default KanbanBoard;