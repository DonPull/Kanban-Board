import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "../styles/App.css";
import "../styles/common.css";
import Sidebar from './Sidebar';

export default function App(){
    return (
        <div>
            <Sidebar />
        </div>
    );
}