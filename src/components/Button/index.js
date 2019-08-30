import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './style.scss';

class ButtonContainer extends Component {
  render() {
    var _self = this;
    return (
      <Button 
        color="primary" 
        {..._self.props} 
        className={` ${_self.props.className} Button ${ (_self.props.loading) ? 'Button--loading' : '' } `} 
      />
    )
  }
  
}

export default ButtonContainer;