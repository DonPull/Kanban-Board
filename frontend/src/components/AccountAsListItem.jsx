import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import unsetPfp from '../assets/unset_profile_picture.png';

class AccountAsListItem extends Component {
    state = {
        accountRef: React.createRef(),
        addOrRemoveAccountIconRef: React.createRef(),
        accountName: this.props.accountName,
        accountEmail: this.props.accountEmail,
        accountPfp: this.props.accountPfp || unsetPfp,
        accountActionIcon: this.props.accountActionIcon,
        rotateActionIcon: this.props.rotateActionIcon,
        accountIsSelected: false
    }

    componentDidMount(){
        let clickedAccount = this.state.accountRef.current;
        clickedAccount.onclick = (event) => {
            let accountIsSelected = !this.state.accountIsSelected;
            this.setState({ accountIsSelected });

            this.props.onClickCallback(clickedAccount, accountIsSelected);
        };

        // adding smooth transition to the account add/remove icon. did it here because it would be harder to do and read if i did it in the inline styles.
        this.state.addOrRemoveAccountIconRef.current.style.transition = "200ms";
    }

    render() {
        let { accountRef, accountName, accountEmail, accountPfp, accountActionIcon, rotateActionIcon, addOrRemoveAccountIconRef } = this.state;

        return (
            <div ref={accountRef} className='user-showcase-account-container flex'>
                <div className='flex align-center'>
                    <img src={accountPfp} />
                </div>
                <div>
                <div className='flex column' style={{ margin: "0 1rem", maxWidth: "200px" }}>
                    <label className='account-as-list-item-fullname'>{accountName}</label>
                    <label className='account-as-list-item-email'>{accountEmail}</label>
                </div>
                </div>
                <div className='flex align-center'>
                    <img ref={addOrRemoveAccountIconRef} style={ rotateActionIcon ? { transform: "rotate(45deg)" } : {} } src={accountActionIcon} />
                </div>
            </div>
        );
    }
}
 
export default AccountAsListItem;