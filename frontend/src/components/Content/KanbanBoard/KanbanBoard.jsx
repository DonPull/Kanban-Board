import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Task from '../Tasks/Task';
import "./KanbanBoard.css";
import newTaskIcon from '../../../assets/+_and_x_icon.svg';
import KanbanColumn from './KanbanColumn';

class KanbanBoard extends Component {
    state = { 
        tasksInfo: [
            { columnName: "ToDo", tasks: [
                    {
                        projectOriginOfTask: "Project 1",
                        taskType: "Task",
                        taskPriority: "High",
                        taskStatus: "ToDo",
                        taskTitle: "Task 1 in ToDo",
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

    render() {
        let { tasksInfo } = this.state;
        return (
            <div className="kanban-board flex width-100-percent">
                {tasksInfo.map(info => { 
                        return( 
                            <React.Fragment>
                                <KanbanColumn tasksInfo={info} />
                                {/* the line of code below renders separators between the columns but not after the last one so that we don't have a trailing separator */}
                                {tasksInfo.indexOf(info) !== tasksInfo.length - 1 ? <div className="separator-vertical" style={{ margin: "auto 2rem" }} /> : ""}
                            </React.Fragment>
                        ); 
                    })
                }
                <div className='add-new-task-btn'>
                    <img src={newTaskIcon}/>
                </div>
            </div>
        );
    }
}
 
export default KanbanBoard;