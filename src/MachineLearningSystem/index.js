import React, {Component} from 'react';
import {Architect} from 'synaptic';

import './MLS.css';


const image = {
    ORIGINAL: './images/nn-gen-in.png',
    INPUT:    './images/nn-training-in.png',
    FILTERED: './images/nn-training-out.png'
};

const ITERATIONS = 50;

class MachineLearningSystem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trial:0,
            canvas: null,
            ctx: null
        };

        // create a new 3 layor perceptron with one input one hidden and one output layor
        this.perceptron = new Architect.Perceptron(27,8,3);

        this.index  = 0;
        this.size   = 125 * 125;
        this.px     = null;

        // data
        this.imageOjbects = {
            'input': new Image(),
            'output': new Image(),
            'original': new Image()
        };

        this.imageOjbects.input.src    = image.INPUT;
        this.imageOjbects.output.src   = image.FILTERED;
        this.imageOjbects.original.src = image.ORIGINAL;

        this.getImageData = this.getImageData.bind(this);
        this.handleClick  = this.handleClick.bind(this);
        this.iteration    = this.iteration.bind(this);

    }

    componentDidMount() {
        const canvas = this.refs.domCanvas1;
        const ctx    = canvas.getContext("2d");
        this.setState( {
            canvas,
            ctx
        } );
    }

    getImageData ( imgObject ) {
        this.state.ctx.drawImage( imgObject, 0, 0 );
        const result = this.state.ctx.getImageData(0, 0, 125, 125);
        return( result.data );
    }

    pixel (data, ox, oy) {
        let y = this.index / 125 | 0;
        let x = this.index % 125;

        if (ox && (x + ox) > 0 && (x + ox) < 125)
            x += ox;
        if (oy && (y + oy) > 0 && (y + oy) < 125)
            y += oy;

        const red   = data[ ((125 * y) + x) * 4];
        const green = data[ ((125 * y) + x) * 4 + 1];
        const blue  = data[ ((125 * y) + x) * 4 + 2];

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

        const  imageData = this.state.ctx.getImageData(0, 0, 125, 125);

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

        this.state.ctx.putImageData(imageData,0,0);

        if( this.state.trial < ITERATIONS )
            setTimeout( this.iteration, 500 );
    }

    handleClick(evt) {
        this.colorData    = this.getImageData( this.imageOjbects.input );
        this.originalData = this.getImageData( this.imageOjbects.original );
        this.filterData   = this.getImageData( this.imageOjbects.output );
        // INITIALIZE CONTEXT WITH ORIGINAL INPUT FOR TRIALS
        this.state.ctx.drawImage( this.imageOjbects.original, 0, 0 );
        const t = 0;
        this.setState( {trial: t} );
        setTimeout( this.iteration, 100 );
    }

    render() {

        return(

            <div className='mls-wrap'>

                <div className='control-panel'>
                    <button
                        onClick={ this.handleClick }
                    >Train Me</button>
                    <span className="spacer"></span>
                    <div className="trials-wrap">
                        <span>Iteration: </span>
                        <span className="line-spacer"></span>
                        <span>{this.state.trial}</span>
                    </div>
                </div>

                <div className='canvas-wrapper table'>
                    <div className='table-row'>
                        <div className="image-wrap table-cell">
                            <img
                                src={image.ORIGINAL}
                            />
                            <div>New Input</div>
                        </div>
                        <div className="canvas-wrap table-cell">
                            <canvas
                                ref='domCanvas1'
                                width={125}
                                height={125}
                            />
                            <div>Learned Output (result of training)</div>
                        </div>
                    </div>

                </div>

                <hr />

                <div className='training-wrapper table'>

                    <div className='table-row'>
                        <div className="image-wrap table-cell">
                            <img
                                src={image.INPUT}
                            />
                            <div>Training Input</div>
                        </div>
                        <div className="image-wrap table-cell">
                            <img
                                src={image.FILTERED}
                            />
                            <div>Target Output (increased contrast)</div>
                        </div>
                    </div>



                </div>


            </div>
        );
    }

}

export default MachineLearningSystem;
