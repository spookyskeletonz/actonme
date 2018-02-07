import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class View extends Component{
  constructor(props) {
    super(props);
    this.state = {
      active: "actionitems"
    }
  }

  handleClick(viewClicked) {
    this.setState({ active: viewClicked});
    this.props.handleViewClick(viewClicked);
  }

  render() {
    return(
      <div className="View">
        <Button.Group>
          <Button toggle active={(this.state.active === "actionitems")} onClick={this.handleClick.bind(this,"actionitems")}>All</Button>
          <Button.Or />
          <Button toggle active={(this.state.active === "complete")} onClick={this.handleClick.bind(this,"complete")}>Completed</Button>
          <Button.Or />
          <Button toggle active={(this.state.active === "incomplete")} onClick={this.handleClick.bind(this,"incomplete")}>Incomplete</Button>
        </Button.Group> 
      </div>
      );
  }
}

export default View;
