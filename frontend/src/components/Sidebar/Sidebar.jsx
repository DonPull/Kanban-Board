import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "./Sidebar.css";
import logoImg from "../../assets/logo.jpg";

import ProjectButtons from './ProjectButtons/ProjectButtons';
import ProjectTree from './ProjectTree/ProjectTree';
import SidebarFooter from './SidebarFooter/SidebarFooter';

class Sidebar extends Component {
    render() {
        return (
            <aside id="sidebar" className='flex column'>

                <div id="logo">
                    <img src={logoImg} />
                </div>

                <ProjectButtons />
                <ProjectTree />
                <SidebarFooter />

            </aside>
        );
    }
}
 
export default Sidebar;
