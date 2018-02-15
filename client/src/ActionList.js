import React, {Component } from 'react';
import MakeAction from './MakeAction';
import axios from 'axios';
import { Card } from 'semantic-ui-react';
import Action from './Action';

class ActionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionItems: []
    }
    this.refreshList = this.refreshList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.updateList(nextProps); 
  }

  componentDidMount() {
    this.updateList(this.props);
  }

  updateList(nextProps) {
    axios.get("api/"+nextProps.view+"/?orderby="+nextProps.orderBy).then(res => {
      const actionItems = res.data;
      this.setState({ actionItems });
      });
  }

  refreshList() {
    axios.get("api/"+this.props.view+"/?orderby="+this.props.orderBy).then(res => {
      const actionItems = res.data;
      this.setState({ actionItems });
    });
  }

  newAction() {
    this.updateList(this.props);
  }

  render() {
    return(
      <div className="ActionList">
        <Card.Group itemsPerRow={1}>
        {
          this.state.actionItems.map(item => 
            <Action key={item.id} refreshList={this.refreshList}
              id={item.id} due={item.due} actor={item.actor} 
              posted={item.posted} creator={item.creator} 
              action={item.action} completed={item.completed} inprogress={item.inprogress}/>
          )
        }
        </Card.Group>
      </div>
    );
  }
}

export default ActionList;
