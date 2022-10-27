import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "../styles/Sidebar.css";
import logoImg from "../assets/logo.jpg";
import settingsImg from "../assets/settings_icon.png";
import homeImg from "../assets/main_menu_home_icon.png";
import profileImg from "../assets/test_profile_pic.jpg";
import goToArrowImg from "../assets/go_to_arrow.png";

class Sidebar extends Component {
    render() {
        return (
            <aside id="sidebar" className='flex column'>
                <div id="logo">
                    <img src={logoImg} />
                </div>

                <div id="navbar-project-btn-container" className='flex column align-center navbar-content-container' style={{ marginTop: "30px" }}>
                    <div className='title-with-underline-container'>
                        <label>Projects</label>
                        <div className='separator margin-top-5px' style={{ margin: "5px auto" }}/>
                    </div>
                    <button className='button'>Create New Project</button>
                    <button className='button'>Join Project</button>
                    <button className='button'>View My Projects</button>
                </div>

                <div id="navbar-project-tree-container" className='flex column align-center navbar-content-container margin-top-20px'>
                    <div className='title-with-underline-container'>
                        <label>Project Tree</label>
                        <div className='separator margin-top-5px' style={{ margin: "5px auto" }}/>
                    </div>
                </div>

                <div className='separator' style={{ marginTop: "auto" }}></div>

                <div id="sidebar-footer-container" className='flex justify-space-between navbar-content-container'>
                    <button className='button flex justify-space-between align-center'>
                        <p>Settings</p>
                        <img className="img-with-icon-hover-animation" src={settingsImg} />
                    </button>

                    <button id="home-btn" className='button flex justify-space-between align-center'>
                        <p id="home-btn-p">Home</p>
                        <img className="img-with-icon-hover-animation" src={homeImg} style={{ marginBottom: "2.5px" }} />
                    </button>
                </div>

                <div id="profile-picture-container" className='align-center navbar-content-container'>
                    <button style={{ margin: "1.2rem 0", padding: "0.5rem 0.7rem 0.5rem 2rem", justifyContent: "unset" }} className='button flex justify-space-between align-center width-100-percent'>
                        <p>My Profile</p>
                        <div id="profile-animation-container" className='flex width-100-percent relative'>
                            <div id="profile-picture-animation">
                                <img src={profileImg} />
                            </div>

                            <div id="go-to-profile-arrow-animation">
                                <img id="go-to-profile-arrow" src={goToArrowImg} />
                            </div>
                        </div>
                    </button>
                </div>
            </aside>
        );
    }
}
 
export default Sidebar;
