import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "./Sidebar.css";
import logoImg from "../../assets/logo.jpg";
import ProjectButtons from './ProjectButtons/ProjectButtons';
import ProjectTree from './ProjectTree/ProjectTree';
import SidebarFooter from './SidebarFooter/SidebarFooter';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    state = {
        logoRef: React.createRef()
    }

    componentDidMount(){
        let logoContainer = this.state.logoRef.current;
        
        logoContainer.onmouseover = (event) => {
            logoContainer.querySelector("label").style.transform = "translate(-6px, -6px)";
            logoContainer.querySelector("label").style.textShadow = "1px 1px var(--theme-color-bg-1), 2px 2px var(--theme-color-bg-1), 3px 3px var(--theme-color-bg-1), 4px 4px var(--theme-color-bg-1), 5px 5px var(--theme-color-bg-1), 6px 6px var(--theme-color-bg-1)";
        }
        logoContainer.onmouseout = (event) => {
            logoContainer.querySelector("label").style.transform = "";
            logoContainer.querySelector("label").style.textShadow = "";
        }
    }

    render() {
        return (
            <aside id="sidebar" className='flex column'>

                <Link to={"/"} style={{ all: "unset" }} >
                    <div ref={this.state.logoRef} id="logo">
                        <label>FlexBoard</label>
                    </div>
                </Link>

                <ProjectButtons />
                {/* <ProjectTree /> */}
                <SidebarFooter user={this.props.user} />

            </aside>
        );
    }
}
 
export default Sidebar;
