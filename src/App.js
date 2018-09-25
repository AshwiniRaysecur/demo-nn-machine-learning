import './App.css';

import React, {Component} from 'react';

import {Route} from 'react-router-dom';

import MyContent from "./MyContent";
import MachineLearningSystem from "./MachineLearningSystem";

class App extends Component {

    render() {
        return(
            <div className='app-wrapper'>
                <Route exact path="/" component={MyContent} />
                <Route exact path="/canvas" component={MachineLearningSystem} />
            </div>
        );
    }

}

export default App;

