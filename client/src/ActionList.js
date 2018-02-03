import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ActionList extends Component {
  constructor(props) {
    super(props);
    this.actionItems = [];
  }

  componentWillMount() {
    axios.get("api/"+this.props.view+"/?orderby="+this.props.orderBy).then(res => {
      this.actionItems = res.data;
    });
  }

  componentDidUpdate() {
    axios.get("api/"+this.props.view+"/?orderby="+this.props.orderBy).then(res => {
        this.actionItems = res.data;
    });
  }

  render() {
    return(
      <ul>
        {
          this.actionItems.map(item => <li key={item.Id}>{item.Action}: {item.Actor}</li>)
        }
      </ul>
    );
  }
}

export default ActionList;
