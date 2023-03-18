import React, { useState, useEffect } from 'react';
import './DeleteProjectModalContent.css';

function DeleteProjectModalContent(props) {
    const [initialCountdown, setInitialCountdown] = useState(5);
    const [countdown, setCountdown] = useState(initialCountdown);
    const [deleteProjectButtonIsDisabled, setDeleteProjectButtonIsDisabled] = useState(true);
    const [deleteProjectBtnRef, setDeleteProjectBtnRef] = useState(React.createRef());

    let intervalId;
    let setupCountdown = () => {
        intervalId = setInterval(countdownFunc, 1000);
        function countdownFunc(){
            setCountdown(prevCountdown => {
                if(prevCountdown <= 1){
                    setDeleteProjectButtonIsDisabled(false);
                    clearInterval(intervalId);
                    return 0;
                }else{
                    return prevCountdown - 1;
                }
            });
        }
    }

    let resetCountdown = () => {
        setDeleteProjectButtonIsDisabled(true);
        setCountdown(initialCountdown);
        clearInterval(intervalId);
    }

    useEffect(() => {
        deleteProjectBtnRef.current.onclick = () => {
            if(deleteProjectButtonIsDisabled){ return; }
            console.log("you clicked the now available delete project button");
        };
    }, [deleteProjectButtonIsDisabled]);

    useEffect(() => {
        props.modalOnOpenCallback(setupCountdown);
        props.modalOnCloseCallback(resetCountdown);
    }, []);

    return ( 
        <div className='flex column'>
            <div className='standard-labels-container flex column align-center'>
                <label>Are you sure you want to delete "<span style={{ fontWeight: "700", textDecoration: "underline" }}>{props.projectObj["Name"]}</span>"?</label>
                <label style={{ color: "var(--theme-color-accent-3)" }}>This action cannot be undone!</label>
            </div>

            <div className='flex column align-center' style={{ marginTop: "4rem" }}>
                <button ref={deleteProjectBtnRef} style={deleteProjectButtonIsDisabled ? { opacity: "0.5", pointerEvents: "none" } : { opacity: "1", pointerEvents: "all" }} className='button'>Delete Project</button>
                <label className='disabled-button-coutdown-label'>Available after {countdown} sec</label>
            </div>
        </div>
    );
}

export default DeleteProjectModalContent;