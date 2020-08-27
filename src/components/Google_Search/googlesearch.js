import React from "react";
import "./googlesearch.css";

class GoogleSearch extends React.Component {
  getFileData() {
    return this.props.sites;
  }

  render() {
    return (
      <div>
        <h2>Google Search Results</h2>
        <ul>
          {this.getFileData().map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GoogleSearch;
