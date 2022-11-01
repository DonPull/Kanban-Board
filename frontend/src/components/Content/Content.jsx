import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "../../styles/Content.css";
import FilterPill from './FilterPill';
import Modal from '../Modal';
import CreateProjectModalContent from '../Sidebar/ProjectButtons/CreateProjectModalContent';
import FilterModalContent from './FilterModalContent';
import TestModalContent from './../TestModalContent';

class Content extends Component {
    state = {
        addFilterBtnId: "add-filter-btn",
        addPersonFilterBtnId: "add-person-filter-btn"
    }

    render() {
        let { addFilterBtnId, addPersonFilterBtnId } = this.state;

        return (
            <div id="content" className='flex column width-100-percent height-100-percent'>
                <div className='flex column justify-space-between'>

                    <div id="filters-container" className='flex'>
                        <FilterPill id={addFilterBtnId} isAddFilterBtn={true} label="Add Filter" />
                        <div className='separator-vertical' />
                        <FilterPill label="Backend" />
                        <FilterPill label="Frontend" />
                    </div>

                    <div id='people-filters-container' className='flex'>
                        <FilterPill id={addPersonFilterBtnId} isAddFilterBtn={true} label="Add Person" />
                        <div className='separator-vertical' />
                        <FilterPill label="Martin" />
                        <FilterPill label="Ivan" />
                        <FilterPill label="Dimitur Dimitrov" />
                    </div>

                    {<Modal modalContent={<FilterModalContent />} openBtnId={addFilterBtnId} />}
                    {<Modal modalContent={<FilterModalContent />} openBtnId={addPersonFilterBtnId} />} 
                </div>

                <div className='kanban-board width-100-percent'>
                    <div className='kanban-column'>

                    </div>
                    <div className='kanban-column'>

                    </div>
                </div>
            </div>
        );
    }
}
 
export default Content;