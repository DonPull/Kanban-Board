import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UnderConstruction from './../../UnderConstruction';
import searchIcon from '../../../assets/search.png';
import './CreateProjectModalContent.css';
import testPfpIcon from '../../../assets/test_profile_pic_1.jpg'
import testPfp2Icon from '../../../assets/test_profile_pic_2.jpg'
import removeAccountIcon from '../../../assets/+_and_x_icon_v4.png';
import addAccountIcon from '../../../assets/go_to_arrow.png';
import apiEndpoint, { claimsStr } from '../../../index.js';
import axios from 'axios';
import AccountAsListItem from '../../AccountAsListItem';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

class CreateProjectModalContent extends Component {
    state = {
        closeBtn: React.createRef(),
        currentModalRef: React.createRef(),
        titleInputRef: React.createRef(),
        searchInputRef: React.createRef(),
        titleUnderlineRef: React.createRef(),
        searchUnderlineRef: React.createRef(),
        createProjectBtnRef: React.createRef(),
        titleMaxLength: 60,
        remainingTitleCharacters: 60,
        listOfSearchedAccounts: [{"FullName": "Hristian Tachev", "Email": "hristian.tachev@gmail.com"}, {"FullName": "Mincho Milev", "Email": "min40.milev@gmail.com"}, {"FullName": "Pencho Kalaijiev", "Email": "kalai40.pen@gmail.com"}],
        listOfSelectedAccounts: []
    }

    clearInput = () => {
        let { currentModalRef, titleUnderlineRef, searchUnderlineRef } = this.state;
        let [currentModal, titleUnderline, searchUnderline] = [currentModalRef.current, titleUnderlineRef.current, searchUnderlineRef.current];
        
        currentModal.querySelectorAll("input").forEach(input => { input.value = ''; });
        titleUnderline.style.width = "0%";
        searchUnderline.style.width = "0%";
        this.setState({ remainingTitleCharacters: 60, listOfSearchedAccounts: [], listOfSelectedAccounts: [] });
    };

    componentDidMount(){
        this.props.getCloseBtn(this.state.closeBtn.current);
        this.props.modalOnCloseCallback(this.clearInput);
        
        let { createProjectBtnRef, currentModalRef, titleInputRef, searchInputRef, titleUnderlineRef, searchUnderlineRef } = this.state;
        let [createProjectBtn, currentModal, titleInput, searchInput, titleUnderline, searchUnderline] = [createProjectBtnRef.current, currentModalRef.current, titleInputRef.current, searchInputRef.current, titleUnderlineRef.current, searchUnderlineRef.current];
        
        createProjectBtn.onclick = async (event) => {
            let cookies = new Cookies();
            let userEmail = jwt_decode(cookies.get("jwt_token"))[claimsStr + "emailaddress"];

            let result = await axios.post(apiEndpoint + "/Project/create", { "Name": titleInput.input, "UserEmail": userEmail/*, "ProjectParticipants": [ {"Username": "User1", "Email": "test@gm.com"}, {"Username": "User2", "Email": "test123@gm.com"} ]*/});
        }

        // this is the remaining title characters counter logic.
        titleInput.oninput = (event) => {
            //TODO: Axios request on every charater typed and the backedn returns the best match accout for the current search

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

    onAccountClickCallback = (accountObj) => {
        let { listOfSearchedAccounts, listOfSelectedAccounts } = this.state;
        let searchedAccounts = listOfSearchedAccounts;
        let selectedAccounts = listOfSelectedAccounts;

        // the logic here moves an account (when it's clicked) to the opposite column. From "Choose participants" to "Selected People" and the other way around as well.
        let clickedAccount = searchedAccounts.find(e => {return (e.FullName === accountObj.FullName && e.Email === accountObj.Email)});
        if(clickedAccount === undefined){
            clickedAccount = selectedAccounts.find(e => {return (e.FullName === accountObj.FullName && e.Email === accountObj.Email)});
            let deletedAccount = selectedAccounts.splice(selectedAccounts.indexOf(clickedAccount), 1)[0];
            searchedAccounts.push(deletedAccount);
        }else{
            let deletedAccount = searchedAccounts.splice(searchedAccounts.indexOf(clickedAccount), 1)[0];
            selectedAccounts.push(deletedAccount);
        }

        // here we first null the lists and after they are nulled in the callback function of setState we update the lists (for some reason this is nessacary otherwise we get dublicate rendering of some accounts and in general it just does not work) in order to render the correct accounts in the correct place.
        this.setState({ listOfSearchedAccounts: [], listOfSelectedAccounts: [] }, () => {this.setState({ listOfSearchedAccounts: searchedAccounts, listOfSelectedAccounts: selectedAccounts });});
    }

    render() { 
        let { listOfSearchedAccounts, listOfSelectedAccounts, createProjectBtnRef, currentModalRef, titleInputRef, searchInputRef, titleUnderlineRef, searchUnderlineRef, titleMaxLength, remainingTitleCharacters } = this.state;

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

                            {listOfSearchedAccounts.map(accountObj => {
                                return <AccountAsListItem onClickCallback={() => {this.onAccountClickCallback(accountObj)}} accountName={accountObj["FullName"]} accountEmail={accountObj["Email"]} accountActionIcon={addAccountIcon} />
                            })}

                        </div>
                    </div>

                    <div className='flex column'>
                        <label className='user-showcase-label'>Selected People</label>
                        <div className='user-showcase-container flex column'>
                            
                            {listOfSelectedAccounts.map(accountObj => {
                                return <AccountAsListItem onClickCallback={() => {this.onAccountClickCallback(accountObj)}} accountName={accountObj["FullName"]} accountEmail={accountObj["Email"]} accountActionIcon={removeAccountIcon} rotateActionIcon={true} />
                            })}

                        </div>
                    </div>

                </div>

                <button ref={createProjectBtnRef} style={{ marginTop: "3rem", width: "max-content", backgroundColor: "transparent" }} className='button'>Create Project</button>

            </div>
        );
    }
}
 
export default CreateProjectModalContent;