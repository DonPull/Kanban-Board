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
        
        collapseFiltersBtn.onclick = (e) => {
            // align all filter pills on the same row
            if(this.state.filtersAreCollapsed){
                filtersContainer.style.flexDirection = "column"
                //flip the "collapse filters" icon
                collapseFiltersBtn.querySelector("img").style.transform = "rotate(180deg)";
                //restore top margins to original size
                outerFiltersContainer.querySelector(".main-section-separator").style.marginTop = "1.5rem";
                filtersContainer.querySelectorAll(":scope > div").forEach(e => {
                    e.style.marginTop = "1.5rem";
                });
            }else{
                filtersContainer.style.flexDirection = "row";
                filtersContainer.style.justifyContent = "flex-start";
                //flip the "collapse filters" icon
                collapseFiltersBtn.querySelector("img").style.transform = "rotate(0deg)";
                //make top margins smaller to save space
                outerFiltersContainer.querySelector(".main-section-separator").style.marginTop = "0.8rem";
                filtersContainer.querySelectorAll(":scope > div").forEach(e => {
                    e.style.marginTop = "0.8rem";
                });
            }
            // remove the ".filter" styles from the filter pills (because they are going to be on the same line and there won't be a lot of space)
            document.querySelectorAll(".filter").forEach((f) => {
                this.state.filtersAreCollapsed ? f.classList.remove("collapsed-filter") : f.classList.add("collapsed-filter");
            });
            // show all commas that are going to be separating the filter pills now that they are on the same line
            document.querySelectorAll(".tag-comma").forEach((c) => {
                this.state.filtersAreCollapsed ? c.style.display = "none" : c.style.display = "block";
            });

            this.setState({ filtersAreCollapsed: !this.state.filtersAreCollapsed });
        };
    }

    render() { 
        let { addTagBtnId, addPersonTagBtnId, filtersAreCollapsed, filtersContainerRef, outerFiltersContainerRef, filterTags, filterPeople } = this.state;

        return (
            <div ref={outerFiltersContainerRef} style={{ position: "relative" }} className='flex column justify-space-between'>
                
                {/* // the div below is temoporary */}
                <div className='flex'>

                    <div ref={this.state.collapseFiltersBtnRef} id="collapse-filters-btn">
                        <img src={collapseArrow}/>
                    </div>
                    
                    <div ref={filtersContainerRef} id="filters-container" className='flex column'>
                        {/* <div id="filters-container" className='flex'> */}
                        <div className='flex'>
                            <FilterPill id={addTagBtnId} hide={filtersAreCollapsed} isAddFilterBtn={true} label="Add Filter" />
                            {filtersAreCollapsed ? <div className='collapsed-filters-label' style={{ margin: "0", marginRight: "0.8rem" }}>Filters</div> : ""}
                            {filterTags.length > 0 && !filtersAreCollapsed ? <div className='separator-vertical' /> : ""}
                            {/* {filterTags.map(f => f)} */}
                            {filterTags.map(f => { return( <div className='flex justify-center align-center'> {f} <div className='tag-comma'>,</div> </div> ) })}
                        </div>

                        {/* <div id='people-filters-container' className='flex'> */}
                        <div className='flex'>
                            <FilterPill id={addPersonTagBtnId} hide={filtersAreCollapsed} isAddFilterBtn={true} label="Add Person" />
                            {filtersAreCollapsed ? <div className='collapsed-filters-label'>People</div> : ""}
                            {filterPeople.length > 0 && !filtersAreCollapsed ? <div className='separator-vertical' /> : ""}
                            {filterPeople.map(f => { return( <div className='flex justify-center align-center'> {f} <div className='tag-comma'>,</div> </div> ) })}
                        </div>
                    </div>

                </div>

                <div className='main-section-separator'/>

                {/* <div ref={this.state.collapseFiltersBtnRef} id="collapse-filters-btn">
                    <img src={collapseArrow}/>
                </div> */}

                {<Modal modalContent={<FilterModalContent />} openBtnId={addTagBtnId} />}
                {<Modal modalContent={<FilterModalContent />} openBtnId={addPersonTagBtnId} />} 
            </div>
        );
    }
}
 
export default Filters;