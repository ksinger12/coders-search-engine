import React from "react";
import "./repositorysearch.css";

class RepositorySearch extends React.Component {
  getRepositories() {
    return this.props.repositories;
  }

  render() {
    return (
      <div className="repository-base">
        <div className="foundRepo">{this.props.name}</div>
        <h2>Repositories</h2>
        <ul>
          {this.getRepositories().map((item, index) => (
            <li key={index}>
              <a href={item.git_url}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RepositorySearch;
