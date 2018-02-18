import React, { Component } from 'react';
import './App.css';
import OrderMakeSegment from './OrderMakeSegment';
import ActionListSegment from './ActionListSegment';
import {Sticky, Grid} from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: "due",
      view: "actionitems"
    }

    this.handleOrderClick = this.handleOrderClick.bind(this);
    this.refreshLists = this.refreshLists.bind(this);
  }

  handleOrderClick(order) {
    this.setState({
      orderBy: order
    });
  }

  refreshLists(){
    this.setState({});
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    document.body.style = "background: #085078; background: -webkit-linear-gradient(to bottom, #085078, #85d8ce); background: linear-gradient(to bottom, #085078, #85d8ce); background-repeat: repeat-x; background-size: cover; background-attachment: fixed;";
    const { contextRef } = this.state;
    return (
      <div className="App">
        <h1 className="LargeHeader">ACTONME</h1>
        <div ref={this.handleContextRef}>
          <Grid columns={2} divided>
            <Grid.Column width={3}>
              <Sticky offset={20} context={contextRef} >
                <OrderMakeSegment orderBy={this.state.orderBy} refreshList={this.refreshLists} handleOrderClick={this.handleOrderClick} />              
              </Sticky>
            </Grid.Column>
            <Grid.Column width={13}>
              <ActionListSegment orderBy={this.state.orderBy}/>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
