import React, { Component } from 'react';
import { Card, Button, Header } from 'semantic-ui-react';
import Avatar from 'react-avatar';
import axios from 'axios';

class Action extends Component {

  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.completed, 
      inprogress: this.props.inprogress,
      flowButton: ""
    }

    this.handleFlowClick = this.handleFlowClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    console.log(this.state.inprogress);
    if(this.state.completed){ this.state.flowButton = "Undo Complete";
    }else if(this.state.inprogress){ this.state.flowButton = "Complete";
    }else{ this.state.flowButton = "Start";}
  }

  handleDeleteClick() {
    axios.post("api/delete/"+this.props.id).then(res => {
      this.props.refreshList();
    })
  }

  handleFlowClick() {
    if(!this.state.completed && !this.state.inprogress){
      axios.post("api/inprogress/"+this.props.id).then(res => {
        this.setState({
          inprogess: !this.state.inprogress
        });
      });
    } else if(!this.state.completed && this.state.inprogess){
      axios.post("api/complete/"+this.props.id).then(res => {
        this.setState({
          completed: !this.state.completed,
          inprogess: !this.state.inprogress
        });
      });
    } else if(this.state.completed){
      axios.post("api/incomplete/"+this.props.id).then(res => {
        this.setState({
          completed: !this.state.completed,
          inprogess: !this.state.inprogress
        });
      });
    } 
  }

  render(){
    let action =  null;
    if(this.state.completed === true) {
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
            <Button onClick={this.handleFlowClick} basic color='green'>{this.state.flowButton}</Button>
            <Button onClick={this.handleDeleteClick} basic color='red'>Delete</Button>
          </div>
        </Card.Content>
      </Card>
    ); 
  }
}

export default Action;
