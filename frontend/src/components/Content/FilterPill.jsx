import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../../styles/FilterPill.css";

class FilterPill extends Component { 
    render() {
        let classes = 'filter';
        if (this.props.isAddFilterBtn) {
            classes += ' add-filter-btn';
        }

        return (
            <div id={this.props.id} className={classes}>
                <div className='filter-label-container'>
                    <label>{this.props.label}</label>
                </div>
            </div>
        );
    }
}
 
export default FilterPill;