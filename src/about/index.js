import React, {Component} from 'react';

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
                <div className='para'>Demonstrates an image processing neural network using the Synaptic perceptron architecture.</div>
                <div>The system trains over some number of iterations using the provided input sample and target output and generalizes to produce new outputs given new inputs without an explicit algorithm.</div>
                <div>This port to react exemplifies (among other things)...</div>
                <ol>
                    <li>utilization of the Synaptic libraries to implement machine learning in a react app,</li>
                    <li>image processing using HTML5 canvas in react,</li>
                    <li>managing canvas state in a react app.</li>
                </ol>
            </div>
        );
    }

}

export default About;