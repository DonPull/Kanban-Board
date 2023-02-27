import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AccountAsListItem extends Component {
    state = {
        accountName: this.props.accountName,
        accountEmail: this.props.accountEmail
    }

    render() { 
        return (
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
        );
    }
}
 
export default AccountAsListItem;