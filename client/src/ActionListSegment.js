import React, { Component } from 'react';
import ActionList from './ActionList';
import { Grid, Header } from 'semantic-ui-react';

class ActionListSegment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid columns={3}>
        <Grid.Column>
          <Header>To Do</Header>
          <ActionList orderBy={this.props.orderBy} view="incomplete"/>
        </Grid.Column>
        <Grid.Column>
          <Header>In Progress</Header>
          <ActionList orderBy={this.props.orderBy} view="inprogress"/>
        </Grid.Column>
        <Grid.Column>
          <Header>Completed</Header>
          <ActionList orderBy={this.props.orderBy} view="complete"/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ActionListSegment;
