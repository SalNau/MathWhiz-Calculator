import React, { Component } from 'react';
import './Calculator.css'; // Import your CSS file
//import Button from './Button';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      result: ''
    };
  }

  componentDidMount() {
    // Add a keyboard event listener when the component mounts
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // Remove the keyboard event listener when the component unmounts
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    // Function to handle keyboard events
    const { key } = event;

    // Check if the pressed key is a digit (0-9) or an operator
    if (/^[0-9+\-*/.]$/.test(key)) {
      this.setState((prevState) => ({
        input: prevState.input + key
      }));
    } else if (key === 'Enter') {
      // Handle the Enter key as an equals sign (=)
      this.handleButtonClick('=');
    } else if (key === 'Backspace') {
      // Handle the Backspace key as a delete button
      this.handleDeleteClick();
    }
  }

  handleButtonClick = (value) => {
    // Function to check if the last character in input is an operator
    const isLastCharOperator = /[+\-*/]$/.test(this.state.input);
  
    switch (value) {
      case 'AC':
        // Clear the input and result
        this.setState({ input: '', result: '' });
        break;
  
      case '=':
        try {
          // Ensure spaces around operators for correct evaluation
          const formattedInput = this.state.input.replace(/([+\-*/])/g, ' $1 ');
          const result = eval(formattedInput);
          console.log('Input:', formattedInput);
          console.log('Result:', result);
          this.setState({ result: result.toString() });
        } catch (error) {
          console.error('Error:', error);
          this.setState({ result: 'Error' });
        }
        break;
  
      default:
        // Append the value to the input based on the conditions
        if (!(value === ' ' && isLastCharOperator)) {
          this.setState((prevState) => ({
            input: prevState.input + value
          }));
        }
        break;
    }
  }

  handleDeleteClick = () => {
    // Function to remove the last character from input
    this.setState((prevState) => ({
      input: prevState.input.slice(0, -1)
    }));
  }

  render() {
    return (
      <div className="calculator">
        <div className="calculator-title">MathWhiz</div>
        
        <div className="calculator-screen">
          <div className="input-screen">
          <div className="display">
              {this.state.input}
          </div>
        </div> 
          <div className="output-screen">
           <div className="display">
              {this.state.result !== '' ? this.state.result : '0'}
           </div>
           </div> 
        </div>

        <div className="buttons">
               {/* First row */}
                   {/* Add the delete button */}
            <button onClick={this.handleDeleteClick} className="delete-button">Delete</button>
            <button onClick={() => this.handleButtonClick('AC')}>AC</button>
            <button onClick={() => this.handleButtonClick('%')}>%</button>
            <button onClick={() => this.handleButtonClick('/')}>/</button>
          

               {/* Second row */}
           <button onClick={() => this.handleButtonClick('7')}>7</button>
           <button onClick={() => this.handleButtonClick('8')}>8</button>
           <button onClick={() => this.handleButtonClick('9')}>9</button>
           <button onClick={() => this.handleButtonClick('*')}>*</button>

               {/* Third row */}
          <button onClick={() => this.handleButtonClick('4')}>4</button>
          <button onClick={() => this.handleButtonClick('5')}>5</button>
          <button onClick={() => this.handleButtonClick('6')}>6</button>
          <button onClick={() => this.handleButtonClick('-')}>-</button>

               {/* Fourth row */}
           <button onClick={() => this.handleButtonClick('1')}>1</button>
           <button onClick={() => this.handleButtonClick('2')}>2</button>
           <button onClick={() => this.handleButtonClick('3')}>3</button>
           <button onClick={() => this.handleButtonClick('+')}>+</button>

               {/* Fifth row */}
           <button onClick={() => this.handleButtonClick('+/-')}>+/-</button>
           <button onClick={() => this.handleButtonClick('0')}>0</button>
           <button onClick={() => this.handleButtonClick('.')}>.</button>
           <button onClick={() => this.handleButtonClick('=')}>=</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
