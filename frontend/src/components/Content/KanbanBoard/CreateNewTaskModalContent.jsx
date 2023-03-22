import React, { useState, useEffect } from 'react';
import AccountAsListItem from '../../AccountAsListItem';
import './CreateNewTaskModalContent.css';

function CreateNewTaskModalContent(props) {
    return ( 
        <div id="create-new-task-modal-content-container" className='flex column align-center'>
            <div id="create-new-task-title-container" className='flex join-project-input-pill'>
                <label>Task Title</label>
                <div style={{ margin: "0 0.5rem", height: "auto" }} className='separator-vertical' />
                <input type='text' />
            </div>

            <div id="create-new-task-enter-type-priority-status-container" className='flex join-project-input-pill'>
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

            <div id="task-description-container">
                <label className='crete-new-task-label'>Description</label>
                <textarea placeholder='Type your task description here.'/>
            </div>

            <div id="task-assignees-and-time-estimates-container" className='flex justify-space-between width-100-percent'>
                <div className='flex column'>
                    <label className='crete-new-task-label'>Task Assignees</label>
                    <div id="task-assignees-showcase-container">
                        <AccountAsListItem />
                    </div>
                </div>

                <div id="task-time-estimates-container">
                    <div className='flex'>
                        <label>Estimate: </label>
                        <input />
                    </div>
                    <div className='flex'>
                        <label>Remaining: </label>
                        <input />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateNewTaskModalContent;