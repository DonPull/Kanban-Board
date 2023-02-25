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
        closeOnHoverBtnRef: React.createRef()
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

        //Handle the opening of the modal
        function openModal() {
            modalBackground.style.opacity = "1";
            modalBackground.style.zIndex = "10";
            modal.classList.add("animation");
            modalContent.classList.add("modal-content-animation");
            closeOnHoverBtn !== null ? closeOnHoverBtn.classList.add("modal-content-animation") : closeOnHoverBtn = null;
        }

        // Handle the closeing of the modal (this function handles every type of closing e.g. close button; clicking outside the modal; or hovering on close modal section if available)
        function closeModalFromBtn() {
            modalBackground.style.opacity = "0";
            modalBackground.style.zIndex = "-1";
            modal.classList.remove("animation");
            modal.classList.add("animation-fadeout");
            setTimeout(() => {
                if(!modal.classList.contains("animation")){
                    modal.classList.remove("animation-fadeout");
                    modalContent.classList.remove("modal-content-animation");
                    closeOnHoverBtn !== null ? closeOnHoverBtn.classList.remove("modal-content-animation") : closeOnHoverBtn = null;
                }
            }, 300);
        }

        // When the user clicks/hovers the button, open the modal
        if(openOnHover){
            openBtn.onmouseover = openModal;
        }else{
            openBtn.onclick = openModal;
        }

        // When the user clicks/hover outside of the modal, close it
        if(closeOnHover){
            closeOnHoverBtn.onmouseover = function(event) {
                if (event.target === closeOnHoverBtn) {
                    closeModalFromBtn();
                }
            }
        }

        //the option to close a modal with a click should be always available
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModalFromBtn();
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

        // function closeModalFromBtn() {
        //     modal.classList.remove("animation");
        //     setTimeout(() => {
        //         if(!modal.classList.contains("animation")){
        //             modalContent.classList.remove("modal-content-animation");
        //             closeOnHoverBtn !== null ? closeOnHoverBtn.classList.remove("modal-content-animation") : closeOnHoverBtn = null;
        //         }
        //     }, 300);
        // }

        function closeModalFromBtn() {
            modalBackground.style.opacity = "0";
            modalBackground.style.zIndex = "-1";
            modal.classList.remove("animation");
            modal.classList.add("animation-fadeout");
            setTimeout(() => {
                if(!modal.classList.contains("animation")){
                    modal.classList.remove("animation-fadeout");
                    modalContent.classList.remove("modal-content-animation");
                    closeOnHoverBtn !== null ? closeOnHoverBtn.classList.remove("modal-content-animation") : closeOnHoverBtn = null;
                }
            }, 300);
        }

        if(closeBtn != undefined){
            closeBtn.onclick = closeModalFromBtn;
        }
    }

    handleModalOpenAndCloseAnimations = (event, modalId) => {
        let modal = document.getElementById(modalId);

        // if(event.animationName === "modal-fade-in"){
        //     modal.style.zIndex = "10";
        //     modal.style.opacity = "1";
        //     modal.style.backgroundColor = "rgba(0,0,0,0.4)";
        // }else
        // if(event.animationName === "modal-fade-out"){
        //     modal.style.zIndex = "-1";
        //     // modal.style.opacity = "0";
        //     // modal.style.backgroundColor = "rgba(0,0,0,0)";
        // }
    }

    render() {
        let { modalContent, closeOnHover } = this.props;
        let { modalId, modalBackgroundId, modalContentContainer, closeOnHoverBtnRef } = this.state;

        return (
            <React.Fragment>
                <div id={modalBackgroundId} ref={modalBackgroundId} className='modal-background' />
                <div id={modalId} ref={modalId} className="modal" onAnimationEnd={(event) => {this.handleModalOpenAndCloseAnimations(event, modalId)}} >
                    <div id={modalContentContainer} ref={modalContentContainer} className="modal-content">
                        {React.cloneElement(modalContent, {getCloseBtn: this.getCloseBtn})}
                    </div>

                    {closeOnHover ? <div ref={closeOnHoverBtnRef} className='close-modal-on-hover flex justify-center align-center'><label>Hover to close</label></div> : ""}
                </div>
            </React.Fragment>
        );
    }
}
 
export default Modal;