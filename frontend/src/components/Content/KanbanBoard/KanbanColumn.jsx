import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Task from './Task';

class KanbanColumn extends Component {
    state = { 
        columnName: this.props.tasksInfo.columnName,
        tasks: this.props.tasksInfo.tasks
    }

    render() { 
        let { columnName, tasks } = this.state;
        return (
            <div className='kanban-column flex column align-center'>
                <div className='kanban-column-header flex column'>
                    <label>{columnName}</label>
                </div>

                {tasks.map(info => { return( <Task taskInfo={info} /> ); })}
            </div>
        );
    }
}
 
export default KanbanColumn;