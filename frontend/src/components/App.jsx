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
import Home from './Home';

export default class App extends Component{
    state = {
        // this user gets set on login
        user: this.props.user,
        cookies: new Cookies()
    }

    componentDidMount(){
        let { user } = this.state;
        // here we check if the user is null because if we don't have the jwt cookie then we set the user to null (it makes sense because if we are not logged in the user object is going to be null)
        if(user !== null){
            user["updateUserCallback"] = (user) => {this.updateUserCallback(user)};
            user["updateUserCallback"](user);
        }

        if(document.body.scrollWidth > window.innerWidth){
            document.body.style.paddingBottom = "0.8rem";
        }
    }

    updateUserCallback = (user) => {
        this.setState({ user });
    }
    
    render(){
        const router = createBrowserRouter([
            {
                path: "/",
                element: this.state.cookies.get("jwt_token") === undefined ? <Navigate to='/login'/> :
                    <React.Fragment>
                        <Sidebar user={this.state.user} />
                        <div className='flex column width-100-percent'>
                            {/* <TabList /> */}
                            <Content renderComp={<Home />} />
                        </div>
                    </React.Fragment>,
                // errorElement: <NotFound />
                errorElement: <Navigate to='/'/>
            },
            {
                path: "/viewProjects",
                element: this.state.cookies.get("jwt_token") === undefined ? <Navigate to='/login'/> :
                    <React.Fragment>
                        <Sidebar user={this.state.user} />
                        <div className='flex column width-100-percent'>
                            {/* <TabList /> */}
                            <Content renderComp={<ViewProjects />} />
                        </div>
                    </React.Fragment>
            },
            {
                path: "/projects/:projectId",
                element: this.state.cookies.get("jwt_token") === undefined ? <Navigate to='/login'/> :
                    <React.Fragment>
                        <Sidebar user={this.state.user} />
                        <div className='flex column width-100-percent'>
                            {/* <TabList /> */}
                            <Content renderComp={<label>This is the project element</label>} />
                        </div>
                    </React.Fragment>
            },
            {
                path: "/projects/:projectId/boards/:boardId",
                element: this.state.cookies.get("jwt_token") === undefined ? <Navigate to='/login'/> :
                    <React.Fragment>
                        <Sidebar user={this.state.user} />
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
                element: this.state.cookies.get("jwt_token") === undefined ? <Login cookies={this.state.cookies} /> : <Navigate to='/'/>
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