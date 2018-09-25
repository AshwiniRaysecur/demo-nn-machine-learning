import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import catInput from './images/i1-cat.png';

class MachineLearningSystem extends Component {

    constructor(props) {
        super(props);

        this.imageObj     = new Image();
        this.imageObj.src = './images/i1-cat.png';

        //this.drawCB = this.drawCB.bind(this);

        this.getImageData = this.getImageData.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        this.canvas = this.refs.domCanvas1;
        this.ctx = this.canvas.getContext("2d");
    }

    // drawCB() {
    //     this.ctx.drawImage( this.imageObj,0,0 );
    // }

    getImageData ( imgObject ) {
        this.ctx.drawImage( this.imageObj,0,0 );
        return( this.ctx.getImageData(0, 0, 125, 125) );
    }

    preview() {

        // $('#iterations').text(trial);

        this.ctx.drawImage( this.imageObj,0,0 );

        const  imageData = this.ctx.getImageData(0, 0, 125, 125);





        // for (index = 0; index < size; index++)
        // {
        //     var px = pixel(original_data, 0, 0);
        //     px = px.concat(pixel(original_data, -1, -1));
        //     px = px.concat(pixel(original_data, 0, -1));
        //     px = px.concat(pixel(original_data, 1, -1));
        //     px = px.concat(pixel(original_data, -1, 0));
        //     px = px.concat(pixel(original_data, 1, 0));
        //     px = px.concat(pixel(original_data, -1, 1));
        //     px = px.concat(pixel(original_data, 0, 1));
        //     px = px.concat(pixel(original_data, 1, 1));
        //     var rgb = perceptron.activate(px);
        //     imageData.data[index * 4] = (rgb[0] )* 255;
        //     imageData.data[index * 4 + 1] = (rgb[1] ) * 255;
        //     imageData.data[index * 4 + 2] = (rgb[2] ) * 255;
        // }


        this.ctx.putImageData(imageData,0,0);

        // if ($location.$$path == '/image-filters')
        //     setTimeout(iteration, 100);
    }



    handleClick(evt) {

        console.log(evt.target);

        this.preview();

    }

    render() {

        return(
            <div className='canvas-wrapper'>
                <div>

                    <NavLink to='/canvas'>My Canvas</NavLink>
                    <NavLink to='/'>My Content</NavLink>

                </div>
                <div className="canvas-wrap">
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

                <button

                    onClick={ this.handleClick }

                >click me</button>


            </div>
        );
    }

}

export default MachineLearningSystem;
