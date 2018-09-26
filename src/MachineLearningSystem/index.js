import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import {Architect} from 'synaptic';



const image = {
    ORIGINAL: './images/cat_original.png',
    INPUT:    './images/i1-cat.png',
    FILTERED: './images/o1-cat-texture.png'
};

const ITERATIONS = 50;

class MachineLearningSystem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trial:0
        };

        // this.imageObj     = new Image();
        // this.imageObj.src = './images/i1-cat.png';

        // create a new 3 layor perceptron with one input one hidden and one output layor
        this.perceptron = new Architect.Perceptron(27,8,3);

        this.index      = 0;
        this.size       = 125 * 125;

        this.px         = null;

        // data
        this.imageOjbects = {
            'input': new Image(),
            'output': new Image(),
            'original': new Image()
        };

        this.imageOjbects.input.src    = image.INPUT;
        this.imageOjbects.output.src   = image.FILTERED;
        this.imageOjbects.original.src = image.ORIGINAL;



        //this.drawCB = this.drawCB.bind(this);

        this.getImageData = this.getImageData.bind(this);
        this.handleClick  = this.handleClick.bind(this);
        this.iteration    = this.iteration.bind(this);

    }

    componentDidMount() {
        this.canvas = this.refs.domCanvas1;
        this.ctx = this.canvas.getContext("2d");


        this.colorData    = this.getImageData( this.imageOjbects.input );
        this.originalData = this.getImageData( this.imageOjbects.original );
        this.filterData   = this.getImageData( this.imageOjbects.output );

    }

    // drawCB() {
    //     this.ctx.drawImage( this.imageObj,0,0 );
    // }

    getImageData ( imgObject ) {

        this.ctx.drawImage( imgObject, 0, 0 );
        return( this.ctx.getImageData(0, 0, 125, 125) );

    }

    pixel (data, ox, oy) {
        let y = this.index / 125 | 0;
        let x = this.index % 125;

        if (ox && (x + ox) > 0 && (x + ox) < 125)
            x += ox;
        if (oy && (y + oy) > 0 && (y + oy) < 125)
            y += oy;

        const red = data[((125 * y) + x) * 4];
        const green = data[((125 * y) + x) * 4 + 1];
        const blue = data[((125 * y) + x) * 4 + 2];

        return [red / 255, green / 255, blue / 255];
    }

    iteration() {
        let t = this.state.trial;
        this.setState( {trial: ++t} );


        for ( this.index = 0; this.index < this.size; this.index+=2 ) {

            this.px = this.pixel( this.colorData, 0, 0 );

            this.px = this.px.concat( this.pixel( this.colorData, -1, -1 ) );
            this.px = this.px.concat( this.pixel( this.colorData, 0, -1 ) );
            this.px = this.px.concat( this.pixel( this.colorData, 1, -1 ) );
            this.px = this.px.concat( this.pixel( this.colorData, -1, 0 ) );
            this.px = this.px.concat( this.pixel( this.colorData, 1, 0 ) );
            this.px = this.px.concat( this.pixel( this.colorData, -1, 1 ) );
            this.px = this.px.concat( this.pixel( this.colorData, 0, 1 ) );
            this.px = this.px.concat( this.pixel( this.colorData, 1, 1 ) );

            this.perceptron.activate(this.px);
            this.perceptron.propagate(.12, this.pixel( this.filterData, 0, 0) );
        }

        this.preview();

    }

    preview() {

        // $('#iterations').text(trial);
        // todo RESUME HERE
        // todo this is scaffolding. here is where you actually show each iteration!!
        // this.ctx.drawImage( this.imageOjbects.original  , 0, 0 );

        const  imageData = this.ctx.getImageData(0, 0, 125, 125);

        for ( this.index = 0; this.index < this.size; this.index++) {
            let px = this.pixel( this.originalData, 0, 0 );
            px = px.concat( this.pixel( this.originalData, -1, -1 ) );
            px = px.concat( this.pixel( this.originalData, 0, -1 ) );
            px = px.concat( this.pixel( this.originalData, 1, -1 ) );
            px = px.concat( this.pixel( this.originalData, -1, 0 ) );
            px = px.concat( this.pixel( this.originalData, 1, 0 ) );
            px = px.concat( this.pixel( this.originalData, -1, 1 ) );
            px = px.concat( this.pixel( this.originalData, 0, 1 ) );
            px = px.concat( this.pixel( this.originalData, 1, 1 ) );
            let rgb = this.perceptron.activate(px);
            imageData.data[this.index * 4] = (rgb[0] )* 255;
            imageData.data[this.index * 4 + 1] = (rgb[1] ) * 255;
            imageData.data[this.index * 4 + 2] = (rgb[2] ) * 255;
        }


        this.ctx.putImageData(imageData,0,0);

        // if ($location.$$path == '/image-filters')
        if( this.state.trial < ITERATIONS )
            setTimeout( this.iteration, 100 );

    }



    handleClick(evt) {
        let t = 0;
        this.setState( {trial: t} );
        console.log( "calling iteration" );
        this.iteration();
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


                <div className="trials-wrap">
                    {this.state.trial}
                </div>



                <button

                    onClick={ this.handleClick }

                >click me</button>


            </div>
        );
    }

}

export default MachineLearningSystem;
