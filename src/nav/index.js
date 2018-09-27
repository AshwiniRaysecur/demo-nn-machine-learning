import React from 'react';
import {NavLink} from 'react-router-dom';

import './Navigation.css';

class Navigation extends React.Component {

    render() {
        return(
            <div className='navigation'>
                <NavLink to='/'>About</NavLink>
                <span className='spacer'></span>
                <NavLink to='/demo'>Demo</NavLink>
            </div>
        );
    }

}

export default Navigation;