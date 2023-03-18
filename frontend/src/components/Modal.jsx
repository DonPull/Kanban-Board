import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/Modal.css";
import { v4 as uuid } from 'uuid';

class Modal extends Component {
    state = {
        modalId: uuid(),
        modalBackgroundId: uuid(),
        modalContentContainer: uuid(),
        openBtnId: this.props.openBtnId,
        closeOnHoverBtnRef: React.createRef(),
        setupModalContentFunction: () => {},
        resetModalContentFunction: () => {}
    }

    //Handle the opening of the modal
    openModal = (modal, modalContent, modalBackground, closeOnHoverBtn) => {
        // on modal open execute the setupModalContentFunction callback function in one is passed
        this.state.setupModalContentFunction();

        modalBackground.style.opacity = "1";
        modalBackground.style.zIndex = "10";
        modal.classList.add("animation");
        modalContent.classList.add("modal-content-animation");
        closeOnHoverBtn !== null ? closeOnHoverBtn.classList.add("modal-content-animation") : closeOnHoverBtn = null;
    }

    // Handle the closeing of the modal (this function handles every type of closing e.g. close button; clicking outside the modal; or hovering on close modal section if available)
    closeModalFromBtn = (modal, modalContent, modalBackground, closeOnHoverBtn) => {
        // on modal close execute the resetModalContentFunction callback function in one is passed
        this.state.resetModalContentFunction();

        modalBackground.style.opacity = "0";
        modalBackground.style.zIndex = "-1";
        modal.classList.remove("animation");
        modal.classList.add("animation-fadeout");
        // when the modal is closed clear leftover information from all input fields
        //modalContent.querySelectorAll("input").forEach(input => { input.value = ""; });
        setTimeout(() => {
            if(!modal.classList.contains("animation")){
                modal.classList.remove("animation-fadeout");
                modalContent.classList.remove("modal-content-animation");
                closeOnHoverBtn !== null ? closeOnHoverBtn.classList.remove("modal-content-animation") : closeOnHoverBtn = null;
            }
        }, 300);
    }

    componentDidMount() {
        let { modalId, modalBackgroundId, modalContentContainer, openBtnId, closeOnHoverBtnRef } = this.state;
        let { openOnHover, closeOnHover } = this.props;

        let openBtn = "";
        while(openBtn === "" || openBtn === undefined) {
            openBtn = document.getElementById(openBtnId)
        }

        // Get the modal
        let modal = document.getElementById(modalId);
        // Get the modal-background
        let modalBackground = document.getElementById(modalBackgroundId);
        // Get the modal-content
        let modalContent = document.getElementById(modalContentContainer);
        let closeOnHoverBtn = closeOnHoverBtnRef.current;

        // When the user clicks/hovers the button, open the modal
        if(openOnHover){
            openBtn.onmouseover = () => {this.openModal(modal, modalContent, modalBackground, closeOnHoverBtn)};
        }else{
            openBtn.onclick = () => {this.openModal(modal, modalContent, modalBackground, closeOnHoverBtn)};
        }

        // When the user clicks/hover outside of the modal, close it
        if(closeOnHover){
            closeOnHoverBtn.onmouseover = (event) => {
                if (event.target === closeOnHoverBtn) {
                    this.closeModalFromBtn(modal, modalContent, modalBackground, closeOnHoverBtn);
                }
            }
        }

        //the option to close a modal with a click should be always available
        modal.onclick = (event) => {
            if (event.target === modal) {
                this.closeModalFromBtn(modal, modalContent, modalBackground, closeOnHoverBtn);
            }
        }
    }

    getCloseBtn = (closeBtn) => {
        let { modalId, modalBackgroundId, modalContentContainer, closeOnHoverBtnRef } = this.state;

        // Get the modal
        let modal = document.getElementById(modalId);
        // Get the modal-background
        let modalBackground = document.getElementById(modalBackgroundId);
        // Get the modal-content
        let modalContent = document.getElementById(modalContentContainer);
        let closeOnHoverBtn = closeOnHoverBtnRef.current;

        if(closeBtn != undefined){
            closeBtn.onclick = () => { 
                this.closeModalFromBtn(modal, modalContent, modalBackground, closeOnHoverBtn);
            };
        }
    }

    handleModalOpenAndCloseAnimations = (event, modalId, modalBackgroundId, modalContentContainer, closeOnHoverBtnRef) => {
        // Get the modal
        let modal = document.getElementById(modalId);
        // Get the modal-background
        let modalBackground = document.getElementById(modalBackgroundId);
        // Get the modal-content
        let modalContent = document.getElementById(modalContentContainer);
        let closeOnHoverBtn = closeOnHoverBtnRef.current;

        //console.log("animation end: ", event.animationName);

        // if(event.animationName === "modal-fade-in"){

        // }
        //if(event.animationName === "modal-fade-out"){
            //console.log("we in modal fade out");
            // if(!modal.classList.contains("animation")){
            //     modal.classList.remove("animation-fadeout");
            //     modalContent.classList.remove("modal-content-animation");
            //     closeOnHoverBtn !== null ? closeOnHoverBtn.classList.remove("modal-content-animation") : closeOnHoverBtn = null;
            // }
        //}
    }

    modalOnOpenCallback = (setupModalContentFunction) => {
        this.setState({ setupModalContentFunction });
    }

    modalOnCloseCallback = (resetModalContentFunction) => {
        this.setState({ resetModalContentFunction });
    }

    render() {
        let { modalContent, closeOnHover } = this.props;
        let { modalId, modalBackgroundId, modalContentContainer, closeOnHoverBtnRef } = this.state;

        return (
            <React.Fragment>
                <div id={modalBackgroundId} ref={modalBackgroundId} className='modal-background' />
                <div id={modalId} ref={modalId} className="modal" onAnimationEnd={(event) => {this.handleModalOpenAndCloseAnimations(event, modalId, modalBackgroundId, modalContentContainer, closeOnHoverBtnRef)}} >
                    <div id={modalContentContainer} ref={modalContentContainer} className="modal-content">
                        {React.cloneElement(modalContent, {getCloseBtn: this.getCloseBtn, modalOnOpenCallback: this.modalOnOpenCallback, modalOnCloseCallback: this.modalOnCloseCallback})}
                    </div>

                    {closeOnHover ? <div ref={closeOnHoverBtnRef} className='close-modal-on-hover flex justify-center align-center'><label>Hover to close</label></div> : ""}
                </div>
            </React.Fragment>
        );
    }
}
 
export default Modal;