import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class KanbanBoard extends Component {
    state = {  } 
    render() { 
        return (
            <div className="kanban-board flex justify-center width-100-percent">

                <div className='kanban-column flex column align-center'>
                    <div className='kanban-column-header flex column'>
                        <label>To Do</label>
                    </div>
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

            </div>
        );
    }
}
 
export default KanbanBoard;