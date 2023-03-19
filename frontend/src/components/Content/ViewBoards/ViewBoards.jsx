import React, { useState, useEffect } from 'react';
import './ViewBoards.css';
import { useParams } from 'react-router-dom';
import BoardCard from './BoardCard';
import deletePorjectIcon from '../../../assets/delete.png';
import joinCodeButtonIcon from '../../../assets/join_project.png';
import DeleteProjectModalContent from './DeleteProjectModalContent';
import Modal from './../../Modal';
import axios from 'axios';
import apiEndpoint from './../../../index';
import { Navigate } from 'react-router-dom';

function ViewBoards(props) {
    const { projectId } = useParams();
    const [projectIsValid, setProjectIsValid] = useState(false); // this is needed to display an empty string as DOM until we get a response from the axios request at which point we can redirect the user to an error page if the request fails or display the Board of the Project if the request does not fail (which confirms that a project with the requested id exists)
    const [projectIsInvalidSoRedirectTheUser, setProjectIsInvalidSoRedirectTheUser] = useState(false); // this is needed to do the actual redirecting of the user in case the axios request fails
    const [projectObj, setProjectObj] = useState({});
    const [deleteProjectBtnId, setDeleteProjectBtnId] = useState("delete-project-button");
    const [userIsOwner, setUserIsOwner] = useState(false);
    const [revealProjectJoinCodeBtnRef, setRevealProjectJoinCodeBtnRef] = useState(React.createRef());
    const [revealProjectJoinCodeText, setRevealProjectJoinCodeText] = useState("Reveal Join Code");

    useEffect(() => {
        axios.get(apiEndpoint + "/Project/" + projectId).then(response => {
            console.log(response.data);
            setProjectObj(response.data);
            setUserIsOwner(props.user.id === response.data["OwnerId"]);
            setProjectIsValid(true);
        }).catch(error => {
            setProjectIsValid(false);
            setProjectIsInvalidSoRedirectTheUser(true);
        });
    }, []);

    useEffect(() => {
        if(projectIsValid){
            revealProjectJoinCodeBtnRef.current.onmouseover = revealProjectJoinCode;
            revealProjectJoinCodeBtnRef.current.onmouseout = hideProjectJoinCode;
        }
    }, [projectIsValid]);

    let revealProjectJoinCode = (event) => {
        let revealProjectJoinCodeBtn = revealProjectJoinCodeBtnRef.current;
        let rect = revealProjectJoinCodeBtn.getBoundingClientRect()
        revealProjectJoinCodeBtn.style.width = rect.width + "px";
        revealProjectJoinCodeBtn.style.height = rect.height + "px";
        
        setRevealProjectJoinCodeText(projectObj["JoinCode"]);
    }
    let hideProjectJoinCode = (event) => {
        setRevealProjectJoinCodeText("Reveal Join Code");
    }

    if(!projectIsValid){
        return (
            <React.Fragment>
                {projectIsInvalidSoRedirectTheUser ? <Navigate to={"/"} /> : ""}
            </React.Fragment>
        );
    }else{
        return (
            <div className='flex column height-100-percent no-user-select-children'>
                <div id="project-settings-container" className='flex'>
                    <div id="project-settings-label">Settings</div>

                    <div ref={revealProjectJoinCodeBtnRef} className='content-section-button' style={{ marginLeft: "0" }}>
                        <img src={joinCodeButtonIcon}/>
                        <label className='user-select'>{revealProjectJoinCodeText}</label>
                    </div>

                    {userIsOwner ? <div id={deleteProjectBtnId} className='content-section-button'>
                        <img src={deletePorjectIcon}/>
                        <label>Delete Project</label>
                    </div> : ""}
                </div>

                <div className='main-section-separator' style={{ marginTop: "0" }} />

                <div id="board-cards-container" className='height-100-percent'>
                    <label id="board-cards-container-background">BOARDS</label>
                    <button id="create-new-board-btn" className='button'>Create New Board</button>
                    <BoardCard />
                </div>

                {userIsOwner ? <Modal modalContent={<DeleteProjectModalContent projectObj={projectObj} />} openBtnId={deleteProjectBtnId} /> : ""}
            </div>
        );
    }
}

export default ViewBoards;
