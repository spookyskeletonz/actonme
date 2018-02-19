import React, { Component } from 'react';
import ActionList from './ActionList';
import './ActionListSegment.css';
import { Grid } from 'semantic-ui-react';

class ActionListSegment extends Component {
  constructor(props) {
    super(props);
    
    this.refreshLists = this.refreshLists.bind(this);
  }

  refreshLists() {
    this.setState({});
  }

  render() {
    return(
      <Grid columns={3}>
        <Grid.Column>
          <h2 className="Header">To Do</h2>
          <ActionList refreshLists={this.refreshLists} orderBy={this.props.orderBy} view="incomplete"/>
        </Grid.Column>
        <Grid.Column>
          <h2 className="Header">In Progress</h2>
          <ActionList refreshLists={this.refreshLists} orderBy={this.props.orderBy} view="inprogress"/>
        </Grid.Column>
        <Grid.Column>
          <h2 className="Header">Completed</h2>
          <ActionList refreshLists={this.refreshLists} orderBy={this.props.orderBy} view="complete"/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ActionListSegment;
