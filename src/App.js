import './App.css';
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
// -------   custom ------------
import MachineLearningSystem from "./MachineLearningSystem";
import About from "./about";
import Navigation from "./nav";

class App extends Component {
    render() {
        return(
            <div className='app-wrapper'>
                <header>Synaptic Perceptron Demo in React</header>
                <Navigation/>
                <main>
                    <Route exact path="/"     component={About} />
                    <Route exact path="/demo" component={MachineLearningSystem} />
                </main>
            </div>
        );
    }
}

export default App;

