import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      playing: false,
      paused: true,
      stop: false,
      clock: this._getTime(1),
      seconds: 1,
      break: false,
      pomodoroCounter: 0
    };

    this.timer = 0;
    this._start = this._start.bind(this);
    this._beginTimer = this._beginTimer.bind(this);
  }

  _getTime(seconds) {
    let minutesCalc = seconds % (60*60);
    let mins = Math.floor ( minutesCalc / 60 );

    let secondsCalc = minutesCalc % 60;
    let secs;

    if (secondsCalc > 10) {
      secs = Math.floor ( secondsCalc );
    } else {
      secs = '0' + secondsCalc;
    }

    let clock = {
      minutes: mins,
      seconds: secs
    };
  
    console.log(secondsCalc, secs, clock);
    return clock;
  }

  _getButton() {
    if (this.state.playing) {
      return <i className="pause fa fa-pause-circle" aria-hidden="true" onClick={() => {this._setPause()}}></i>
    }
    else if (this.state.paused) {
      return <i className="play fa fa-play-circle" aria-hidden="true" onClick={() => { this._start()}}></i>
    }
    else if (this.state.stop) {
      return <i className="stop fa fa-stop-circle" aria-hidden="true" onClick={() => { this._start()}}></i>
    }
  }

  _setPause() {
    this.setState({
      playing: false,
      paused: true,
      stop: false
    });
  }

  _setPlay() {
    this.setState({
      playing: true,
      paused: false,
      stop: false
    });
  }

  _setStop() {
    this.setState({
      playing: false,
      paused: false,
      stop: true
    });
  }

  componentDidMount() {
    let remainingTime = this._getTime(this.state.seconds);
    this.setState({
      clock: remainingTime
    });
  }

  _start() {
    if (this.timer === 0) {
      this.timer = setInterval(this._beginTimer, 1000);
    }
    this._setPlay();
  }

  _beginTimer() {
    let seconds;

    if (this.state.playing) {
      seconds = ( this.state.seconds - 1 );
      this.setState({
        clock: this._getTime(seconds),
        seconds: seconds
      });
    }

    if (seconds === 0) { 
      clearInterval(this.timer);
      this._setStop();

      let counter = this.state.pomodoroCounter;
      this.setState({
        pomodoroCounter: counter + 1,
        break: true
      });

      if (this.state.break && this.state.pomodoroCounter % 4 === 0) {
        this.setState({
          seconds: 1500,
          clock: this._getTime(1500)
        })
      } else {
        this.setState({
          seconds: 300,
          clock: this._getTime(300)
        })
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input type="text" id="task" placeholder="Task" />
          <span className="underline"></span>
        </header>
        <main className="time">
          {this.state.clock.minutes}:{this.state.clock.seconds}
        </main>
        <footer>
          {this._getButton()}
        </footer>
      </div>
    );
  }
}

export default App;
