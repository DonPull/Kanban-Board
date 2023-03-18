import React, { useState, useEffect } from 'react';
import './ViewBoards.css';
import { useParams } from 'react-router-dom';
import BoardCard from './BoardCard';
import deletePorjectIcon from '../../../assets/delete.png';
import DeleteProjectModalContent from './DeleteProjectModalContent';
import Modal from './../../Modal';
import axios from 'axios';
import apiEndpoint from './../../../index';

function ViewBoards() {
    const { projectId } = useParams();
    const [projectObj, setProjectObj] = useState({});
    const [deleteProjectBtnId, setDeleteProjectBtnId] = useState("delete-project-button");

    useEffect(() => {
        axios.get(apiEndpoint + "/Project/" + projectId).then(response => {
            console.log(response.data);
            setProjectObj(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div className='flex column height-100-percent no-user-select-children'>
            <div id="project-settings-container" className='flex'>
                <div id="project-settings-label">Settings</div>

                <div id={deleteProjectBtnId} className='flex'>
                    <img src={deletePorjectIcon}/>
                    <label>Delete Project</label>
                </div>
            </div>

            <div className='main-section-separator' style={{ marginTop: "0" }} />

            <div id="board-cards-container" className='height-100-percent'>
                <label id="board-cards-container-background">BOARDS</label>
                <button id="create-new-board-btn" className='button'>Create New Board</button>
                <BoardCard />
            </div>

            <Modal modalContent={<DeleteProjectModalContent projectObj={projectObj} />} openBtnId={deleteProjectBtnId} />
        </div>
    );
}

export default ViewBoards;
