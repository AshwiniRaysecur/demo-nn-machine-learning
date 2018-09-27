import React, {Component} from 'react';
import './About.css';

class About extends Component {

    render() {
        return(
            <div className='content-wrapper'>
                <div className='heading'>Perceptron Demo</div>
                <div className='image-wrap'>
                    <img
                      src='./images/perceptron-architecture.jpg'
                    />
                </div>
                <div className='para'>Demonstrates an image processing neural network using the <em>Synaptic perceptron architecture</em>.</div>
                <div className='para'>The system: (1) trains over some number of iterations using the provided input sample and target output, and (2) generalizes to produce new outputs given new inputs without an explicit algorithm.</div>
                <div className='para'>This port to react exemplifies (among other things)...</div>
                <ol>
                    <li>Utilization of the Synaptic libraries to implement machine learning in a react app,</li>
                    <li>Image processing using HTML5 canvas in react,</li>
                    <li>Managing canvas state in a react app.</li>
                </ol>
            </div>
        );
    }

}

export default About;
