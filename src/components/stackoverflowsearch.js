import React from "react";

class StackOverflowSearch extends React.Component {
  getFileData() {
    return this.props.questions;
  }

  render() {
    return (
      <div>
        <h2>StackOverflow Search Results</h2>
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

export default StackOverflowSearch;
