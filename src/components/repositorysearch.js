import React from "react";

class RepositorySearch extends React.Component {
  getRepositories() {
    return this.props.repositories;
  }

  render() {
    return (
      <div>
        <div className="foundRepo">{this.props.name}</div>
        <h2>Repositories</h2>
        <ul>
          {this.getRepositories().map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RepositorySearch;
