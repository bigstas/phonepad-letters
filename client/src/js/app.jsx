import React, { Component } from 'react';
import Keypad from './keypad.jsx';
import { numsToLetters } from './utils';

class App extends Component {
  state = {words:[], input:'',fresh:true}

  handleKeypadPress(value) {
    const maxInput = 7; // otherwise the program hangs due to combinatorical explosion
    if (this.state.input.length < maxInput) {
      this.setState({
        input: this.state.input + value.toString()
      });
    }
  }

  clear() {
    this.setState({words:[],input:'',fresh:true});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.input) return; // degenerate case
    const body = JSON.stringify({ letters: numsToLetters(this.state.input) })

    fetch('/letters', {
      method: 'POST',
      body: body,
      headers: {"Content-Type": "application/json"}
    })
    .then((response) => response.json())
    .then((body) => {
      this.setState({ words: body["words"], fresh: false });
    })
    .catch((err) => {
      console.log("Caught error:", err);
    });
  }

  render() {
    return (
      <div className="App">
        <div id="display-wrapper">
          <div id="display">{this.state.input}</div>
        </div>
        <Keypad handleClick={this.handleKeypadPress.bind(this)} />
        <button onClick={this.handleSubmit.bind(this)}>Submit digits</button>
        <button onClick={this.clear.bind(this)}>Clear digits</button>
        <div>
          {this.state.words.length > 0 ?
            <span id="result">{this.state.words.reduce((prev,curr) => prev+', '+curr)}</span> :
            (this.state.fresh ?
              <span></span> :
              <span>No words were found for those digits.</span>)
          }
        </div>
      </div>
    );
  }
}

export default App;