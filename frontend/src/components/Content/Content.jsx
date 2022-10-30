import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import "../../styles/Content.css";
import FilterPill from './FilterPill';
import Modal from '../Modal';
import CreateProjectModalContent from '../Sidebar/ProjectButtons/CreateProjectModalContent';

class Content extends Component {
    state = {
        addFilterBtnId: "add-filter-btn",
        addPersonFilterBtnId: "add-person-filter-btn",
    }

    render() {
        const { addFilterBtnId, addPersonFilterBtn } = this.state;

        return (
            <div id="content" className='flex column width-100-percent height-100-percent'>
                <div className='flex column justify-space-between'>

                    <div id="filters-container" className='flex'>
                        <FilterPill someId={addFilterBtnId} isAddFilterBtn={true} label="Add Filter" />
                        <div className='separator-vertical' />
                        <FilterPill label="Backend" />
                        <FilterPill label="Frontend" />
                    </div>

                    <div id='people-filters-container' className='flex'>
                        <FilterPill someId={addPersonFilterBtn} isAddFilterBtn={true} label="Add Person" />
                        <div className='separator-vertical' />
                        <FilterPill label="Martin" />
                        <FilterPill label="Ivan" />
                        <FilterPill label="Dimitur Dimitrov" />
                    </div>

                    <Modal modalContent={<p>Add Filter Test123</p>} openBtnId={addFilterBtnId} />
                    <Modal modalContent={<p>Add Person Filter Test123</p>} openBtnId={addPersonFilterBtn} />
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