import React, {
    Component
} from 'react';
import './Metrenome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';



class Metronome extends Component {

    constructor(props) {
        super(props);

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
        // initialize state with constructor
        // this can be done with a property initialiser (ie without the constructor) 
        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        };
    }
    /* metrenome method startstop   */
    startStop = () => {
        if (this.state.playing) {
            // Stop the timer
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            // Start a timer with the current BPM
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState({
                    count: 0,
                    playing: true
                    // Start a timer with the current BPM
                },
                this.playClick
            );
        }
    };

    playClick = () => {
        const {
            count,
            beatsPerMeasure
        } = this.state;

        if (count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }
    }

    handleBpmChange = event => {
          
        const bpm = event.target.value;
      
        if (this.state.playing) {

            // stop the timer - this is what clear interval does
            clearInterval(this.timer)
            // Set the new BPM, and reset the beat counter
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
            
            this.setState({
                count: 0,
                bpm
            });
        } else {
            // Otherwise just update the BPM no need to stop timer
            this.setState({
                bpm
            });
        }
    };



    render() {
            const {
                playing,
                bpm
            } = this.state;
            console.log(this.state);
            return (
                <div className="metronome">
                    <div className="bpm-slider">
                        <div>{bpm} BPM</div>
                        <input
                        type="range"
                        min="60"
                        max="240"
                        value={bpm}
                        onChange={this.handleBpmChange} />
                    </div>
                    <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
                </div>
                );
            }
        }
  export default Metronome;
        