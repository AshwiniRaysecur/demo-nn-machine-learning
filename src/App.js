import './App.css';
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
// -------   custom ------------
import MachineLearningSystem from "./MachineLearningSystem";
import MyContent from "./MyContent";
import Navigation from "./nav";

class App extends Component {
    render() {
        return(
            <div className='app-wrapper'>
                <Navigation/>
                <main>
                    <Route exact path="/"     component={MyContent} />
                    <Route exact path="/demo" component={MachineLearningSystem} />
                </main>
            </div>
        );
    }
}

export default App;

