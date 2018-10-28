import React, { Component } from "react";
import "./app.css";

class App extends Component {
  state = {
    name: "",
    result: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitForm = e => {
    e.preventDefault();
    fetch("/api")
      .then(res => res.json())
      .then(data => this.setState({ result: data.data }))
      .catch(err => console.error(err));
  };

  render() {
    const { name, result } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {result && <p>{result}</p>}
      </div>
    );
  }
}

export default App;
