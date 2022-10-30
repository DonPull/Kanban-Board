import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/Modal.css";
import { v4 as uuid } from 'uuid';

class Modal extends Component {
    state = {
        modal: uuid(),
        modalContentContainer: uuid(),
        openBtnId: this.props.openBtnId
    }

    getCloseBtn = (closeBtn) => {
        let { openOnHover, closeOnHover } = this.props;
        let openBtn = document.getElementById(this.state.openBtnId);

        // Get the modal
        let modal = document.getElementById(this.state.modal);
        // Get the modal-content
        let modalContent = document.getElementById(this.state.modalContentContainer);

        //Handle the opening of the modal
        function openModal() {
            modal.classList.add("animation");
            modalContent.classList.add("modal-content-animation");
        }
        // Handle the closeing of the modal when user interacts with the space around the modal
        function closeModalFromWindow(modalToClose) {
            modalToClose.classList.remove("animation");
            setTimeout(() => {
                if(!modalToClose.classList.contains("animation")){
                    modalToClose.querySelector(".modal-content").classList.remove("modal-content-animation");
                }
            }, 300);
        }
        // Handle the closeing of the modal when user interacts with the close btn inside the modal
        function closeModalFromBtn() {
            modal.classList.remove("animation");
            setTimeout(() => {
                if(!modal.classList.contains("animation")){
                    modalContent.classList.remove("modal-content-animation");
                }
            }, 300);
        }

        // When the user clicks/hovers the button, open the modal
        if(openOnHover){
            openBtn.onmouseover = openModal;
        }else{
            openBtn.onclick = openModal;
        }

        if(closeBtn != undefined){
            closeBtn.onclick = closeModalFromBtn;
        }
        // When the user clicks/hover outside of the modal, close it
        if(closeOnHover){
            window.onmouseover = function(event) {
                document.querySelectorAll(".modal").forEach(m => {
                    if (event.target === m) {
                        closeModalFromWindow(m);
                    }
                });
            }
        }else{
            window.onclick = function(event) {
                document.querySelectorAll(".modal").forEach(m => {
                    if (event.target === m) {
                        closeModalFromWindow(m);
                    }
                });
            }
        }
    }

    render() {
        let { modalContent } = this.props;
        let { modal, modalContentContainer } = this.state;

        return (
            <div id={modal} ref={modal} className="modal">
                <div id={modalContentContainer} ref={modalContentContainer} className="modal-content">
                    {React.cloneElement(modalContent, {getCloseBtn: this.getCloseBtn})}
                </div>
            </div>
        );
    }
}
 
export default Modal;