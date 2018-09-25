import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import catInput from './images/i1-cat.png';

class MachineLearningSystem extends Component {

    componentDidMount() {
        const canvas = this.refs.domCanvas1;

        const img    = this.refs.domImage1;

        const ctx = canvas.getContext("2d");

        // ctx.fillStyle = "red";
        // ctx.fillRect(0, 0, 200, 180);
        // ctx.drawImage(catInput, 0, 0);

        var imageObj = new Image();
        imageObj.src = './images/i1-cat.png'
        imageObj.onload = function() {
            ctx.drawImage(imageObj,0,0);
        }


    }

    render() {

        return(
            <div className='canvas-wrapper'>
                <div>

                    <NavLink to='/canvas'>My Canvas</NavLink>
                    <NavLink to='/'>My Content</NavLink>

                </div>
                <div class="canvas-wrap">
                    <canvas
                        ref='domCanvas1'
                        width={200}
                        height={200}
                    />
                </div>

                <div className="image-wrap">
                    <img
                        src="./images/i1-cat.png"
                    />
                </div>

                <div className="image-wrap">
                    <img
                        src="./images/o1-cat-texture.png"
                    />
                </div>


            </div>
        );
    }

}

export default MachineLearningSystem;
