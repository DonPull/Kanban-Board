import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import unsetPfp from '../assets/unset_profile_picture.png';

class AccountAsListItem extends Component {
    state = {
        accountRef: React.createRef(),
        accountName: this.props.accountName,
        accountEmail: this.props.accountEmail,
        accountPfp: this.props.accountPfp || unsetPfp,
        accountActionIcon: this.props.accountActionIcon,
        rotateActionIcon: this.props.rotateActionIcon
    }

    componentDidMount(){
        this.state.accountRef.current.onclick = (event) => { this.props.onClickCallback() };
    }

    render() {
        let { accountRef, accountName, accountEmail, accountPfp, accountActionIcon, rotateActionIcon } = this.state;

        return (
            <div ref={accountRef} className='user-showcase-account-container flex'>
                <div className='flex align-center'>
                    <img src={accountPfp} />
                </div>
                <div>
                <div className='flex column' style={{ margin: "0 1rem", maxWidth: "200px" }}>
                    <label>{accountName}</label>
                    <label>{accountEmail}</label>
                </div>
                </div>
                <div className='flex align-center'>
                    <img style={ rotateActionIcon ? { transform: "rotate(45deg)" } : {} } src={accountActionIcon} />
                </div>
            </div>
        );
    }
}
 
export default AccountAsListItem;