import React from "react";
import { render } from "react-dom";

import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import js from "react-syntax-highlighter/languages/hljs/javascript";
import shell from "react-syntax-highlighter/languages/hljs/shell";
import monokai from "react-syntax-highlighter/styles/hljs/monokai";
import { Follow } from "react-twitter-widgets";

import * as mdIcons from "../dist/index.js";

import "./index.css";

registerLanguage("javascript", js);
registerLanguage("shell", shell);

const allIconNames = Object.keys(mdIcons);

class App extends React.Component {
  state = { searchText: "" };

  handleSearchChange = evt => this.setState({ searchText: evt.target.value });

  render() {
    const { searchText } = this.state;

    const preparedSearchText = searchText.toLowerCase();
    const iconNames = searchText
      ? allIconNames.filter(name => name.toLowerCase().includes(preparedSearchText))
      : allIconNames;

    return (
      <div id="content">
        <a href="https://github.com/kombucha/react-md-icon" target="_blank" rel="noopener noreferrer">
          <img
            style={{ position: "absolute", top: 0, right: 0, border: 0 }}
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
            alt="Fork me on GitHub"
          />
        </a>
        <h1>react-md-icon</h1>

        <div className="section">
          <h2>Install it</h2>
          <SyntaxHighlighter className="code" language="shell" style={monokai}>
            {`npm install react-md-icon`}
          </SyntaxHighlighter>
        </div>

        <div className="section">
          <h2>Use it</h2>
          <SyntaxHighlighter className="code" language="jsx" style={monokai}>
            {`
import React from 'react';
import BaselineAnnouncement from 'react-md-icon/dist/BaselineAnnouncement';

const MyComponent = <div>
  <BaselineAnnoucement />
</div>;`}
          </SyntaxHighlighter>
        </div>

        <div className="section">
          <Follow username="mrkombu" />
        </div>

        <div className="section">
          <input
            className="search-input"
            autoFocus
            type="text"
            placeholder="Search for icon names..."
            value={searchText}
            onChange={this.handleSearchChange}
          />
        </div>

        <div className="section">
          <ul className="icons-list">
            {iconNames.map(iconName => {
              const Icon = mdIcons[iconName];
              return (
                <li className="icon-item" id={iconName} key={iconName}>
                  <Icon className="icon" />
                  <span className="icon-title">{iconName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
