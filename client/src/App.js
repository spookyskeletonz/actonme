import React, { Component } from 'react';
import './App.css';
import { Button } from 'semantic-ui-react'
import ActionList from './ActionList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: "due",
      view: "actionitems"
    }

    this.handleOrderClick = this.handleOrderClick.bind(this);
  }

  handleOrderClick(order) {
    this.setState({
      orderBy: order
    });
  }

  render() {
    return (
      <div className="App">
      <Button.Group>
        <Button onClick={this.handleOrderClick.bind(this,"due")}>Due Date</Button>
        <Button.Or />
        <Button onClick={this.handleOrderClick.bind(this,"actor")}>Actor</Button>
        <Button.Or />
        <Button onClick={this.handleOrderClick.bind(this,"posted")}>Post Date</Button>
        </Button.Group> 
        <ActionList orderBy={this.state.orderBy} view={this.state.view}/>
      </div>
    );
  }
}

export default App;
