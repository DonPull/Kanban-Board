import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FilterPill from './FilterPill';
import Modal from '../../Modal';
import FilterModalContent from './FilterModalContent';
import collapseArrow from "../../../assets/collapse_arrow.png";
import editBoardIcon from "../../../assets/edit.png";
import './Filters.css';

class Filters extends Component {
    state = {
        addTagBtnId: "add-tag-btn",
        addPersonTagBtnId: "add-person-tag-btn",
        collapseFiltersBtnRef: React.createRef(),
        filtersContainerRef: React.createRef(),
        outerFiltersContainerRef: React.createRef(),
        editBoardButtonRef: React.createRef(),
        currentlyEditingBoard: false,
        filtersAreCollapsed: false,
        filterTags: ["Backend", "Frontend"],
        filterPeople: ["Martin", "Ivan", "Dimitur Dimitrov"]
    }

    componentDidMount(){
        let { collapseFiltersBtnRef, filtersContainerRef, outerFiltersContainerRef, editBoardButtonRef } = this.state;
        let [collapseFiltersBtn, filtersContainer, outerFiltersContainer, editBoardButton] = [collapseFiltersBtnRef.current, filtersContainerRef.current, outerFiltersContainerRef.current, editBoardButtonRef.current];
        
        editBoardButton.onclick = (event) => { console.log("collapse filter btn: ", editBoardButton);this.editBoardButtonOnClick(event, editBoardButton) };

        collapseFiltersBtn.onclick = (e) => {
            // align all filter pills on the same row
            if(this.state.filtersAreCollapsed){
                filtersContainer.style.flexDirection = "column";
                filtersContainer.style.margin = "1.5rem 0";
                //flip the "collapse filters" icon
                collapseFiltersBtn.querySelector("img").style.transform = "rotate(180deg)";
                //make the text and the img in the editBoardButton big again
                editBoardButton.style.padding = "1rem";
                editBoardButton.querySelector("label").style.fontSize = "18px";
                editBoardButton.querySelector("img").style.width = "3rem";
                editBoardButton.querySelector("img").style.height = "3rem";
            }else{
                filtersContainer.style.flexDirection = "row";
                filtersContainer.style.justifyContent = "flex-start";
                filtersContainer.style.margin = "0.8rem 0";
                //flip the "collapse filters" icon
                collapseFiltersBtn.querySelector("img").style.transform = "rotate(0deg)";
                //make the text and the img in the editBoardButton smaller so they fit in the collapsed filter section
                editBoardButton.style.padding = "0.6rem 1rem";
                editBoardButton.querySelector("label").style.fontSize = "14px";
                editBoardButton.querySelector("img").style.width = "2rem";
                editBoardButton.querySelector("img").style.height = "2rem";
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

    editBoardButtonOnClick = (e, editBoardButton) => {
        let editBtnLabel = editBoardButton.querySelector("label");
        let editBtnImage = editBoardButton.querySelector("img");
        let { currentlyEditingBoard } = this.state; 

        if(currentlyEditingBoard){
            editBoardButton.classList.remove("edit-board-button-new-hover");
            editBtnLabel.innerText = "Edit Board";
            editBtnLabel.style.color = "var(--theme-color-accent-1)";
            editBtnImage.style.filter = "var(--theme-color-accent-1-filter)";
        }else{
            editBoardButton.classList.add("edit-board-button-new-hover");
            editBtnLabel.innerText = "Finish Editing";
            editBtnLabel.style.color = "#B7F7C4";
            editBtnImage.style.filter = "invert(94%) sepia(7%) saturate(1386%) hue-rotate(68deg) brightness(99%) contrast(96%)";
        }
        
        this.setState({ currentlyEditingBoard: !currentlyEditingBoard });
    }

    render() { 
        let { editBoardButtonRef, addTagBtnId, addPersonTagBtnId, filtersAreCollapsed, filtersContainerRef, outerFiltersContainerRef, filterTags, filterPeople } = this.state;

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
                            {filterTags.length > 0 && !filtersAreCollapsed ? <div style={{ backgroundColor: "rgb(56 56 56)" }} className='separator-vertical' /> : ""}
                            {filterTags.map(f => { return( <div className='flex justify-center align-center'> <FilterPill label={f} /> <div className='tag-comma'>,</div> </div> ) })}
                        </div>

                        {/* <div id='people-filters-container' className='flex'> */}
                        <div className='flex'>
                            <FilterPill id={addPersonTagBtnId} hide={filtersAreCollapsed} isAddFilterBtn={true} label="Add Person" />
                            {filtersAreCollapsed ? <div className='collapsed-filters-label'>People</div> : ""}
                            {filterPeople.length > 0 && !filtersAreCollapsed ? <div style={{ backgroundColor: "rgb(56 56 56)" }} className='separator-vertical' /> : ""}
                            {filterPeople.map(f => { return( <div className='flex justify-center align-center'> <FilterPill label={f} /> <div className='tag-comma'>,</div> </div> ) })}
                        </div>
                    </div>

                    <div ref={editBoardButtonRef} id="edit-board-button" className='flex'>
                        <img src={editBoardIcon}/>
                        <label>Edit Board</label>
                    </div>

                </div>

                <div className='main-section-separator' style={{ marginTop: "0" }}/>

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