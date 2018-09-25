import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


class MyContent extends Component {

    render() {
        return(
            <div className='content-wrapper'>
                <div>
                    <NavLink to='/'>My Content</NavLink>
                    <NavLink to='/canvas'>My Canvas</NavLink>
                </div>
                <div>TEST CONTENT</div>
            </div>
        );
    }

}

export default MyContent;