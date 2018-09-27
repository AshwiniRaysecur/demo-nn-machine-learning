import React from 'react';
import {NavLink} from 'react-router-dom';

class Navigation extends React.Component {

    render() {
        return(
            <div>
                <NavLink to='/'>About</NavLink>
                <span className='spacer'></span>
                <NavLink to='/demo'>Demo</NavLink>
            </div>
        );
    }

}

export default Navigation;