import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class Order extends Component{

  constructor(props) {
    super(props);
    this.state = {
      active: "due"
    }
  }

  handleClick(orderClicked) {
    this.setState({ active: orderClicked});
    this.props.handleOrderClick(orderClicked);
  }

  render() {
    return(
      <div className="Order">
        <Button.Group>
          <Button toggle active={(this.state.active === "due")} onClick={this.handleClick.bind(this,"due")}>Due Date</Button>
          <Button.Or />
          <Button toggle active={(this.state.active === "actor")} onClick={this.handleClick.bind(this,"actor")}>Actor</Button>
          <Button.Or />
          <Button toggle active={(this.state.active === "posted")} onClick={this.handleClick.bind(this,"posted")}>Post Date</Button>
        </Button.Group> 
        </div>
    );
  }
  
}

export default Order;
