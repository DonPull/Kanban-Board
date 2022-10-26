import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "../styles/App.css";
import "../styles/common.css";
import Sidebar from './Sidebar';
import Content from './Content';
import TabList from './TabList';

export default function App(){
    return (
        <React.Fragment>
            <Sidebar />
            <div className='flex column width-100-percent'>
                <TabList />
                <Content />
            </div>
        </React.Fragment>
    );
}