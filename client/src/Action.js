import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Avatar from 'react-avatar';

class Action extends Component {
  render(){
    return(
      <Card>
        <Card.Header>
          <Avatar floated="right" size={25} round={true} name={this.props.actor} />
          {this.props.actor}
        </Card.Header>
        <Card.Meta>
          Created By: {this.props.creator}, Posted On: {this.props.posted}
        </Card.Meta>
        <Card.Description>
          {this.props.action}
        </Card.Description>
        <Card.Content extra>
          Due: {this.props.due}
          <div className='ui two buttons'>
            <Button basic color='green'>{this.props.completed === false ? "Complete" : "Undo Complete"}</Button>
            <Button basic color='red'>Delete</Button>
          </div>
        </Card.Content>
      </Card>
    ); 
  }
}

export default Action;
