import React, { Component } from 'react';
import { Divider, Card, Button, Header } from 'semantic-ui-react';
import Avatar from 'react-avatar';
import axios from 'axios';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

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
        this.props.refreshLists();
      });
    } else if(!this.state.completed && this.state.inprogress){
      axios.post("api/complete/"+this.props.id).then(res => {
        this.setState({
          completed: !this.state.completed,
          inprogess: !this.state.inprogress
          });
        this.props.refreshLists();
      });
    } else if(this.state.completed){
      axios.post("api/incomplete/"+this.props.id).then(res => {
        this.setState({
          completed: !this.state.completed,
          inprogess: !this.state.inprogress
        });
        this.props.refreshLists();
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

    let cardColor = "";
    if(this.state.completed === true) {
      cardColor = "green";
    } else if(this.state.inprogress) {
      cardColor = "blue";
    }          

    let formattedPosted = this.props.posted;
    formattedPosted = formattedPosted.replace(/T.*/, "");
    let formattedDue = this.props.due;
    formattedDue = formattedDue.replace(/T.*/, "");

    const moment = extendMoment(Moment);
    
    let due = moment(this.props.due);
    let daysRemaining = moment().range(moment(), due).diff('days');

    return(
      <Card color={cardColor}>
      <Card.Header>
          <p/>
          <Avatar style={{float: "right", marginRight: "10px"}} round size={50} name={this.props.actor} />
          <Header style={{textAlign: "left", marginLeft: "10px"}} size="medium">{this.props.actor}</Header>
          <div  style={{textAlign: "left", marginLeft: "10px"}}><b>Due: {formattedDue} (
          {daysRemaining <= 5 ? 
            (<span style={{color: "red"}}>{daysRemaining} days left</span>)
           : (<span>{daysRemaining} days left</span>)
          }
          )</b></div>
        </Card.Header>
        <Divider hidden />
        <Card.Description>
          <div style={{fontSize: 15}}>{action}</div>
        </Card.Description>
        <Divider hidden />
        <Card.Meta style={{float: "left", textAlign: "left", marginLeft: "10px"}}>
          Created By: {this.props.creator}<p/>Posted On: {formattedPosted}
        </Card.Meta>
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
