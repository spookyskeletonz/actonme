import React, { Component } from 'react';
import { Card, Button, Header } from 'semantic-ui-react';
import Avatar from 'react-avatar';
import axios from 'axios';

class Action extends Component {

  constructor(props) {
    super(props);
    this.state = {
      completedVisual: this.props.completed
    }
    this.handleCompleteClick = this.handleCompleteClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    axios.post("api/delete/"+this.props.id).then(res => {
      this.props.refreshList();
    })
  }

  handleCompleteClick() {
    if(!this.state.completedVisual){
      axios.post("api/complete/"+this.props.id).then(res => {
        this.setState({
          completedVisual: !this.state.completedVisual
        });
      });
    } else {
      axios.post("api/incomplete/"+this.props.id).then(res => {
        this.setState({
          completedVisual: !this.state.completedVisual
        });
      });
    }
  }

  render(){
    let action =  null;
    if(this.state.completedVisual === true) {
      action = (<s>{this.props.action}</s>); 
    } else {
      action = this.props.action;
    }

    return(
      <Card>
      <Card.Header>
          <p/>
          <Avatar size={40} round={true} name={this.props.actor} />
          <Header size="medium">{this.props.actor}</Header>
        </Card.Header>
        <Card.Meta>
          Created By: {this.props.creator}, Posted On: {this.props.posted}
        </Card.Meta>
        <Card.Description>
          {action}
          <p/>
          <b>Due: {this.props.due}</b>
        </Card.Description>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button onClick={this.handleCompleteClick} basic color='green'>{this.state.completedVisual === false ? "Complete" : "Undo Complete"}</Button>
            <Button onClick={this.handleDeleteClick} basic color='red'>Delete</Button>
          </div>
        </Card.Content>
      </Card>
    ); 
  }
}

export default Action;
