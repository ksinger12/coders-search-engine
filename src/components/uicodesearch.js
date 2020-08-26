import React from "react";

class UiCodeSearch extends React.Component {
  getFileData() {
    return this.props.code;
  }

  render() {
    return (
      <div>
        <h2>Code - UI</h2>
        <ul>
          {this.getFileData().map((item, index) => (
            <li key={index}>
              File Name:{item.name}; Repository: {item.repository.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UiCodeSearch;
