import React from "react";
import "./uicodesearch.css";

class UiCodeSearch extends React.Component {
  getFileData() {
    return this.props.code;
  }

  render() {
    return (
      <div className="ui-code-base">
        <h2>Code - UI</h2>
        <ul>
          {this.getFileData().map((item, index) => (
            <li key={index}>
              File Name:<a href={item.html_url}>{item.name}</a> Repository:
              <a href={item.repository.html_url}>{item.repository.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UiCodeSearch;
