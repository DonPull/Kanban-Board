import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UnderConstruction from './../../UnderConstruction';
import searchIcon from '../../../assets/search.png';
import './CreateProjectModalContent.css';
import removeAccountIcon from '../../../assets/+_and_x_icon_v4.png';
import addAccountIcon from '../../../assets/go_to_arrow.png';
import apiEndpoint, { claimsStr } from '../../../index.js';
import axios from 'axios';
import AccountAsListItem from '../../AccountAsListItem';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import Toast from '../../Toast';

class CreateProjectModalContent extends Component {
    state = {
        projectObj: this.props.projectObj,
        createBoard: this.props.projectObj === undefined ? false : true,
        closeBtn: React.createRef(),
        currentModalRef: React.createRef(),
        titleInputRef: React.createRef(),
        searchInputRef: React.createRef(),
        titleUnderlineRef: React.createRef(),
        searchUnderlineRef: React.createRef(),
        createProjectBtnRef: React.createRef(),
        listOfSearchedAccountsContainerRef: React.createRef(),
        titleMaxLength: 60,
        remainingTitleCharacters: 60,
        listOfSearchedAccounts: [],
        listOfSelectedAccounts: []
    }

    clearInput = () => {
        let { createBoard, listOfSearchedAccounts, listOfSelectedAccounts, currentModalRef, titleUnderlineRef, searchUnderlineRef } = this.state;
        let [currentModal, titleUnderline, searchUnderline] = [currentModalRef.current, titleUnderlineRef.current, searchUnderlineRef.current];
        
        currentModal.querySelectorAll("input").forEach(input => { input.value = ''; });
        titleUnderline.style.width = "0%";
        searchUnderline.style.width = "0%";

        if(createBoard){
            listOfSelectedAccounts.forEach(e => {
                listOfSearchedAccounts.push(e);
            })
        }else{
            listOfSearchedAccounts = [];
        }

        this.setState({ remainingTitleCharacters: 60, listOfSearchedAccounts: createBoard ? listOfSearchedAccounts : [], listOfSelectedAccounts: [] });
    };

