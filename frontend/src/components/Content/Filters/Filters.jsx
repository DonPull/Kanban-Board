import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FilterPill from './FilterPill';
import Modal from '../../Modal';
import FilterModalContent from './FilterModalContent';
import collapseArrow from "../../../assets/collapse_arrow.png";

class Filters extends Component {
    state = {
        addTagBtnId: "add-tag-btn",
        addPersonTagBtnId: "add-person-tag-btn",
        collapseFiltersBtnRef: React.createRef(),
        filtersContainerRef: React.createRef(),
        outerFiltersContainerRef: React.createRef(),
        filtersAreCollapsed: false,
        filterTags: [<FilterPill label="Backend" />, <FilterPill label="Frontend" />],
        filterPeople: [ <FilterPill label="Martin" />, <FilterPill label="Ivan" />, <FilterPill label="Dimitur Dimitrov" />]
    }

    componentDidMount(){
        let { collapseFiltersBtnRef, filtersContainerRef, outerFiltersContainerRef } = this.state;
        let collapseFiltersBtn = collapseFiltersBtnRef.current;
        let filtersContainer = filtersContainerRef.current;
        let outerFiltersContainer = outerFiltersContainerRef.current;
        
        //TODO: make an animation for resizing of the filters container and make an animation for the collapse arrow (to make it actually good am gonna need 2 divs that transform: rotate() on btn press)
        // also fix bug where after filter collapse if you click "Add Filter" or "Add Person" the modal window does not open (my guess is that because i give an event listener to the open btn and then unrender it maybe that removes the event listener idk)
        console.log("computed height before btn click: ", window.getComputedStyle(outerFiltersContainer).height);
        collapseFiltersBtn.onclick = (e) => {
            // align all filter pills on the same row
            if(this.state.filtersAreCollapsed){
                filtersContainer.style.flexDirection = "column"
            }else{
                filtersContainer.style.flexDirection = "row";
                filtersContainer.style.justifyContent = "flex-start";
            }
            // remove the ".filter" styles from the filter pills (because they are going to be on the same line and there won't be a lot of space)
            document.querySelectorAll(".filter").forEach((f) => {
                this.state.filtersAreCollapsed ? f.classList.remove("collapsed-filter") : f.classList.add("collapsed-filter");
            });
            // show all commas that are going to be separating the filter pills now that they are on the same line
            document.querySelectorAll(".tag-comma").forEach((c) => {
                this.state.filtersAreCollapsed ? c.style.display = "none" : c.style.display = "block";
            });
            console.log("computed height AFTER btn click: ", window.getComputedStyle(outerFiltersContainer).height);
            //collapseFiltersBtn.querySelector("img").classList.add("collapse-filters-animation");
            this.setState({ filtersAreCollapsed: !this.state.filtersAreCollapsed });
        };
    }

    render() { 
        let { addTagBtnId, addPersonTagBtnId, filtersAreCollapsed, filtersContainerRef, outerFiltersContainerRef, filterTags, filterPeople } = this.state;

        return (
            <div ref={outerFiltersContainerRef} style={{ position: "relative" }} className='flex column justify-space-between'>
                <div ref={filtersContainerRef} id="filters-container" className='flex column'>
                    {/* <div id="filters-container" className='flex'> */}
                    <div className='flex'>
                        {filtersAreCollapsed ? <div className='collapsed-filters-label'>Filters</div> : <FilterPill id={addTagBtnId} isAddFilterBtn={true} label="Add Filter" />}
                        {filterTags.length > 0 && !filtersAreCollapsed ? <div className='separator-vertical' /> : ""}
                        {/* {filterTags.map(f => f)} */}
                        {filterTags.map(f => { return( <div className='flex justify-center align-center'> {f} <div className='tag-comma'>,</div> </div> ) })}
                    </div>

                    {/* <div id='people-filters-container' className='flex'> */}
                    <div className='flex'>
                        {filtersAreCollapsed ? <div className='collapsed-filters-label'>People</div> : <FilterPill id={addPersonTagBtnId} isAddFilterBtn={true} label="Add Person" />}
                        {filterPeople.length > 0 && !filtersAreCollapsed ? <div className='separator-vertical' /> : ""}
                        {filterPeople.map(f => { return( <div className='flex justify-center align-center'> {f} <div className='tag-comma'>,</div> </div> ) })}
                    </div>
                </div>

                <div className='main-section-separator'/>

                <div ref={this.state.collapseFiltersBtnRef} id="collapse-filters-btn">
                    <img src={collapseArrow}/>
                </div>

                {<Modal modalContent={<FilterModalContent />} openBtnId={addTagBtnId} />}
                {<Modal modalContent={<FilterModalContent />} openBtnId={addPersonTagBtnId} />} 
            </div>
        );
    }
}
 
export default Filters;