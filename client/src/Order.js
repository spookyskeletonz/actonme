import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';

class Order extends Component{
  render() {
    return(
      <div className="Order">
        <Header size="medium">Current Order: {this.props.order}</Header>
        <Button.Group>
          <Button onClick={this.props.handleOrderClick.bind(this,"due")}>Due Date</Button>
          <Button.Or />
          <Button onClick={this.props.handleOrderClick.bind(this,"actor")}>Actor</Button>
          <Button.Or />
          <Button onClick={this.props.handleOrderClick.bind(this,"posted")}>Post Date</Button>
        </Button.Group> 
        </div>
    );
  }
  
}

export default Order;
