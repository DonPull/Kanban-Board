import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../Modal';
import "./ProjectTree.css";

class ProjectTree extends Component {
    render() { 
        return (
            <div id="navbar-project-tree-container" className='flex column align-center navbar-content-container margin-top-20px'>
                <div className='title-with-underline-container'>
                    <label>Project Tree</label>
                    <div className='separator' style={{ margin: "5px auto" }}/>
                </div>

                <Modal />

            </div>
        );
    }
}
 
export default ProjectTree;