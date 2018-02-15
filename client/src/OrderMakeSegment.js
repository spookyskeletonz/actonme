import React, { Component } from 'react';
import OrderOptions from './OrderOptions';
import MakeAction from './MakeAction';
import { Segment, Divider } from 'semantic-ui-react';

class OrderMakeSegment extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div>
      <Segment>
        <OrderOptions attached="left" order={this.props.orderBy} handleOrderClick={this.props.handleOrderClick} />
        <Divider />
        <MakeAction refreshList={this.props.refreshList} />
      </Segment>
      </div>
    );
  }
  
}

export default OrderMakeSegment;
