import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Task from './Task';
import "./KanbanBoard.css";

class KanbanBoard extends Component {
    state = {  } 
    render() { 
        return (
            <div className="kanban-board flex width-100-percent">

                <div className='kanban-column flex column align-center'>
                    <div className='kanban-column-header flex column'>
                        <label>To Do</label>
                    </div>

                    <Task />
                </div>

                <div className="separator-vertical" />

                <div className='kanban-column flex column align-center'>
                    <div className='kanban-column-header flex column'>
                        <label>Doing</label>
                    </div>
                </div>

                <div className="separator-vertical" />

                <div className='kanban-column flex column align-center'>
                    <div className='kanban-column-header flex column'>
                        <label>Done</label>
                    </div>
                </div>

                <div className="separator-vertical" />

                <div className='kanban-column flex column align-center'>
                    <div className='kanban-column-header flex column'>
                        <label>Extra column</label>
                    </div>
                </div>

            </div>
        );
    }
}
 
export default KanbanBoard;