import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import testPfpIcon from '../assets/test_profile_pic_1.jpg';

class AccountAsListItem extends Component {
    state = {
        accountRef: React.createRef(),
        accountName: this.props.accountName,
        accountEmail: this.props.accountEmail,
        accountActionIcon: this.props.accountActionIcon
    }

    componentDidMount(){
        this.state.accountRef.current.onclick = (event) => { this.props.onClickCallback() };
    }

    render() {
        let { accountRef, accountName, accountEmail, accountActionIcon } = this.state;

        return (
            <div ref={accountRef} className='user-showcase-account-container flex'>
                <div className='flex align-center'>
                    <img src={testPfpIcon} />
                </div>
                <div>
                <div className='flex column' style={{ margin: "0 1rem", maxWidth: "200px" }}>
                    <label>{accountName}</label>
                    <label>{accountEmail}</label>
                </div>
                </div>
                <div className='flex align-center'>
                    <img src={accountActionIcon} />
                </div>
            </div>
        );
    }
}
 
export default AccountAsListItem;