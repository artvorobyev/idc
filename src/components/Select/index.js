import React from "react";
import "./style.scss";
import Select from "react-select";


export default class extends React.Component{
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedOption) {
    this.props.parent.setState({ [this.props.name]: selectedOption });
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  }

  render(){
    var _self = this;
    return (
      <Select
      name={_self.props.name}
      value={_self.props.parent.state[_self.props.name]}
      onChange={_self.handleSelect}
      placeholder={_self.props.placeholder}
      options={_self.props.options}
      multi={_self.props.multi}
      className="Select"
      />
      );
  }
}