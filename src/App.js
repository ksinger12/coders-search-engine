import React, { Component } from "react";
import RepositorySearch from "./components/repositorysearch";
import UiCodeSearch from "./components/uicodesearch";
import StackOverflowSearch from "./components/stackoverflowsearch";
import ApiCodeSearch from "./components/apicodesearch";
import GoogleSearch from "./components/googlesearch";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      repositories: [],
      uiCode: [],
      uiHtmlCode: [],
      apiCode: [],
      stackOverflowData: [],
      googleSearchData: [],
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
        this.setState({ repositories: data.items ? data.items : [] });
      })
      .catch(() => this.setState({ hasErrors: true }));
    event.preventDefault();
  }

  grabUiCode(event) {
    fetch(
      "https://api.github.com/search/code?sort=stars&order=desc&q=" +
        this.searchBox.value +
        "+in:file+language:js+repo:" +
        this.repositorybox.value
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ uiCode: data.items ? data.items : [] });
      })
      .catch(() => this.setState({ hasErrors: true }));
    event.preventDefault();
  }

  grabUiCodeHtml(event) {
    fetch(
      "https://api.github.com/search/code?sort=stars&order=desc&q=" +
        this.searchBox.value +
        "+in:file+language:html+repo:" +
        this.repositorybox.value
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ uiHtmlCode: data.items ? data.items : [] });
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
        this.setState({ apiCode: data.items ? data.items : [] });
      })
      .catch(() => this.setState({ hasErrors: true }));
    event.preventDefault();
  }

  grabStackOverFlowData(event) {
    fetch(
      "https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q=" +
        this.searchBox.value
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ stackOverflowData: data.items ? data.items : [] });
      })
      .catch(() => this.setState({ hasErrors: true }));
    event.preventDefault();
  }

  grabGoogleSearchData(event) {
    const API_KEY = "type_api_key_here";
    const SEARCH_ENGINE_ID = "type_search_engine_id_here";
    fetch(
      "https://www.googleapis.com/customsearch/v1?key=" +
        API_KEY +
        "&cx=" +
        SEARCH_ENGINE_ID +
        "&q=" +
        this.searchBox.value
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ googleSearchData: data.items ? data.items : [] });
      })
      .catch(() => this.setState({ hasErrors: true }));
    event.preventDefault();
  }

  onClick(event) {
    this.grabRepositories(event);
    this.grabUiCode(event);
    this.grabUiCodeHtml(event);
    this.grabApiCode(event);
    this.grabStackOverFlowData(event);
    this.grabGoogleSearchData(event);
  }

  render() {
    this.state.uiCode = this.state.uiCode.concat(this.state.uiHtmlCode);
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
        <StackOverflowSearch questions={this.state.stackOverflowData} />
        <GoogleSearch sites={this.state.googleSearchData} />
      </div>
    );
  }
}

export default App;

//google API key: AIzaSyBd30EtC8nI24tHoAedpwvPEh98Gfw6dME
//google search engine id (cx): 94e8de49414233a43
//google general url query: https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=CUSTOM_SEARCH_ID&q=products
