import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Filters from './Filters/Filters';
import KanbanBoard from './KanbanBoard/KanbanBoard';

class Content extends Component {
    render() {
        return (
            <div id="content" style={{ backgroundColor: "var(--theme-color-bg)", borderTopLeftRadius: "20px", overflow: "auto", marginTop: "2.3rem" }} className='flex column width-100-percent min-width-max-content height-100-percent min-height-max-content'>
                {this.props.renderComp}
            </div>
        );
    }
}
 
export default Content;