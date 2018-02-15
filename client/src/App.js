import React, { Component } from 'react';
import './App.css';
import ActionList from './ActionList';
import OrderOptions from './OrderOptions';
import ViewOptions from './ViewOptions';
import MakeAction from './MakeAction.js';
import {Sticky, Container, Grid, Segment, Header } from 'semantic-ui-react';

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
    const { contextRef } = this.state;
    return (
      <div className="App">
        <Header size="huge">ACTONME</Header>
        <div ref={this.handleContextRef}>
          <Grid columns={2} divided>
            <Grid.Column width={3}>
              <Sticky context={contextRef}>
                  <Segment>
                      <OrderOptions attached="left" order={this.state.orderBy} handleOrderClick={this.handleOrderClick} />
                      <p/>
                      <MakeAction refreshList={this.refreshLists} />
                  </Segment>
              </Sticky>
            </Grid.Column>
            <Grid.Column width={13}>
              <Grid columns={3}>
                <Grid.Column>
                  <ActionList orderBy={this.state.orderBy} view="incomplete"/>
                </Grid.Column>
                <Grid.Column>
                  <ActionList orderBy={this.state.orderBy} view="inprogress"/>
                </Grid.Column>
                <Grid.Column>
                  <ActionList orderBy={this.state.orderBy} view="complete"/>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
