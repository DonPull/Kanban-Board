import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Task from '../Tasks/Task';
import "./KanbanBoard.css";
import addBtn from '../../../assets/+_and_x_icon.svg';
import KanbanColumn from './KanbanColumn';

class KanbanBoard extends Component {
    state = {
        mainActionBtnIsToggled: false,
        tasksInfo: [
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
        ]
    }

    componentDidMount(){
        let listOfActionButtons = document.querySelectorAll(".create-action-btn-container > *");
        let mainActionBtn = listOfActionButtons[listOfActionButtons.length - 1];
        let { mainActionBtnIsToggled } = this.state;

        mainActionBtn.onclick = (event) => {
            mainActionBtnIsToggled = !mainActionBtnIsToggled;

            if(mainActionBtnIsToggled){
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
    }

    render() {
        let { tasksInfo } = this.state;
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
                    <div className='new-task-action-btn action-btn' >
                        <img src={addBtn} style={{ width: "2rem" }} />
                        <div className="action-btn-text-container">
                            <label>New Task</label>
                        </div>
                    </div>
                    
                    <div className='new-column-action-btn action-btn' >
                        <img src={addBtn} style={{ width: "2rem" }} />
                        <div className="action-btn-text-container">
                            <label>New Column</label>
                        </div>
                    </div>

                    <div className='action-btn'>
                        <img src={addBtn}/>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default KanbanBoard;