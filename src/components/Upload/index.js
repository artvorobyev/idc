import React from "react";
import "./style.scss";
import DropzoneComponent from "react-dropzone-component";
import nextId from "react-id-generator";

export default class extends React.Component {
  render() {
    var _self = this;
    var props = _self.props;
    const random = nextId();

    return (
      <div>
        <div id={random} className={`${props.className} Upload`}>
          {props.children}
        </div>

        <DropzoneComponent
          eventHandlers={{ thumbnail: props.handler }}
          config={{
            iconFiletypes: [".jpg", ".png", ".gif", "svg"],
            showFiletypeIcon: true,
            postUrl: "/uploadHandler",
            dropzoneSelector: "#" + random
          }}
          djsConfig={{ autoProcessQueue: false }}
        />
      </div>
    );
  }
}
