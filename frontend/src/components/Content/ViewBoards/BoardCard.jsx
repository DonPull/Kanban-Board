import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import apiEndpoint from './../../../index';
import unsetPfp from '../../../assets/unset_profile_picture.png';

function BoardCard(props) {
    const [boardData, setBoardData] = useState(props.boardData);
    const [location, setLocation] = useState(useLocation());
    const [boardCardRef, setBoardCardRef] = useState(React.createRef());
    const [boardParticipantsIconsRef, setBoardParticipantsIconsRef] = useState(React.createRef());
    const [boardParticipantsLastIconRef, setBoardParticipantsLastIconRef] = useState(React.createRef());
    const [boardParticipants, setBoardParticipants] = useState([]);
    const [numberOfUnrenderedAccounts, setNumberOfUnrenderedAccounts] = useState(0);

    useEffect(() => {
        console.log("board data: ");
        console.log(boardData);

        axios.post(apiEndpoint + "/User/getUsersProfilePictures", boardData["UserEmails"].split(",")).then(response => {
            setBoardParticipants(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        spaceOutBoardParticipantsIcons();
    }, [boardParticipants]);

    let spaceOutBoardParticipantsIcons = () => {
        //let { boardCardRef, boardParticipantsIconsRef, boardParticipantsLastIconRef, boardParticipants } = this.state;
        let [boardCard, boardParticipantsIcons, boardParticipantsLastIcon] = [boardCardRef.current, boardParticipantsIconsRef.current, boardParticipantsLastIconRef.current];

        let imgOffsetValue = 10;
        let imgOffsetCounter = 0;
        let remainingNumberOfParticipantsWasRendered = false;
        
        let numberOfPhotosToRender = Math.round((Number(window.getComputedStyle(boardCard).width.replace("px", "")) - 30) / (32 - imgOffsetValue)); // this magic number 30 is the left and right padding of the project card plus the left and right padding of the projectParticipantsIconsContainer... (32 - imgOffsetValue) is the space one participant image takes after we remove the offset of the img (which offset decreases the amount of space the img takes)
        setNumberOfUnrenderedAccounts(boardParticipants.length - (numberOfPhotosToRender - 2));

        boardParticipantsIcons.querySelectorAll("img").forEach((img) => {
            if(numberOfPhotosToRender <= 2){   // I am not entirely sure why here numberOfPhotosToRender must be lower or equal to 2 insted of 1 but it works so whatever...
                if(!remainingNumberOfParticipantsWasRendered){
                    boardParticipantsLastIcon.style.transform = `translateX(-${imgOffsetCounter}px)`;
                    boardParticipantsLastIcon.style.display = "flex";
                    remainingNumberOfParticipantsWasRendered = true;
                }
                img.style.display = "none";
            }else{
                img.style.transform = `translateX(-${imgOffsetCounter}px)`;
                imgOffsetCounter += imgOffsetValue;
            }
            numberOfPhotosToRender--;
        });
    }

    return (
        <Link to={location.pathname + "/boards/" + boardData["Id"]}>
            <div ref={boardCardRef} className='board-card flex column'>
                <label className='board-card-title'>{boardData["Name"]}</label>
                <div className='board-card-info-container flex'>
                    <label>Columns <span className='span-badge'>5</span></label>
                    <div className='separator-vertical'/>
                    <label>Tasks <span className='span-badge'>31</span></label>
                </div>

                <div ref={boardParticipantsIconsRef} className='project-participants-icons-container flex'>
                    {boardParticipants.map(img => {
                        return <img src={img !== null && img !== undefined && img !== "" ? img : unsetPfp}/>
                    })}
                    <div ref={boardParticipantsLastIconRef} className="project-participants-last-icon">
                        <label>{"+" + numberOfUnrenderedAccounts}</label>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BoardCard;