import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';


const appRoot = ( myProps ) => {
    return(
        <BrowserRouter>
            <App/>
        </BrowserRouter>

    );
};

ReactDOM.render( appRoot(), document.getElementById('root') );

