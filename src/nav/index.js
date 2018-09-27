import React from 'react';
import {NavLink} from 'react-router-dom';

class Navigation extends React.Component {

    render() {
        return(
            <div>
                <NavLink to='/demo'>Demo</NavLink>
                <span className='spacer'></span>
                <NavLink to='/'>About</NavLink>
            </div>
        );
    }

}

export default Navigation;