import React, { StyleSheet } from 'react';
import './App.css';
import closeIcon from './assets/titlebar/close.png';
import minimizeIcon from './assets/titlebar/minimize.png';
import searchIcon from './assets/titlebar/search.png';
import settingsIcon from './assets/titlebar/settings.png';
const { remote } = window.require('electron');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarActive: false,
    };
  }

  closeWindow() {
    var window = remote.getCurrentWindow()
    window.close()
  }

  minimizeWindow() {
    var window = remote.getCurrentWindow()
    window.minimize()
  }

  maximizeWindow() {
    var window = remote.getCurrentWindow()
    window.maximize()
  }

  toggleSerach = () => {
    if (this.state.searchBarActive == false)
      this.setState({ searchBarActive: true });
    if (this.state.searchBarActive == true)
      this.setState({ searchBarActive: false });
  }

  changeWidth = (e) => {
    e.target.style.width = 50;
  }

  render() {
    return (
      <div className="container">
        <div className="titlebar">
          <div className="close" onClick={this.closeWindow}>
            <img src={closeIcon} className="closeIcon" />
          </div>
          <div className="minimize" onClick={this.minimizeWindow}>
            <img src={minimizeIcon} className="minimizeIcon" />
          </div>
          <div className="absolute-titlebar">
            <div className="search-bar-btn" onClick={this.toggleSerach}>
              <img src={searchIcon} className="searchIcon" />
            </div>
            <div className={this.state.searchBarActive == true ? "search-bar-active" : "search-bar-inactive"}>
              <input className={this.state.searchBarActive == true ? "search-bar-tf-active" : "search-bar-tf-inactive"}>
              </input>
            </div>
            <div className="settings-btn">
              <img src={settingsIcon} className="settingsIcon" />
            </div>
          </div>
        </div>
        <div className="main-area">
          <div className="sidebar">
            <div className="sidebar-child">
              <div className="sidebar-child-absolute">
                <img src={settingsIcon} className="sidebar-icon" />
                <p className="sidebar-text-active" onMouseOver={this.changeWidth}>this is text</p>
              </div>
            </div>
          </div>
          <div className="main-container">

          </div>
        </div>
        <script src=""></script>
      </div>
    );
  }
}

export default App;