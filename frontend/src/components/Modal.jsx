import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/Modal.css";

class Modal extends Component {
    state = {
        modal: React.createRef(),
        modalContentContainer: React.createRef(),
        openBtn: this.props.openBtn
    }

    getOpenAndCloseBtns = (closeBtn) => {
        let { openOnHover, closeOnHover } = this.props;
        let openBtn = document.getElementById(this.state.openBtn);

        // TODO: (Could be solver already with those React.createRef() methods but we will see when I add more than one modal) Implement unique react ids, otherwise one modal is going to be closing/opening another one insed of itself. (a possible solution would be to give a unique id with .props to each modal separately)
        // Get the modal
        let modal = this.state.modal.current;
        // Get the modal-content
        let modalContent = this.state.modalContentContainer.current;

        //Handle the opening of the modal
        function openModal() {
            modal.classList.add("animation");
            modalContent.classList.add("modal-content-animation");
        }
        // Handle the closeing of the modal
        function closeModal() {
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
            closeBtn.onclick = closeModal;
        }
        // When the user clicks/hover outside of the modal, close it
        if(closeOnHover){
            window.onmouseover = function(event) {
                if (event.target == modal) {
                    closeModal();
                }
            }
        }else{
            window.onclick = function(event) {
                if (event.target == modal) {
                    closeModal();
                }
            }
        }
    }

    render() {
        let { modalContent } = this.props;
        let { modal, modalContentContainer } = this.state;

        return (
            <div ref={modal} className="modal">
                <div ref={modalContentContainer} className="modal-content">
                    {React.cloneElement(modalContent, {getOpenAndCloseBtns: this.getOpenAndCloseBtns})}
                </div>
            </div>
        );
    }
}
 
export default Modal;