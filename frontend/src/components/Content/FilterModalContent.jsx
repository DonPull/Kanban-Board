import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';
import FilterPill from './FilterPill';
import "./FilterModalContent.css";

class FilterModalContent extends Component {
    state = {
        modalId: uuid(),
        filterSearchRef1: React.createRef(),
        filterSearchRef2: React.createRef(),
        filtersContainerRef1: React.createRef(),
        filtersContainerRef2: React.createRef(),
        availableTags: [ <FilterPill label="available-tag"/> ],
        appliedTags: [ <FilterPill label="TEST"/>, <FilterPill label="test3"/>, <FilterPill label="test" /> ]
    }

    componentDidMount(){
        this.props.getCloseBtn();

        let { filterSearchRef1, filterSearchRef2, filtersContainerRef1, filtersContainerRef2 } = this.state;
        this.addSearchFunctionality(filterSearchRef1.current, filtersContainerRef1.current, ".filter");
        this.addSearchFunctionality(filterSearchRef2.current, filtersContainerRef2.current, ".filter");
    }

    addSearchFunctionality(searchFieldElement, containerOfSearchableElements, classOfElementsToBeSearched){
        let searchBar = searchFieldElement;
        let searchElements = containerOfSearchableElements.querySelectorAll("." + classOfElementsToBeSearched.replaceAll(".", "").trim());

        searchBar.addEventListener("input", conLog);

        function conLog() {
            let regex = new RegExp(searchBar.value.replaceAll(".", "").replaceAll(",", "").replaceAll("/", "").replaceAll("\\", "").replaceAll("-", "").replaceAll("_", "").replaceAll(" ", "").trim(), 'gi');
            for(let element of searchElements){
                if(!regex.test(element.innerText.replaceAll(".", "").replaceAll(",", "").replaceAll("/", "").replaceAll("\\", "").replaceAll("-", "").replaceAll("_", "").replaceAll(" ", "").trim())){
                    element.style.display = "none";
                }else{
                    element.style.display = "initial";
                }
            }        
        }
    }

    renderModalFilters(array, label, filterSearchRef, filtersContainerRef) {
        return (
            <div className='tags-modal-search flex column align-center height-100-percent'>
                <label>{label}</label>
                <input ref={filterSearchRef} className="searchForTagsInput" placeholder='Search for tags.' />

                <div ref={filtersContainerRef} className='filter-pills-modal-container flex column align-center'>
                    {/* <FilterPill label="test123"/> */}
                    {/* {Object.values(obj).map((key, value) => <key.component />)} */}
                    {array.map(value => value)}
                </div>
            </div>
        );
    }

    render() {
        let { modalId, availableTags, appliedTags, filterSearchRef1, filterSearchRef2, filtersContainerRef1, filtersContainerRef2 } = this.state;

        return (
            <div id={modalId} style={{ width: "40vw", height: "45vh" }} className="flex justify-space-evenly min-width-max-content">
                {this.renderModalFilters(availableTags, "Available Tags", filterSearchRef1, filtersContainerRef1)}
                <div className='separator-vertical' style={{ height: "95%" }} />
                {this.renderModalFilters(appliedTags, "Applied Tags", filterSearchRef2, filtersContainerRef2)}
            </div>
        );
    }
}
 
export default FilterModalContent;