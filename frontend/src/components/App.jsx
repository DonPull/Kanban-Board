import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "../styles/App.css";
import "../styles/common.css";
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';
import TabList from './Tabs/TabList';
import { render } from '@testing-library/react';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import NotFound from './NotFound';
import Filters from './Content/Filters/Filters';
import KanbanBoard from './Content/KanbanBoard/KanbanBoard';
import ViewProjects from './Content/ViewProjects/ViewProjects';
import Cookies from 'universal-cookie';

export default class App extends Component{
    state = {
        // this user gets set on login
        user: null,
        cookies: new Cookies(),
        getUser: this.getUser,
        setUser: this.setUser
    }

    componentDidMount(){
        if(document.body.scrollWidth > window.innerWidth){
            document.body.style.paddingBottom = "0.8rem";
        }
    }

    getUser = () => {
        return this.state.user;
    }
    setUser = (user) => {
        console.log("we setting the user to: ", user);
        this.setState({ user });
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
                            <Content />
                        </div>
                    </React.Fragment>,
                // errorElement: <NotFound />
                errorElement: <Navigate to='/'/>
            },
            {
                path: "/viewProjects",
                element: 
                    <React.Fragment>
                        <Sidebar />
                        <div className='flex column width-100-percent'>
                            {/* <TabList /> */}
                            <Content renderComp={<ViewProjects />} />
                        </div>
                    </React.Fragment>
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
                element: <Login getUser={this.getUser} setUser={(user) => {this.setUser(user)}} cookies={this.state.cookies} />
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