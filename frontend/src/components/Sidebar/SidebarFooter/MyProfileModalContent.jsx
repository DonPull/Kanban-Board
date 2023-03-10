import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import testPfp from '../../../assets/test_profile_pic.jpg';

class MyProfileModalContent extends Component {
    render() {
        return (
            <div className='my-profile-modal-content-container flex justify-center align-center'>
                <div className='flex column align-center'>
                    <div id="my-profile-image-container" className='flex justify-center align-center'>
                        <img src={testPfp} />
                        <input type='file'/>
                    </div>

                    <div className='flex column align-center'>
                        <label id="my-profile-fullname">Hristian Tachev</label>
                        <label id="my-profile-email">hristian.tachev@gmail.com</label>
                    </div>

                    <button className='button'>Logout</button>
                </div>

                <div className='separator-vertical'/>

                <div className='flex column align-center'>
                    <button className='button'>Some Setting 1</button>
                    <button className='button'>Some Setting 2</button>
                    <button className='button'>Some Setting 3</button>
                    <button className='button'>Some Setting 4</button>
                </div>
            </div>
        );
    }
}
 
export default MyProfileModalContent;