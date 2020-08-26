import React, { Component } from "react";
import RepositorySearch from "./components/repositorysearch";
import UiCodeSearch from "./components/uicodesearch";

import "./App.css";
import ApiCodeSearch from "./components/apicodesearch";

class App extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      repositories: [],
      uiCode: [],
      apiCode: [],
      hasErrors: false,
    };
  }

  grabRepositories(event) {
    fetch(
      "https://api.github.com/search/repositories?sort=stars&order=desc&q=" +
        this.searchBox.value
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ repositories: data.items });
      })
      .catch(() => this.setState({ hasErrors: true }));
    event.preventDefault();
  }

  grabUiCode(event) {
    fetch(
      "https://api.github.com/search/code?sort=stars&order=desc&q=" +
        this.searchBox.value +
        "+in:file+language:js+repo:" +
        this.repositorybox.value //note that i am not searching html files which is important to know
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ uiCode: data.items });
      })
      .catch(() => this.setState({ hasErrors: true }));
    event.preventDefault();
  }

  grabApiCode(event) {
    fetch(
      "https://api.github.com/search/code?sort=stars&order=desc&q=" +
        this.searchBox.value +
        "+in:file+language:java+repo:" +
        this.repositorybox.value
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ apiCode: data.items });
      })
      .catch(() => this.setState({ hasErrors: true }));
    event.preventDefault();
  }

  onClick(event) {
    this.grabRepositories(event);
    this.grabUiCode(event);
    this.grabApiCode(event);
  }

  render() {
    return (
      <div className="App">
        <form>
          <input
            type="text"
            className="searchbox"
            ref={(input) => {
              this.searchBox = input;
            }}
          />
          <input
            type="text"
            className="repositorybox"
            ref={(input) => {
              this.repositorybox = input;
            }}
          />
          <button onClick={this.onClick}>Search</button>
        </form>
        <RepositorySearch repositories={this.state.repositories} />
        <UiCodeSearch code={this.state.uiCode} />
        <ApiCodeSearch code={this.state.apiCode} />
      </div>
    );
  }
}

export default App;
