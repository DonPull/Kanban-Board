import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import unsetPfp from '../../../assets/unset_profile_picture_v2.png';
import upload from '../../../assets/upload_image.png';
import './MyProfileModalContent.css';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import apiEndpoint, { claimsStr, user } from './../../../index';
import axios from 'axios';

class MyProfileModalContent extends Component {
    state = {
        cookies: new Cookies(),
        userFullName: "Hristian Tachev",
        userEmail: "hristian.tachev@gmail.com",
        userProfilePicture: (user === null || user.profilePicture === "") ? unsetPfp : user.profilePicture,
        profilePictureRef: React.createRef(),
        uploadProfilePictureRef: React.createRef(),
        uploadProfilePictureInputRef: React.createRef(),
        profilePictureContainerRef: React.createRef(),
        logoutBtnRef: React.createRef(),
        profilePicture: React.createRef()
    }

    componentDidMount(){
        let { cookies, profilePictureRef, uploadProfilePictureRef, profilePictureContainerRef, logoutBtnRef, uploadProfilePictureInputRef } = this.state;
        let [profilePicture, uploadProfilePicture, profilePictureContainer, logoutBtn, uploadProfilePictureInput] = [profilePictureRef.current, uploadProfilePictureRef.current, profilePictureContainerRef.current, logoutBtnRef.current, uploadProfilePictureInputRef.current];
        
        logoutBtn.onclick = () => {
            cookies.remove('jwt_token', { path: '/' });
            //redirect user to home page
            window.location.href = '/login';
        }

        if(user === null || user.profilePicture === ""){
            profilePicture.style.filter = "var(--theme-color-accent-filter) brightness(1)";
        }

        profilePictureContainer.onclick = () => {
            uploadProfilePictureInput.click();
        }
        profilePictureContainer.onmouseover = () => {
            profilePicture.style.filter = (user === null || user.profilePicture === "") ? "var(--theme-color-accent-filter) brightness(0.3)" : "brightness(0.3)";
            uploadProfilePicture.style.opacity = "1";
        }
        profilePictureContainer.onmouseout = () => {
            profilePicture.style.filter = (user === null || user.profilePicture === "") ? "var(--theme-color-accent-filter) brightness(1)" : "brightness(1)";
            uploadProfilePicture.style.opacity = "0";
        }
    }

    handleProfilePictureFileInput = (e) => {
        let file = e.target.files[0];

        // Make new FileReader
        let reader = new FileReader();

        // Convert the file to base64 text
        try{
            reader.readAsDataURL(file);
        }catch(e){
            return;
        }

        // on reader load somthing...
        reader.onload = () => {
            // Make a fileInfo Object
            let fileInfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1000) + ' kB',
                base64: reader.result,
                file: file,
            };

            axios.put(apiEndpoint + "/User/updateProfilePicture?userEmail=" + jwt_decode(this.state.cookies.get("jwt_token"))[claimsStr + "emailaddress"], {"ProfilePictureBase64": fileInfo.base64})
                .then(response => {
                    this.setState({ userProfilePicture: response.data });
                });
        }
    }

    render() {
        let { profilePictureRef, uploadProfilePictureRef, profilePictureContainerRef, logoutBtnRef, uploadProfilePictureInputRef, userFullName, userEmail, userProfilePicture } = this.state;

        return (
            <div className='my-profile-modal-content-container flex justify-center'>
                <div className='flex column align-center'>
                    <div ref={profilePictureContainerRef} id="my-profile-image-container" className='flex justify-center align-center'>
                        <img ref={profilePictureRef} src={userProfilePicture} />
                        <img ref={uploadProfilePictureRef} src={upload} />
                        <input ref={uploadProfilePictureInputRef} type='file' onChange={this.handleProfilePictureFileInput} accept="image/jpeg,image/png,image/jpg"/>
                    </div>

                    <div className='flex column align-center'>
                        <label id="my-profile-fullname">{userFullName}</label>
                        <label id="my-profile-email">{userEmail}</label>
                    </div>

                    <button ref={logoutBtnRef} className='button' style={{ width: "100%" }}>Logout</button>
                </div>

                {/* <div className='separator-vertical'/> */}

                {/* <div className='flex column align-center'>
                    <button className='button'>Some Setting 1</button>
                    <button className='button'>Some Setting 2</button>
                    <button className='button'>Some Setting 3</button>
                    <button className='button'>Some Setting 4</button>
                </div> */}
            </div>
        );
    }
}
 
export default MyProfileModalContent;