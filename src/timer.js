import React from "react";
import ReactDOM from "react-dom";

class Clock extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        date: new Date(),
      };
    }
  
    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.tick());
    }
  
    tick() {
      this.setState({
        date: new Date(),
      });
    }
  
    render() {
      return <p>Current time: {this.state.date.toLocaleTimeString()}</p>;
    }
  }
  
  ReactDOM.render(<Clock />, document.getElementById("root"));