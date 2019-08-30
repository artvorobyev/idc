import React from "react";
import "./style.scss";


export default class extends React.Component{
  constructor(props) {
    super(props);
  }

  typograph(string) {
    return string.split(' ').reduce((response, current)=>{
      let join = (current.length > 3) ? ' ' : '&nbsp;';
      return response + current + join;
    },'').replace(/([^>])\n/g, '$1<br/>').trim();
  }

  render(){
    var _self = this;
    var props = this.props;
    var css = (props.format.value === 'photo' && props.image) ? {'backgroundImage': `url("${props.image}")`} : {};
    return (
      <div className={`Banner Banner--${props.format.value}`} style={css}>
        <div className="Banner__image">
          <img src={props.image} alt=""/>
        </div>
        <div className="Banner__title">{props.title}</div>
        <div className="Banner__role">{props.role}</div>
        <div className="Banner__description" dangerouslySetInnerHTML={{ __html: _self.typograph(props.description) }}></div>
      </div>
      );
  }
}