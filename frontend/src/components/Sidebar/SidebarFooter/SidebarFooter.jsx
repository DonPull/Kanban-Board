import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import settingsImg from "../../../assets/settings_icon.png";
import homeImg from "../../../assets/main_menu_home_icon.png";
import unsetPfp from "../../../assets/unset_profile_picture.png";
import goToArrowImg from "../../../assets/go_to_arrow.png";
import "./SidebarFooter.css";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MyProfileModalContent from './MyProfileModalContent';
import Modal from './../../Modal';
import { user } from '../../..';

class SidebarFooter extends Component {
    state = {
        accountBtnId: React.createRef()
    }

    componentDidMount() {
        // let { accountBtnRef } = this.state;
        // let accountBtn = accountBtnRef.current;

        // accountBtn.onclick = (event) => {
        //     let cookies = new Cookies();
        //     cookies.remove('jwt_token', { path: '/' });
        //     //redirect user to home page
        //     window.location.href = '/login';
        // }
    }

    render() {
        let { user } = this.props;

        return (
            <React.Fragment>
                <div className='separator' style={{ marginTop: "auto", marginBottom: "1.5rem" }} />
                <div className='flex column navbar-content-container'>
                    <div id="sidebar-footer-container" className='flex justify-space-between'>
                        <button className='button flex justify-space-between align-center'>
                            <p>Settings</p>
                            <img className="img-with-icon-hover-animation" src={settingsImg} />
                        </button>

                        <Link to={"/"} style={{ all: "unset" }}>
                            <button id="home-btn" className='button flex justify-space-between align-center'>
                                <p id="home-btn-p">Home</p>
                                <img className="img-with-icon-hover-animation" src={homeImg} style={{ marginBottom: "2.5px" }} />
                            </button>
                        </Link>
                    </div>

                    <div id="profile-btn-container" className='align-center'>
                        <button id={this.state.accountBtnId} style={{ margin: "1.2rem 0", padding: "0.5rem 0.7rem 0.5rem 2rem", justifyContent: "unset" }} className='button flex justify-space-between align-center width-100-percent'>
                            <p>My Profile</p>
                            <div id="profile-animation-container" className='flex width-100-percent relative'>
                                <div id="profile-picture-animation">
                                    <img src={(user === null || user.profilePicture === "") ? unsetPfp : user.profilePicture} style={this.props.user["profilePicture"] === "" ? { filter: "var(--theme-color-accent-filter)" } : {}} />
                                </div>

                                <div id="go-to-profile-arrow-animation">
                                    <img id="go-to-profile-arrow" src={goToArrowImg} />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <Modal modalContent={<MyProfileModalContent user={this.props.user} />} openBtnId={this.state.accountBtnId} /> 
            </React.Fragment>
        );
    }
}
 
export default SidebarFooter;