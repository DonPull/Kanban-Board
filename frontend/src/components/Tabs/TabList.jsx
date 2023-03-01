import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Tab from './Tab';
import newTabIcon from '../../assets/+_and_x_icon.svg';
import "./TabList.css";

class TabList extends Component {
    state = {
        tabs: [1, 2, 3, 4, 5, 6, 7, 8]
    }

    render() {
        let tabs = this.state.tabs;

        return (
            <div id='tab-list' style={{ opacity: "0", height: "6px" }} >
                {tabs.map((key) => <Tab key={key} />)}
                <div id="create-new-tab">
                    <img src={newTabIcon} />
                </div>
            </div>
        );
    }
}
 
export default TabList;