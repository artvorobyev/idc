import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './style.scss';

class ButtonContainer extends Component {
  render() {
    var props = this.props;
    return (
      <Button
        color='primary'
        className={` ${props.className} Button ${
          props.loading ? 'Button--loading' : ''
        } `}
      >
        {props.children}
      </Button>
    );
  }
}

export default ButtonContainer;
