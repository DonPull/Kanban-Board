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
import CreateProjectModalContent from './../../Sidebar/ProjectButtons/CreateProjectModalContent';
import Toast from './../../Toast';

function ViewBoards(props) {
    const { projectId } = useParams();
    const [projectIsValid, setProjectIsValid] = useState(false); // this is needed to display an empty string as DOM until we get a response from the axios request at which point we can redirect the user to an error page if the request fails or display the Board of the Project if the request does not fail (which confirms that a project with the requested id exists)
    const [projectIsInvalidSoRedirectTheUser, setProjectIsInvalidSoRedirectTheUser] = useState(false); // this is needed to do the actual redirecting of the user in case the axios request fails
    const [projectObj, setProjectObj] = useState({});
    const [deleteProjectBtnId, setDeleteProjectBtnId] = useState("delete-project-button");
    const [userIsOwner, setUserIsOwner] = useState(false);
    const [revealProjectJoinCodeBtnRef, setRevealProjectJoinCodeBtnRef] = useState(React.createRef());
    const [revealProjectJoinCodeText, setRevealProjectJoinCodeText] = useState("Reveal Join Code");
    const [createBoardId, setCreateBoardId] = useState("create-new-board-btn");
    const [boardList, setBoardList] = useState([]);
    const [toastObj, setToastObj] = useState({
        show: false,
        message: null,
        duration: 3000,
        type: "error"
    });

    useEffect(() => {
        let renderBoardsIntervalId = setInterval(() => {
            renderAllBoards();
        }, 1000);

        axios.get(apiEndpoint + "/Project/" + projectId).then(response => {
            console.log(response.data);
            setProjectObj(response.data);
            setUserIsOwner(props.user.id === response.data["OwnerId"]);
            setProjectIsValid(true);
        }).catch(error => {
            setProjectIsValid(false);
            setProjectIsInvalidSoRedirectTheUser(true);
        });

        return () => {
            clearInterval(renderBoardsIntervalId);
        }
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

    let modifyToastObjCallback = (tObj) => {
        //this.setState(prevState => ({ toastObj: { ...prevState.toastObj, ...tObj } }));
        setToastObj(prevToastObj => { return { ...prevToastObj, ...tObj } })
    }

    let renderAllBoards = async () => {
        // get all projects to render them
        await axios.get(apiEndpoint + "/Project/getBoards/" + projectId).then(response => {
            setBoardList(response.data);
        }).catch(error => {
            console.log(error);
            console.log("Unexpected error occurred. Failed to load boards.");
        });
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
                        <div className='flex justify-center width-100-percent'>
                            <label className='user-select'>{revealProjectJoinCodeText}</label>
                        </div>
                    </div>

                    {userIsOwner ? <div id={deleteProjectBtnId} className='content-section-button'>
                        <img src={deletePorjectIcon}/>
                        <label>Delete Project</label>
                    </div> : ""}
                </div>

                <div className='main-section-separator' style={{ marginTop: "0" }} />

                <div id="board-showcase-container">
                    <label id="board-showcase-container-background">BOARDS</label>
                    <button id={createBoardId} className='button'>Create New Board</button>
                    
                    <div id="boards-cards-container">
                        {boardList.map(boardData =>{
                            return <BoardCard boardData={boardData} />;
                        })}
                    </div>
                </div>

                {toastObj.show && <Toast closeToastCallbackFunction={() => { setToastObj(prevToastObj => { return { ...prevToastObj, show: false } }) }} toastMessage={toastObj.message} notificationDurationInMs={toastObj.duration} notificationType={toastObj.type} />}
                <Modal modalContent={<CreateProjectModalContent projectObj={projectObj} modifyToastObjCallback={modifyToastObjCallback} user={props.user} />} openBtnId={createBoardId} />
                
                {userIsOwner ? <Modal modalContent={<DeleteProjectModalContent projectObj={projectObj} />} openBtnId={deleteProjectBtnId} /> : ""}
            </div>
        );
    }
}

export default ViewBoards;
