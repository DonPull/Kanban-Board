import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/Modal.css";

class Modal extends Component {
    componentDidMount(){
        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        btn.onclick = function() {
        modal.classList.add("animation");
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        //modal.style.display = "none";
        modal.classList.remove("animation");
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                //modal.style.display = "none";
                modal.classList.remove("animation");
            }
        }
    }

    render() { 
        return (
            <React.Fragment>
                <h2>Modal Example</h2>

                { /* Trigger/Open The Modal */ }
                <button id="myBtn">Open Modal</button>

                { /* The Modal */ }
                <div id="myModal" className="modal">

                    { /* Modal content */ }
                    <div className="modal-content">
                        <span className="close">&times;</span>
                        <p>Some text in the Modal..</p>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}
 
export default Modal;