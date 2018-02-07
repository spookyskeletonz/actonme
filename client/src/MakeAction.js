import React, { Component } from 'react';
import { Form, Header } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';

class MakeAction extends Component{
  constructor(props) {
    super(props);
    this.state = {
      action:  "",
      due:     moment(),
      actor:   "",
      creator: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleChange(event) {
    this.setState(
    {
      action:  event.action,
      actor:   event.actor,
      creator: event.creator
    });
  }

  handleDateChange(date) {
    this.setState(
    {
      due: date
    });
  }

  handleSubmit(event) {
    axios.post("api/actionitems/", {
      action:  this.state.action,
      actor:   this.state.actor,
      due:     this.state.due,
      creator: this.state.creator
    }); 
  }

  render() {
    return(
      <div className="MakeAction">
        <Header size="small">Create Action</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input fluid label="Actor" name="actor" value={this.state.actor} placeholder="Nicholas Cage" onChange={this.handleChange} />
            <Form.Input fluid label="Creator" name="creator" value={this.state.creator} placeholder="God" onChange={this.handleChange} />
          </Form.Group>
          <Form.TextArea label="Action" name="action" value={this.state.action} placeholder="Return souls to hell as the Ghost Rider" onChange={this.handleChange} />
          <DatePicker label="Due" name="due" value={this.state.due} selected={this.state.due} onChange={this.handleDateChange} dateFormat="DD-MM-YYYY" />
        <Form.Button content='Submit'/>
        </Form>
      </div>
    )
  }
}

export default MakeAction;
