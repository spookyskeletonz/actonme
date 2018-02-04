import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';

class View extends Component{
  render() {
    return(
      <div className="View">
        <Header size="medium">Current View: {this.props.view}</Header>
        <Button.Group>
          <Button onClick={this.props.handleViewClick.bind(this,"actionitems")}>All</Button>
          <Button.Or />
          <Button onClick={this.props.handleViewClick.bind(this,"complete")}>Completed</Button>
          <Button.Or />
          <Button onClick={this.props.handleViewClick.bind(this,"incomplete")}>Incomplete</Button>
        </Button.Group> 
      </div>
      );
  }
}

export default View;
