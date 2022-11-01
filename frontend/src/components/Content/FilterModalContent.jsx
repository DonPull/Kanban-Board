import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';
import FilterPill from './FilterPill';
import "./FilterModalContent.css";

class FilterModalContent extends Component {
    state = {
        modalId: uuid(),
        availableTags: [ <FilterPill label="available-tag"/> ],
        appliedTags: [ <FilterPill label="TEST"/>, <FilterPill label="test3"/>, <FilterPill label="test" /> ]
    }

    renderModalFilters(array, label) {
        return (
            <div className='tags-modal-search flex column align-center height-100-percent'>
                <label>{label}</label>
                <input placeholder='Search for tags.' />

                <div className='filter-pills-modal-container flex column align-center'>
                    {/* <FilterPill label="test123"/> */}
                    {/* {Object.values(obj).map((key, value) => <key.component />)} */}
                    {array.map(value => value)}
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.props.getCloseBtn();
    }

    render() {
        let { modalId, availableTags, appliedTags } = this.state;

        return (
            <div id={modalId} style={{ width: "40vw", height: "45vh" }} className="flex justify-space-evenly min-width-max-content">
                {this.renderModalFilters(availableTags, "Available Tags")}
                <div className='separator-vertical' style={{ height: "95%" }} />
                {this.renderModalFilters(appliedTags, "Applied Tags")}
            </div>
        );
    }
}
 
export default FilterModalContent;