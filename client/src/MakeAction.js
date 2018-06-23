import React, { Component } from 'react';
import { Form, Header, Icon, Transition } from 'semantic-ui-react';
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
      creator: "",
      submittedTick: false,
      submittedCross: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleChange(event) {
    this.setState(
    {
      [event.target.name]: event.target.value
    });
  }

  handleDateChange(date) {
    this.setState(
    {
      due: date
    });
  }

  handleSubmit(event) {
    let data = JSON.stringify({
      action: this.state.action,
      due: this.state.due,
      actor: this.state.actor,
      creator: this.state.creator
    });
    axios.post("api/actionitems/",data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ).then(res => { 
      this.setState(
      {
        submittedTick: true
      });
      this.props.refreshList();
      this.setState({
        submittedTick: false 
      });
    }
    ).catch(err => {
      this.setState(
      {
        submittedCross: true
      });
      this.setState({
        submittedCross: false
      });
    });
  }

  render() {
    return(
      <div className="MakeAction">
      <Header size="small">Create Action</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input fluid label="Actor" name="actor" value={this.state.actor} placeholder="Nick Cage" onChange={this.handleChange} />
            <Form.Input fluid label="Creator" name="creator" value={this.state.creator} placeholder="God" onChange={this.handleChange} />
          </Form.Group>
          <Form.TextArea label="Action" name="action" value={this.state.action} placeholder="Return souls to hell as the Ghost Rider" onChange={this.handleChange} />
          <DatePicker  name="due" selected={this.state.due} onChange={this.handleDateChange} dateFormat="DD-MM-YYYY" />
          <p/>
          <Form.Button content='Submit'/>
          <Transition visible={this.state.submittedTick} animation='scale' duration={700}>
            <Icon size='big' color='green' name='check circle' />
          </Transition>
          <Transition visible={this.state.submittedCross} animation='scale' duration={700}>
            <Icon size='big' color='red' name='remove circle' />
          </Transition>
        </Form>
      </div>
    )
  }
}

export default MakeAction;
