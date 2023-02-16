import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "../styles/App.css";
import "../styles/common.css";
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';
import TabList from './Tabs/TabList';
import { render } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import NotFound from './NotFound';

export default class App extends Component{
    componentDidMount(){
        if(document.body.scrollWidth > window.innerWidth){
            document.body.style.paddingBottom = "0.8rem";
        }
    }
    
    render(){
        const router = createBrowserRouter([
            {
                path: "/",
                element: 
                    <React.Fragment>
                        <Sidebar />
                        <div className='flex column width-100-percent'>
                            <TabList />
                            <Content />
                        </div>
                    </React.Fragment>,
                errorElement: <NotFound />
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />
            }
        ]);

        return (
            <RouterProvider router={router} />
        );
    };
}