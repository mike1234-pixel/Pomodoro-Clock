import React, { Component } from "react";
import alert1 from "./AudioFiles/alert1.mp3";

class Clock extends Component {
  constructor() {
    super();
    this.state = {
      // need immutable starting values for sesh minutes and break minutes
      sessionStart: 25,
      breakStart: 5,
      sessionMinutes: 25,
      sessionSeconds: 0,
      breakMinutes: 5,
      breakSeconds: 0,
      timerOn: false,
      breakTimerOn: false,
      sequenceNumber: 0
    };
    this.incrementSessionMinutes = this.incrementSessionMinutes.bind(this);
    this.decrementSessionMinutes = this.decrementSessionMinutes.bind(this);
    this.incrementBreakMinutes = this.incrementBreakMinutes.bind(this);
    this.decrementBreakMinutes = this.decrementBreakMinutes.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  // click handlers for session minutes (increment and decrement)
  incrementSessionMinutes() {
    this.setState(prevState => {
      return {
        sessionStart:
          prevState.sessionStart === 60
            ? prevState.sessionStart
            : prevState.sessionStart + 1
      };
    });
  }
  // ternary stops user incrementing session length to greater than 60

  decrementSessionMinutes() {
    this.setState(prevState => {
      return {
        sessionStart:
          prevState.sessionStart <= 1
            ? prevState.sessionStart
            : prevState.sessionStart - 1
      };
    });
  }

  // ternary stops user decrementing session length to less than 1 minute

  // click handlers for break minutes (increment and decrement)

  incrementBreakMinutes() {
    this.setState(prevState => {
      return {
        breakStart: prevState.breakStart + 1
      };
    });
  }

  decrementBreakMinutes() {
    this.setState(prevState => {
      return {
        breakStart:
          prevState.breakStart <= 1
            ? prevState.breakStart
            : prevState.breakStart - 1
      };
    });
  }

  // start

  handleStart() {
    // set sessionMinutes to sessionStart number and breakMinutes to breakStart number
    var userSesh = this.state.sessionStart;
    var userBreak = this.state.breakStart;

    this.setState(prevState => {
      return {
        timerOn: true,
        sequenceNumber: prevState.sequenceNumber + 1,
        sessionMinutes: userSesh,
        breakMinutes: userBreak
      };
    });

    // start timer
    if (this.state.timerOn !== true) {
      this.myInterval = setInterval(() => {
        const { sessionSeconds, sessionMinutes } = this.state;
        if (sessionSeconds > 0) {
          this.setState(({ sessionSeconds }) => ({
            sessionSeconds: sessionSeconds - 1
          }));
        }
        if (sessionSeconds === 0) {
          if (sessionMinutes === 0) {
            clearInterval(this.myInterval);
            const alertOne = new Audio(alert1);
            alertOne.play();
            // run next function and play audio here
            if (this.state.sequenceNumber % 4 === 0) {
              this.startLongBreakTimer();
            } else {
              this.startBreakTimer();
            }
          } else {
            this.setState(({ sessionMinutes }) => ({
              sessionMinutes: sessionMinutes - 1,
              sessionSeconds: 59
            }));
          }
        }
      }, 1000);
    }
  }

  // pause

  handlePause() {
    this.setState(prevState => {
      return {
        timerOn: false
      };
    });
    clearInterval(this.myInterval);
  }

  // reset

  handleReset() {
    this.setState(prevState => {
      return {
        sessionMinutes: 25,
        sessionSeconds: 0,
        breakMinutes: 5,
        breakSeconds: 0,
        timerOn: false,
        breakTimerOn: false,
        sequenceNumber: 0
      };
    });
    clearInterval(this.myInterval);
  }

  //break timer
  startBreakTimer() {
    this.setState(prevState => {
      return {
        breaktimerOn: true
      };
    });
    if (this.state.breakTimerOn !== true) {
      this.myInterval = setInterval(() => {
        const { breakSeconds, breakMinutes } = this.state;
        if (breakSeconds > 0) {
          this.setState(({ breakSeconds }) => ({
            breakSeconds: breakSeconds - 1
          }));
        }
        if (breakSeconds === 0) {
          if (breakMinutes === 0) {
            clearInterval(this.myInterval);
            const alertOne = new Audio(alert1);
            alertOne.play();
            // run next function and play audio here
          } else {
            this.setState(({ breakMinutes }) => ({
              breakMinutes: breakMinutes - 1,
              breakSeconds: 59
            }));
          }
        }
      }, 1000);
    }
  }

  // long break timer

  render() {
    return (
      <div>
        <div id="session-div">
          <div>Set Session Length</div>
          <span>{this.state.sessionStart}</span>
          <div>Set Break Length</div>
          <span>{this.state.breakStart}</span>
          <h2 id="session-label">Session Length</h2>
          <button onClick={this.incrementSessionMinutes} id="session-increment">
            +
          </button>
          <button onClick={this.decrementSessionMinutes} id="session-decrement">
            -
          </button>
        </div>
        <div id="clock">
          <h1 id="time-left">
            <span id="session-length">{this.state.sessionMinutes}</span>:
            {this.state.sessionSeconds < 10
              ? "0" + this.state.sessionSeconds
              : this.state.sessionSeconds}
          </h1>
          <button onClick={this.handleStart} id="start_stop">
            Start
          </button>
          <button onClick={this.handlePause}>Pause</button>
          <button onClick={this.handleReset} id="reset">
            Reset
          </button>
        </div>
        <div id="break-div">
          <h2 id="break-label">Break Length</h2>
          <h3 id="break-length">
            {" "}
            <span id="break-length">{this.state.breakMinutes}</span>:
            {this.state.breakSeconds < 10
              ? "0" + this.state.breakSeconds
              : this.state.breakSeconds}
          </h3>
          <button onClick={this.incrementBreakMinutes} id="break-increment">
            +
          </button>
          <button onClick={this.decrementBreakMinutes} id="break-decrement">
            -
          </button>
        </div>
      </div>
    );
  }
}

export default Clock;

/* Code:
    1) set the default state of session minutes and seconds as 25:00 and break session and minutes as 05:00 ✔
    ✔ create click handlers
    2) write a increment function for session and bind it ✔
    3) write a decrement function for session and bind it ✔
    4) write a increment function for break and bind it ✔
    5) write a decrement function for break and bind it ✔
    ✔ create and display countdown timer
    6) create countdown timer function which starts onclick of start button ✔
    7) in the render, when seconds is less than 10, add '0' before seconds, else just display seconds. this gives 0:00 format for seconds. ✔
    ✔ create onclick to pause and reset functions
    8) create onclick pause handler ✔
    9) create onclick reset handler - resets state to original and clearInterval method stops it automatically counting down again ✔
    ✔ bug - all works fine unless you click start again by mistake - then pause doesn't work, and the countdown speeds up??
    ✔ bug fixed - added state property 'timerOn' to toggle true/ false. handleStart sets to true, handlePause sets to false
    ✔ handleStart only runs the countdown when timerOn is false
    ✔ false means it's not already running, when it is already running (true) we don't want the countdown to try to execute.
    10) add ternaries to decrementSessionMinutes and decrementBreakMinutes to stop user decrementing these to less than 1 minute. ✔
    11) play audio file when timer hits 00:00 ✔
    12) run a function in the same place as the audio which starts the break timer
    ✔ bug - startBreakTimer running by itself on page load
    ✔ bug fixed - removed the bind for startBreakTimer from the constructor. Now works.
    13) add new state container called 'sequenceNumber' which tracks how many times handleStart has run, longerBreak runs when sequenceNumber is divisible by 4 (so on the fourth, eighth, twelth rounds etc) ✔
    14) at the top of handleStart increment sequenceNumber ✔
    15) where breakTimer is called add a control statement - if sequenceNumber % 4 === 0, run longerBreak, else run breakTimer
    // problem: the clock needs to remember the initial starting session and break lengths
    // however, these values are being mutated/decremented by the timer 
    // There needs to be two vars - two immutable state containers for sesh and break lengths, and two separate ones used for decrementing in the timer

    // SOLUTION: sessionStart and sessionBreak are immutable and the user sets these
    // pass these values to sessionMinutes and BreakMinutes, then execute handleStart

*/

/* Pseudocode 
Can't convert a number into an actual time as this is not a data type.
Logic:

Set time interval of 1000ms
Run a function that decrements the seconds then decrements the minutes when seconds reach 00
25:00

0) timer starts onclick ✔
↓
1) seconds number decrements every 1000ms from 59 ✔
↓
2) if seconds is 0 ✔
↓
3) minutes decrement, and seconds reset to 59 ✔
↓
4) until 00:00 (minutes and seconds are 0) ✔
↓
5) we start counting down from the break -- 05:00 ✔
↓
6) same decrementing process as above ✔
↓
7) until 00:00 (minutes and seconds are 0) ✔
↓
8) start decrementing from session length again
↓
9) until 00:00, start decrementing from break length
↓
10) until this sequence has happened four times
↓
11) then decrement the long break, which will be the break length x 4 
↓
12) start from step 1 again.
*/

// audio file from here: http://soundbible.com/2157-Text-Message-Alert-4.html
