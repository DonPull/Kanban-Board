import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';
import Modal from '../../Modal';
import Task from '../Tasks/Task';
import TaskContent from '../Tasks/TaskContent';
import '../Tasks/Task.css';

class KanbanColumn extends Component {
    state = { 
        columnName: this.props.tasksInfo.columnName,
        tasks: this.props.tasksInfo.tasks
    }

    render() {
        let { columnName, tasks } = this.state;
        return (
            <div className='kanban-column flex column align-center'>
                <div className='kanban-column-header-background'>
                    <div className='kanban-column-header flex column'>
                        <label>{columnName}</label>
                    </div>
                </div>

                {tasks.map(info => {
                    let taskUniqueId = uuid();
                    return(
                        <React.Fragment>
                            <Task taskId={taskUniqueId} taskInfo={info} />
                            <Modal modalContent={<TaskContent taskInfo={info} />} openBtnId={taskUniqueId} />
                        </React.Fragment>
                    );
                })}
            </div>
        );
    }
}
 
export default KanbanColumn;