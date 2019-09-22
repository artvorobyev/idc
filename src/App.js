import React from "react";
import logo from "./img/logo.svg";
import { Input } from "reactstrap";
import queryString from "query-string";
import moment from "moment";

import Banner from "./components/Banner/";
import Button from "./components/Button/";
import Select from "./components/Select/";
import Upload from "./components/Upload/";

import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    var zoom = this.calculateZoom();
    this.state = {
      zoom: zoom,
      format: { value: "slogan", label: "Slogan" },
      title: "Apply now!",
      description: "We are waiting for your presentations",
      role: "Higher School of Economics",
      image: "https://spb.hse.ru/data/2018/12/28/1142999882/IMG_8965.jpg"
    };
  }

  inputChange(event) {
    var name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  addedImage(file) {
    console.log(file);
    this.setState({ image: file.dataURL });
  }

  componentDidMount() {
    window.addEventListener("resize", this.windowResize.bind(this));
  }

  windowResize() {
    this.setState({ zoom: this.calculateZoom() });
  }

  calculateZoom() {
    return (window.innerWidth - 460) / 1230;
  }

  formSubmit(event) {
    var state = this.state;
    var _self = this;
    event.preventDefault();
    _self.setState({ loading: true });

    fetch(process.env.REACT_APP_API_URL + "/screenshot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      },
      mode: "cors",
      body: JSON.stringify({
        format: state.format.value,
        title: state.title,
        description: state.description,
        role: state.role,
        image: state.image
      })
    })
      .then(res => {
        return res.blob();
      })
      .then(response => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(response);
        link.download = moment().format("YYYY-MM-DD-HH-mm-ss");
        link.click();
        _self.setState({ loading: false });
        console.log("Успех");
        link.remove();
      })
      .catch(error => {
        _self.setState({ loading: false });
        console.error("Ошибка:", error);
        alert("Произошла ошибка. Попробуйте снова.");
      });
  }

  render() {
    var _self = this;
    var imageFormats = ["photo", "icon", "speaker"];
    var params = queryString.parse(window.location.search);
    if (params.page === "banner") {
      var banner = Object.assign({}, params);
      banner.format = { value: params.format };
      return <Banner {...banner} />;
    } else {
      return (
        <div className="App">
          <div className="App__screen">
            <div className="App__banner" style={{ zoom: _self.state.zoom }}>
              <Banner imageFormats={imageFormats} {..._self.state} />
            </div>
          </div>
          <div className="App__sidebar">
            <header className="App__header">
              <img src={logo} alt="" className="App__logo" />
              <h1 className="App__title">
                inequality
                <br /> and diversity
                <br /> conference
              </h1>
            </header>

            <form className="App__form" onSubmit={_self.formSubmit.bind(_self)}>
              <Select
                parent={_self}
                name="format"
                placeholder="Format"
                options={[
                  { value: "slogan", label: "Slogan" },
                  { value: "photo", label: "Photo" },
                  { value: "icon", label: "Icon" },
                  { value: "number", label: "Number" },
                  { value: "speaker", label: "Speaker" }
                ]}
              />
              <Input
                name="title"
                placeholder="Title"
                value={_self.state.title}
                className="mt-3"
                onChange={_self.inputChange.bind(_self)}
              />
              <Input
                name="role"
                placeholder="Role"
                value={_self.state.role}
                className={`mt-3 ${
                  _self.state.format.value !== "speaker" ? "d-none" : ""
                } `}
                onChange={_self.inputChange.bind(_self)}
              />
              <Input
                name="description"
                type="textarea"
                value={_self.state.description}
                placeholder="Description"
                className="mt-3"
                onChange={_self.inputChange.bind(_self)}
              />

              <Upload
                className={`mt-3 ${
                  imageFormats.includes(_self.state.format.value)
                    ? ""
                    : "d-none"
                }`}
                handler={_self.addedImage.bind(_self)}
              >
                Upload Image
              </Upload>

              <Button loading={_self.state.loading} className="mt-4">
                Generate
              </Button>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default App;
