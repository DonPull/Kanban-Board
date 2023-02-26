import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./FilterPill.css";
import addOrRemoveFilterIcon from '../../../assets/+_and_x_icon.svg';

class FilterPill extends Component { 
    render() {
        let classes = 'filter flex'; 
        if (this.props.isAddFilterBtn) {
            classes += ' add-filter-btn';
        }

        return (
            <div id={this.props.id} style={ this.props.hide ? { display: "none"} : { display: "" } } className={classes}>
                <div className='filter-label-container'>
                    <label>{this.props.label}</label>
                </div>

                <div className="add-or-remove-filter-img">
                    <img src={addOrRemoveFilterIcon}/>
                </div>
            </div>
        );
    }
}
 
export default FilterPill;