    componentDidMount(){
        this.props.getCloseBtn(this.state.closeBtn.current);
        this.props.modalOnCloseCallback(this.clearInput);
        
        let { createBoard } = this.state;
        let { createProjectBtnRef, currentModalRef, titleInputRef, searchInputRef, titleUnderlineRef, searchUnderlineRef } = this.state;
        let [createProjectBtn, currentModal, titleInput, searchInput, titleUnderline, searchUnderline] = [createProjectBtnRef.current, currentModalRef.current, titleInputRef.current, searchInputRef.current, titleUnderlineRef.current, searchUnderlineRef.current];
        
        let createProjectOrBoardEndpoint = "/Project/create";
        let projectOrBoardString = "project";
        if(createBoard){
            this.setState({ listOfSearchedAccounts: this.props.projectObj["ProjectParticipants"] });

            createProjectOrBoardEndpoint = "/Board/create";
            projectOrBoardString = "board";
        }

        createProjectBtn.onclick = async (event) => {
            let createProjectOrBoardObject = { "Name": titleInput.value, "UserEmail": this.props.user.email };
            if(createBoard){
                createProjectOrBoardObject["ProjectId"] = this.state.projectObj["Id"];
                createProjectOrBoardObject["BoardParticipantsEmails"] = this.state.listOfSelectedAccounts.map(account => account["Email"]).join(",");
            }else{
                createProjectOrBoardObject["ProjectParticipantsEmails"] = this.state.listOfSelectedAccounts.map(account => account["Email"]).join(",");
            }
            
            await axios.post(apiEndpoint + createProjectOrBoardEndpoint, createProjectOrBoardObject).then(response => {
                this.clearInput();
                let newToastProperties = { show: true, type: "success", message: `Created ${projectOrBoardString}: "${response.data}"` };
                this.props.modifyToastObjCallback(newToastProperties);
            }).catch(error => {
                let newToastProperties = { show: true, type: "error", message: error.response.data !== null && error.response.data !== undefined ? error.response.data : `Couldn't create a ${projectOrBoardString}. Try again later.` };
                this.props.modifyToastObjCallback(newToastProperties);
            });
        }

        // this is the remaining title characters counter logic.
        titleInput.oninput = (event) => {
            if(event.inputType === "insertText"){
                this.setState({ remainingTitleCharacters: this.state.remainingTitleCharacters - 1 });
            }else if(event.inputType.includes("delete")){
                this.setState({ remainingTitleCharacters: this.state.titleMaxLength - titleInput.value.split("").length });
            }
        };

        searchInput.oninput = () => { 
            createBoard ? this.boardOnSearchInput(searchInput)  : this.projectOnSearchInput(searchInput);
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

    boardOnSearchInput = (searchInput) => {
        let regex = new RegExp(searchInput.value.replaceAll(".", "").replaceAll("-", "").replaceAll("_", "").replaceAll(" ", "").trim(), 'gi');
        let listOfSearchedAccountsContainer = this.state.listOfSearchedAccountsContainerRef.current;
        listOfSearchedAccountsContainer.querySelectorAll(".user-showcase-account-container").forEach(e => {
            let currentFullName = e.querySelector(".account-as-list-item-fullname").innerText.replaceAll(".", "").replaceAll("-", "").replaceAll("_", "").replaceAll(" ", "").trim();
            let currentEmail = e.querySelector(".account-as-list-item-email").innerText.replaceAll(".", "").replaceAll("-", "").replaceAll("_", "").replaceAll(" ", "").trim();

            if(!regex.test(currentFullName) && !regex.test(currentEmail)){
                e.style.display = "none";
            }else{
                e.style.display = "";
            }
        });
    }
    projectOnSearchInput = (searchInput) => {
        axios.post(apiEndpoint + "/Project/getAccountsBySearch?searchQuery=" + searchInput.value).then(response => {
            this.setState({ listOfSearchedAccounts: [] }, () => {
                let listOfReceivedAccounts = response.data;
                let finalListOfSearchAccounts = [];

                // for each received account check if it's already in the list of search accounts. if it's not add it to finalListOfSearchAccounts (this is done so that if the user selects a certain accout but then searches for it again, the accout won't show up again which will prevent the user from adding the same account multiple times to the same project.)
                listOfReceivedAccounts.forEach(a => {
                    let receivedAccountId = a["Id"];
                    let currentAccoutIsAlreadySelected = false;

                    this.state.listOfSelectedAccounts.forEach(e => {
                        if(e["Id"] === receivedAccountId){
                            currentAccoutIsAlreadySelected = true;
                        }
                    });

                    if(!currentAccoutIsAlreadySelected){
                        // before adding the accout to finalListOfSearchAccounts check if that accout is the account of the user that is creating the project (the current user)
                        if(this.props.user.id !== receivedAccountId){
                            finalListOfSearchAccounts.push(a);
                        }
                    }
                });

                this.setState({ listOfSearchedAccounts: finalListOfSearchAccounts });
            });
        }).catch(error => {
            this.setState({ listOfSearchedAccounts: [] });
        });
    }

    onAccountClickCallback = (accountObj) => {
        let { listOfSearchedAccounts, listOfSelectedAccounts } = this.state;
        let searchedAccounts = listOfSearchedAccounts;
        let selectedAccounts = listOfSelectedAccounts;

        //console.log(searchedAccounts);

        // the logic here moves an account (when it's clicked) to the opposite column. From "Choose participants" to "Selected People" and the other way around as well.
        let clickedAccount = searchedAccounts.find(e => {return (e.FullName === accountObj.FullName && e.Email === accountObj.Email)});
        if(clickedAccount === undefined){
            clickedAccount = selectedAccounts.find(e => {return (e.FullName === accountObj.FullName && e.Email === accountObj.Email)});
            let deletedAccount = selectedAccounts.splice(selectedAccounts.indexOf(clickedAccount), 1)[0];
            searchedAccounts.push(deletedAccount);
        }else{
            let deletedAccount = searchedAccounts.splice(searchedAccounts.indexOf(clickedAccount), 1)[0];
            //console.log(deletedAccount);
            selectedAccounts.push(deletedAccount);
            //console.log(selectedAccounts);
        }

        // here we first null the lists and after they are nulled in the callback function of setState we update the lists (for some reason this is nessacary otherwise we get dublicate rendering of some accounts and in general it just does not work) in order to render the correct accounts in the correct place.
        this.setState({ listOfSearchedAccounts: [], listOfSelectedAccounts: [] }, () => {this.setState({ listOfSearchedAccounts: searchedAccounts, listOfSelectedAccounts: selectedAccounts });});
    }

    render() { 
        let { createBoard, listOfSearchedAccounts, listOfSelectedAccounts, listOfSearchedAccountsContainerRef, createProjectBtnRef, currentModalRef, titleInputRef, searchInputRef, titleUnderlineRef, searchUnderlineRef, titleMaxLength, remainingTitleCharacters } = this.state;

        return (
            <React.Fragment>
                <div ref={currentModalRef} className='create-project-modal-content-container flex column justify-center align-center'>
                    {/* <UnderConstruction closeBtn={this.state.closeBtn} /> */}
                    <div className='name-the-project-container flex'>
                        <label>{ createBoard ? "Board Name:" : "Project Name:"}</label>
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
                            <div ref={listOfSearchedAccountsContainerRef} className='user-showcase-container flex column'>
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
                                    return <AccountAsListItem onClickCallback={() => {this.onAccountClickCallback(accountObj)}} accountName={accountObj["FullName"]} accountEmail={accountObj["Email"]} accountPfp={accountObj["ProfilePicture"]} accountActionIcon={addAccountIcon} />}
                                )}

                            </div>
                        </div>

                        <div className='flex column'>
                            <label className='user-showcase-label'>Selected People</label>
                            <div className='user-showcase-container flex column'>
                                
                                {listOfSelectedAccounts.map(accountObj => {
                                    return <AccountAsListItem onClickCallback={() => {this.onAccountClickCallback(accountObj)}} accountName={accountObj["FullName"]} accountEmail={accountObj["Email"]} accountPfp={accountObj["ProfilePicture"]} accountActionIcon={removeAccountIcon} rotateActionIcon={true} />
                                })}

                            </div>
                        </div>

                    </div>

                    <button ref={createProjectBtnRef} style={{ marginTop: "3rem", width: "max-content", backgroundColor: "transparent" }} className='button'>{createBoard ? "Create Board" : "Create Project"}</button>

                </div>
            </React.Fragment>
        );
    }
}
 
export default CreateProjectModalContent;