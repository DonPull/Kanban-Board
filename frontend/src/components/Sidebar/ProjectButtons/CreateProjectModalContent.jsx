import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UnderConstruction from './../../UnderConstruction';
import searchIcon from '../../../assets/search.png';
import './CreateProjectModalContent.css';
import testPfpIcon from '../../../assets/test_profile_pic_1.jpg'
import testPfp2Icon from '../../../assets/test_profile_pic_2.jpg'
import removeAccountIcon from '../../../assets/+_and_x_icon.svg';
import addAccountIcon from '../../../assets/go_to_arrow.png';

class CreateProjectModalContent extends Component {
    state = {
        closeBtn: React.createRef(),
        currentModalRef: React.createRef(),
        titleInputRef: React.createRef(),
        searchInputRef: React.createRef(),
        titleUnderlineRef: React.createRef(),
        searchUnderlineRef: React.createRef(),
        titleMaxLength: 60,
        remainingTitleCharacters: 60
    }

    clearInput = () => {
        let { currentModalRef, titleUnderlineRef, searchUnderlineRef } = this.state;
        let [currentModal, titleUnderline, searchUnderline] = [currentModalRef.current, titleUnderlineRef.current, searchUnderlineRef.current];
        
        currentModal.querySelectorAll("input").forEach(input => { input.value = ''; });
        titleUnderline.style.width = "0%";
        searchUnderline.style.width = "0%";
        this.setState({ remainingTitleCharacters: 60 });
    };

    componentDidMount(){
        this.props.getCloseBtn(this.state.closeBtn.current);
        this.props.modalOnCloseCallback(this.clearInput);
        
        let { currentModalRef, titleInputRef, searchInputRef, titleUnderlineRef, searchUnderlineRef } = this.state;
        let [currentModal, titleInput, searchInput, titleUnderline, searchUnderline] = [currentModalRef.current, titleInputRef.current, searchInputRef.current, titleUnderlineRef.current, searchUnderlineRef.current];
        
        // this is the remaining title characters counter logic.
        titleInput.oninput = (event) => {
            if(event.inputType === "insertText"){
                this.setState({ remainingTitleCharacters: this.state.remainingTitleCharacters - 1 });
            }else if(event.inputType.includes("delete")){
                this.setState({ remainingTitleCharacters: this.state.titleMaxLength - titleInput.value.split("").length });
            }
        };


        currentModal.onclick = (event) => {
            if(event.target === titleInput){
                titleUnderline.style.width = "100%";
                // this line is here because if we click the title input field and then we click the search input field both fields will have the highlighted underline and they shouldn't
                searchUnderline.style.width = "0%";
            }else if(event.target === searchInput){
                searchUnderline.style.width = "100%";
                // this line is here because if we click the search input field and then we click the title input field both fields will have the highlighted underline and they shouldn't
                titleUnderline.style.width = "0%";
            }else{
                titleUnderline.style.width = "0%";
                searchUnderline.style.width = "0%";
            }
        };
    }

    render() { 
        let { currentModalRef, titleInputRef, searchInputRef, titleUnderlineRef, searchUnderlineRef, titleMaxLength, remainingTitleCharacters } = this.state;

        return (
            <div ref={currentModalRef} className='create-project-modal-content-container flex column justify-center align-center'>
                {/* <UnderConstruction closeBtn={this.state.closeBtn} /> */}
                <div className='name-the-project-container flex'>
                    <label>Project Name:</label>
                    <div className='name-the-project-input-container flex column'>
                        <div className='flex'>
                            <input ref={titleInputRef} maxlength={titleMaxLength} />
                            <div className='character-counter'>
                                <label>{remainingTitleCharacters}/{titleMaxLength}</label>
                            </div>
                        </div>
                        <div className='input-animated-underline'><div ref={titleUnderlineRef} className='input-animated-underline-inside' /></div>
                    </div>
                </div>
                
                <div className='user-choosing-showcases-container flex'>

                    <div className='flex column'>
                        <label className='user-showcase-label'>Choose Participants</label>
                        <div className='user-showcase-container flex column'>
                            <div className='user-search-container flex column'>
                                <div className='flex'>
                                    <div className='user-search-img-container flex'>
                                        <img src={searchIcon} />
                                    </div>
                                    <input ref={searchInputRef} placeholder='Search' />
                                </div>
                                <div className='input-animated-underline'><div ref={searchUnderlineRef} className='input-animated-underline-inside' /></div>
                            </div>

                            <div className='user-showcase-account-container flex'>
                                <div className='flex align-center'>
                                    <img src={testPfpIcon} />
                                </div>
                                <div>
                                <div className='flex column' style={{ margin: "0 1rem", maxWidth: "200px" }}>
                                    <label>Hristian Tachev</label>
                                    <label>hristian.tachev@gmail.com</label>
                                </div>
                                </div>
                                <div className='flex align-center'>
                                    <img src={addAccountIcon} />
                                </div>
                            </div>

                            <div className='user-showcase-account-container flex'>
                                <div className='flex align-center'>
                                    <img src={testPfpIcon} />
                                </div>
                                <div>
                                    <div className='flex column' style={{ margin: "0 1rem", maxWidth: "200px" }}>
                                        <label>Aleksandar Koshov</label>
                                        <label>aleks.airsoft@gmail.com</label>
                                    </div>
                                </div>
                                <div className='flex align-center'>
                                    <img src={addAccountIcon} />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='flex column'>
                        <label className='user-showcase-label'>Selected People</label>
                        <div className='user-showcase-container flex column'>
                            
                            <div className='user-showcase-account-container flex'>
                                <div className='flex align-center'>
                                    <img src={testPfp2Icon} />
                                </div>
                                <div>
                                <div className='flex column' style={{ margin: "0 1rem", maxWidth: "200px" }}>
                                    <label>Marques Brownlee</label>
                                    <label>mkbhd.recordstudio@gmail.com</label>
                                </div>
                                </div>
                                <div className='flex align-center'>
                                    <img src={removeAccountIcon} style={{ transform: "rotate(45deg)" }} />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <button style={{ marginTop: "3rem" }} className='button'>Create Project</button>

            </div>
        );
    }
}
 
export default CreateProjectModalContent;