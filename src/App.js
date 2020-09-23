import React, { Component } from "react";
import RepositorySearch from "./components/Repository_Search/repositorysearch";
import UiCodeSearch from "./components/Ui_Code_Search/uicodesearch";
import StackOverflowSearch from "./components/Stack_Overflow_Search/stackoverflowsearch";
import ApiCodeSearch from "./components/Api_Code_Search/apicodesearch";
import GoogleSearch from "./components/Google_Search/googlesearch";
import cheerio from "cheerio";
import "./App.css";

/**
 * To Get Your Own Api Key & Search Engine ID
 * Follow the instructions at the link below:
 * https://aquasar.io/articles/google-custom-search-in-a-react-redux-app
 */

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
      scrapedData: {
        links: [],
        titles: [],
      },
      hasErrors: false,
      GOOGLE_API_KEY: "",
      GOOGLE_SEARCH_ENGINE_ID: "",
    };
  }

  grabRepositories(event) {
    fetch(
      `https://api.github.com/search/repositories?sort=stars&order=desc&q=${this.searchBox.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ repositories: data.items ? data.items : [] });
      })
      .catch(() => this.setState({ hasErrors: true }));
    event.preventDefault();
  }
  /**
   * Note: grabUiCode(), grabUiCodeHtml(), and grabApiCode() fetch statements appear to not return data
   * when `...${}...` is used, though this is the preferred method.
   */
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
      `https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q=${this.searchBox.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ stackOverflowData: data.items ? data.items : [] });
      })
      .catch(() => this.setState({ hasErrors: true }));
    event.preventDefault();
  }

  grabGoogleSearchData(event) {
    this.state.GOOGLE_API_KEY = "AIzaSyBd30EtC8nI24tHoAedpwvPEh98Gfw6dME";
    this.state.GOOGLE_SEARCH_ENGINE_ID = "94e8de49414233a43";
    fetch(
      `https://www.googleapis.com/customsearch/v1?key=${this.state.GOOGLE_API_KEY}&cx=${this.state.GOOGLE_SEARCH_ENGINE_ID}&q=${this.searchBox.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ googleSearchData: data.items ? data.items : [] });
      })
      .catch(() => this.setState({ hasErrors: true }));
    event.preventDefault();
  }

  grabScrapedData() {
    fetch(`/url/link-goes-here?q=${this.searchBox.value}`)
      .then((res) => res.text())
      .then((data) => {
        let $ = cheerio.load(data);
        let links = $('a[class*="class-of-elements-looking-for"]');

        this.state.scrapedData.links = links.map(function (index, element) {
          return $(element).attr("href"); //will return what is stored in href of the class element
        });
        this.state.scrapedData.titles = links.map(function (index, element) {
          return $(element).text(); //will return what is actually in the tags
        });
      })
      .catch(() => this.setState({ hasErrors: true }));
  }

  onClick(event) {
    this.grabRepositories(event);
    this.grabUiCode(event);
    this.grabUiCodeHtml(event);
    this.grabApiCode(event);
    this.grabStackOverFlowData(event);
    this.grabGoogleSearchData(event);
    //this.grabScrapedData();
  }

  render() {
    this.state.uiCode = this.state.uiCode.concat(this.state.uiHtmlCode);
    return (
      <div className="App">
        <form>
          Keyword:
          <input
            type="text"
            className="searchbox"
            ref={(input) => {
              this.searchBox = input;
            }}
          />
          Repository:
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
