import React from "react";
import Typograf from "typograf";
import "./style.scss";

export default class extends React.Component {
  render() {
    var tp = new Typograf({ locale: ["ru", "en-US"] });
    var props = this.props;
    var css =
      props.format.value === "photo" && props.image
        ? { backgroundImage: `url("${props.image}")` }
        : {};
    return (
      <div className={`Banner Banner--${props.format.value}`} style={css}>
        <div className="Banner__image">
          <img src={props.image} alt="" />
        </div>
        <div
          className="Banner__title"
          dangerouslySetInnerHTML={{ __html: tp.execute(props.title) }}
        ></div>
        <div
          className="Banner__role"
          dangerouslySetInnerHTML={{ __html: tp.execute(props.role) }}
        ></div>
        <div
          className="Banner__description"
          dangerouslySetInnerHTML={{ __html: tp.execute(props.description) }}
        ></div>
      </div>
    );
  }
}
