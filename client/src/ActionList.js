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
      const actionItems = res.data;
      this.setState({ actionItems });
    }) 
  }

  render() {
    return(
      <ul>
        {
          actionItems.map(item => <li {item.Id}>{item.Action}: {item.Actor}</li>)
        }
      </ul>
    );
  }
}
