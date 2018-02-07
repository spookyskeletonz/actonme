import React, { Component } from 'react';
import './App.css';
import ActionList from './ActionList';
import OrderOptions from './OrderOptions';
import ViewOptions from './ViewOptions';
import { Header } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: "due",
      view: "actionitems"
    }

    this.handleOrderClick = this.handleOrderClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  handleOrderClick(order) {
    this.setState({
      orderBy: order
    });
  }

  handleViewClick(clickedView) {
    this.setState({
      view: clickedView 
    });
  }

  render() {
    return (
      <div className="App">
        <Header size="huge">ACTONME</Header>
        <OrderOptions order={this.state.orderBy} handleOrderClick={this.handleOrderClick} />
        <p></p>
        <ViewOptions view={this.state.view} handleViewClick={this.handleViewClick} />
        <p></p>
        <ActionList orderBy={this.state.orderBy} view={this.state.view}/>
      </div>
    );
  }
}

export default App;
