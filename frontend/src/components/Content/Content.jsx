import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "./Content.css";
import Filters from './Filters/Filters';
import KanbanBoard from './KanbanBoard/KanbanBoard';

class Content extends Component {
    render() {
        return (
            <div id="content" className='flex column width-100-percent height-100-percent'>
                <Filters />
                <KanbanBoard />
            </div>
        );
    }
}
 
export default Content;