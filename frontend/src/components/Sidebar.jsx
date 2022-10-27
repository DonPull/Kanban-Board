import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "../styles/Sidebar.css";
import logoImg from "../assets/logo.jpg";
import settingsImg from "../assets/settings_icon.png";
import homeImg from "../assets/main_menu_home_icon.png";
import profileImg from "../assets/test_profile_pic.jpg";

class Sidebar extends Component {
    componentDidMount() {
        document.querySelectorAll(".img-with-icon-hover-animation").forEach(img => {
            img.addEventListener("mouseover", changeDef);
            console.log(img);
        });

        function changeDef(event){
            console.log("test");
        }
    }

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

                <div id="sidebar-footer-container" className='flex justify-space-between'>
                    <div id="profile-picture" className='align-center'>
                        <img src={profileImg} />
                    </div>

                    <button className='button flex justify-space-between align-center'>
                        <p>Settings</p>
                        <img className="img-with-icon-hover-animation" src={settingsImg} />
                    </button>

                    <button className='button flex justify-space-between align-center'>
                        <p style={{ marginTop: "2px" }} >Home</p>
                        <img className="img-with-icon-hover-animation" src={homeImg} style={{ marginBottom: "2.5px" }} />
                    </button>
                </div>
            </aside>
        );
    }
}
 
export default Sidebar;
