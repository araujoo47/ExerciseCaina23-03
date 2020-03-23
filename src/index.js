import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 100, error: "" };
    this.liked = false;
  }

  like = () => {
    fetch("http://localhost:3000/")
      .then(data => data.json())
      .then(message => {
        console.log(message);
        if (message) {
          this.setState({ error: "" });
          if (!this.liked) {
            this.liked = true;
            this.setState(({ count }) => ({ count: count + 1 }));
            return;
          }
          this.liked = false;
          this.setState(({ count }) => ({ count: count - 1 }));
        } else { 
          this.setState({ error: "404" });
        }
      });
  };

  render() {
    const { count, error } = this.state;
    return (
      <Fragment>
        <button
          type="button"
          onClick={this.like}
          className={cx("like-button", { liked: this.liked })} > Like | <span className="likes-counter">{count}</span> </button>
        <p>{error}</p>
      </Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);