import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Task from './Task';
import "./KanbanBoard.css";
import KanbanColumn from './KanbanColumn';

class KanbanBoard extends Component {
    state = { 
        tasksInfo: [
            { columnName: "ToDo", tasks: [
                    {
                        taskFilters: ["Backend", "Frontend", "Ivan", "Icovich"],
                        status: "Task Is Very Much Done And Complete"
                    },
                    {
                        taskFilters: ["Filter1", "Filter2", "Filter3"],
                        status: "Task 2 in column ToDo"
                    }
                ]
            },
            { columnName: "Doing", tasks: [
                    {
                        taskFilters: ["Backend", "Frontend", "Ivan", "Icovich"],
                        status: "Task 2 in column Doing Is Very Much Done And Complete"
                    }
                ]
            },
            { columnName: "Done", tasks: [
                    {
                        taskFilters: ["Backend", "Frontend", "Ivan", "Icovich"],
                        status: "Task Is Very Much Done And Complete"
                    },
                    {
                        taskFilters: ["Filter1", "Filter2", "Filter3"],
                        status: "Task 2 in column Done"
                    },
                    {
                        taskFilters: ["Filter1", "Filter2", "Filter3"],
                        status: "Task 3 in column Done"
                    }
                ]
            },
            { columnName: "Extra Column", tasks: [
                    {
                        taskFilters: ["Backend", "Frontend", "Ivan", "Icovich"],
                        status: "Task Is Very Much Done And Complete"
                    },
                    {
                        taskFilters: ["Filter1", "Filter2", "Filter3"],
                        status: "Task 2 in column Extra Column"
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
                                {tasksInfo.indexOf(info) !== tasksInfo.length - 1 ? <div className="separator-vertical" /> : ""}
                            </React.Fragment>
                        ); 
                    })
                }
            </div>
        );
    }
}
 
export default KanbanBoard;