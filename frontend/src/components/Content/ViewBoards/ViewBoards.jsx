import React, { useState, useEffect } from 'react';
import './ViewBoards.css';
import { useParams } from 'react-router-dom';
import BoardCard from './BoardCard';

function ViewBoards() {
    const { projectId } = useParams();

    return (
        <div className='flex column height-100-percent no-user-select-children'>
            <div id="project-settings-container" className='flex'>
                <div id="project-settings-label">
                    Settings:
                </div>
            </div>

            <div className='main-section-separator' style={{ marginTop: "0" }} />

            <div id="board-cards-container" className='height-100-percent'>
                <label id="board-cards-container-background">BOARDS</label>
                <button id="create-new-board-btn" className='button'>Create New Board</button>
                <BoardCard />
            </div>
        </div>
    );
}

export default ViewBoards;
