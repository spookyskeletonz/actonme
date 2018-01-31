import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ActionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionItems: []
    };
  }

  componentDidMount() {
    axios.get('api/actionitems/').then(res => {
      console.log(res);
    }) 
  }

  render() {
    return(
      <ul>
      <li>placeholder</li>
      </ul>
    );
  }
}
