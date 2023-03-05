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
import Filters from './Content/Filters/Filters';
import KanbanBoard from './Content/KanbanBoard/KanbanBoard';
import ViewProjects from './Content/ViewProjects/ViewProjects';

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
                            {/* <TabList /> */}
                            <Content renderComp={<ViewProjects />} />
                        </div>
                    </React.Fragment>,
                errorElement: <NotFound />
            },
            {
                path: "/projects/:projectId",
                element: 
                    <React.Fragment>
                        <Sidebar />
                        <div className='flex column width-100-percent'>
                            {/* <TabList /> */}
                            <Content renderComp={<label>This is the project element</label>} />
                        </div>
                    </React.Fragment>
            },
            {
                path: "/projects/:projectId/boards/:boardId",
                element: 
                    <React.Fragment>
                        <Sidebar />
                        <div className='flex column width-100-percent'>
                            {/* <TabList /> */}
                            <Content renderComp={
                                <React.Fragment>
                                    <Filters />
                                    <KanbanBoard />
                                </React.Fragment>
                            }/>
                        </div>
                    </React.Fragment>
            },
            {
                path: "/login",
                element: <Login />
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