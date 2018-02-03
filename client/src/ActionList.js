import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ActionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionItems: [],
      show: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: false }) 
    this.updateList(nextProps); 
  }

  componentDidMount() {
    this.updateList(this.props);
  }

  updateList(nextProps) {
    axios.get("api/"+nextProps.view+"/?orderby="+nextProps.orderBy).then(res => {
      const actionItems = res.data;
      this.setState({ actionItems, show: true });
    });
  }

  render() {
    return(
      <ul>
        {this.props.orderBy} {this.props.view}
        {this.state.show === true &&
          this.state.actionItems.map(item => <li key={item.Id}>{item.Action}: {item.Actor}</li>)
        }
      </ul>
    );
  }
}

export default ActionList;
