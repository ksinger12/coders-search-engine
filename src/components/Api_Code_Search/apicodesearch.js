import React from "react";
import "./apicodesearch.css";

class ApiCodeSearch extends React.Component {
  getFileData() {
    return this.props.code;
  }

  render() {
    return (
      <div className="api-code-base">
        <h2>Code - API</h2>
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

export default ApiCodeSearch;
