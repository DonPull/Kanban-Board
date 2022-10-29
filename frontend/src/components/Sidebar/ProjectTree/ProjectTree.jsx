import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../Modal';
import SidebarFooter from '../SidebarFooter/SidebarFooter';
import TestModalContent from '../../TestModalContent';
import "./ProjectTree.css";

class ProjectTree extends Component {
    state = {
        openBtnId: "open-modal"
    }

    render() { 
        let { openBtnId } = this.state;

        return (
            <div id="navbar-project-tree-container" className='flex column align-center navbar-content-container margin-top-20px'>
                <div className='title-with-underline-container'>
                    <label id={openBtnId}>Project Tree</label>
                    <div className='separator' style={{ margin: "5px auto" }}/>
                </div>

                <Modal modalContent={<TestModalContent />} openBtn={openBtnId} closeOnHover={false} />

            </div>
        );
    }
}
 
export default ProjectTree;