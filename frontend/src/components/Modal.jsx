import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/Modal.css";

class Modal extends Component {
    state = {
        modal: document.getElementById("myModal"),
        // modalContent: document.querySelector(".modal-content"),
        modalContent: document.getElementById("modal-content-resize-animation")
    }

    componentDidMount(){
        // Get the modal
        var modal = document.getElementById("myModal");
        // Get the modal-content
        var modalContent = document.querySelector(".modal-content");
        //var modalContent = document.getElementById("modal-content-resize-animation");
        

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        btn.onclick = function() {
            // if(modalContent.classList.contains("modal-content-animation")){
            //     modalContent.classList.remove("modal-content-animation");
            // }
            // modalContent.style.width = "0px";
            // modalContent.style.height = "0px";

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

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }
    }

    render() {
        let modalContent = this.props.modalContent;
        console.log(modalContent);

        return (
            <React.Fragment>
                <h2>Modal Example</h2>

                { /* Trigger/Open The Modal */ }
                <button id="myBtn">Open Modal</button>

                { /* The Modal */ }
                <div id="myModal" className="modal">

                    { /* Modal content */ }
                    <div className="modal-content">
                        {modalContent}
                    </div>

                </div>
            </React.Fragment>
        );
    }
}
 
export default Modal;