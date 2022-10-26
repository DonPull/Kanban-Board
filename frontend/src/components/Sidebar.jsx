import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "../styles/Sidebar.css";
import logoImg from "../assets/logo.jpg";

class Sidebar extends Component { 
    render() { 
        return (
            <aside id="sidebar" className='flex column'>
                <div id="logo">
                    <img src={logoImg} />
                </div>

                <div id="navbar-project-btn-container" className='flex column align-center' style={{ marginTop: "30px" }}>
                    <div className='title-with-underline-container'>
                        <label>Projects</label>
                        <div className='separator margin-top-5px' style={{ margin: "5px auto" }}/>
                    </div>
                    <button className='button'>Create New Project</button>
                    <button className='button'>Join Project</button>
                    <button className='button'>View My Projects</button>
                </div>
            </aside>
        );
    }
}
 
export default Sidebar;
