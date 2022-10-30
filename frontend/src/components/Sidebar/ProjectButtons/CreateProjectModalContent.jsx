import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UnderConstruction from './../../UnderConstruction';

class CreateProjectModalContent extends Component {
    state = {
        closeBtn: React.createRef()
    }
    componentDidMount(){
        this.props.getCloseBtn(this.state.closeBtn.current);
    }

    render() { 
        return (
            <div style={{ width: "50vw", height: "50vh" }} className='flex column justify-center align-center'>
                <UnderConstruction closeBtn={this.state.closeBtn} />
            </div>
        );
    }
}
 
export default CreateProjectModalContent;