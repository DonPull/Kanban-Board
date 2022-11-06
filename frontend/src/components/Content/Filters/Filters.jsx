import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FilterPill from './FilterPill';
import Modal from '../../Modal';
import FilterModalContent from './FilterModalContent';

class Filters extends Component {
    state = {
        addFilterBtnId: "add-filter-btn",
        addPersonFilterBtnId: "add-person-filter-btn",
        filterTags: [<FilterPill label="Backend" />, <FilterPill label="Frontend" />],
        filterPeople: [ <FilterPill label="Martin" />, <FilterPill label="Ivan" />, <FilterPill label="Dimitur Dimitrov" />]
    } 
    render() { 
        let { addFilterBtnId, addPersonFilterBtnId, filterTags, filterPeople } = this.state;

        return (
            <div className='flex column justify-space-between'>
                <div id="filters-container" className='flex'>
                    <FilterPill id={addFilterBtnId} isAddFilterBtn={true} label="Add Filter" />
                    {filterTags.length > 0 ? <div className='separator-vertical' /> : ""}
                    {filterTags.map(f => f)}
                </div>

                <div id='people-filters-container' className='flex'>
                    <FilterPill id={addPersonFilterBtnId} isAddFilterBtn={true} label="Add Person" />
                    {filterPeople.length > 0 ? <div className='separator-vertical' /> : ""}
                    {filterPeople.map(f => f)}
                </div>

                {<Modal modalContent={<FilterModalContent />} openBtnId={addFilterBtnId} />}
                {<Modal modalContent={<FilterModalContent />} openBtnId={addPersonFilterBtnId} />} 
            </div>
        );
    }
}
 
export default Filters;