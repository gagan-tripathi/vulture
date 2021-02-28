import React, { StyleSheet } from 'react';
import './App.css';
import closeIcon from './assets/titlebar/close.png';
import minimizeIcon from './assets/titlebar/minimize.png';
import searchIcon from './assets/titlebar/search.png';
import settingsIcon from './assets/titlebar/settings.png';
import iconArrow from '../src/assets/main-container/icon-arrow.png';
const { remote } = window.require('electron');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarActive: false,
      sidebarWidth: 215,
    };
  }

  getMaximized() {
    var window = remote.getCurrentWindow();
    window.isMaximized() ? this.setState({ sidebarWidth: 300 }) : this.setState({ sidebarWidth: 215 });
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

  fetchMemes() {
    let parentdiv = document.createElement('div')
    parentdiv.className='main-container-list-item'
    
    fetch('http://www.reddit.com/r/memes.json')
    .then(response => response.json())
    .then(body => {
      for (let index=0; index<body.data.children.length; index++) {
        let img = document.createElement('div')
        img.className = 'main-container-list-item-img'

      }
      
    })
  }

  render() {
    return (
      <div className="container">
        <div className="titlebar">
          <div className="appTitle">Vulture</div>
          <div className="appTitlePlus">+</div>
          <div className="navigationAction">
            <div className="close" onClick={this.closeWindow}>
              <img src={closeIcon} className="closeIcon" />
            </div>
            <div className="minimize" onClick={this.minimizeWindow}>
              <img src={minimizeIcon} className="minimizeIcon" />
            </div>
          </div>

          <div className="absolute-titlebar">
            <div className="search-bar-btn" onClick={this.toggleSerach}>
              <img src={searchIcon} className="searchIcon" />
            </div>
            {/* <div className={this.state.searchBarActive == true ? "search-bar-active" : "search-bar-inactive"}>
              <input className={this.state.searchBarActive == true ? "search-bar-tf-active" : "search-bar-tf-inactive"}>
              </input>
            </div> */}
            <div className="search-bar-active">
              <input className="search-bar-tf-active" placeholder="Search here">
              </input>
            </div>
          </div>
        </div>
        <div className="main-area">
          <div className="main-sidebar" style={{ width: this.state.sidebarWidth }}>
            <div className="main-sidebar-trending-section"></div>
            <div className="main-sidebar-subreddit-section"></div>
          </div>
          <div className="main-container">
            <div className="main-container-list-sort-area">
              <div className="main-container-list-sort-item main-container-list-sort-item-selected">Hot</div>
              <div className="main-container-list-sort-item">New</div>
              <div className="main-container-list-sort-item">Top</div>
            </div>
            <div className="main-container-list">
              <div className="main-container-list-item">
                <div className="main-container-list-item-voting">
                  <div className="vote-container">
                    <div className="upvote-symbol"></div>
                  </div>
                  <div className="vote-count">1.2k</div>
                  <div className="vote-container">
                    <div className="downvote-symbol"></div>
                  </div>
                </div>
                <div className="main-container-list-item-img" />
                <div className="main-container-list-item-detail">
                  <div className="main-container-list-item-title">Quit my digital map job and picked up woodworking.</div>
                  <div className="main-container-list-item-time">2 hours ago by <a>z3ven</a></div>
                </div>
              </div>






              <div className="main-container-list-item">
                <div className="main-container-list-item-voting">
                  <div className="vote-container">
                    <div className="upvote-symbol"></div>
                  </div>
                  <div className="vote-count">1.2k</div>
                  <div className="vote-container">
                    <div className="downvote-symbol"></div>
                  </div>
                </div>
                <div className="main-container-list-item-img" />
                <div className="main-container-list-item-detail">
                  <div className="main-container-list-item-title">Quit my digital map job and picked up woodworking.</div>
                  <div className="main-container-list-item-time">2 hours ago by <a>z3ven</a></div>
                </div>
              </div><div className="main-container-list-item">
                <div className="main-container-list-item-voting">
                  <div className="vote-container">
                    <div className="upvote-symbol"></div>
                  </div>
                  <div className="vote-count">1.2k</div>
                  <div className="vote-container">
                    <div className="downvote-symbol"></div>
                  </div>
                </div>
                <div className="main-container-list-item-img" />
                <div className="main-container-list-item-detail">
                  <div className="main-container-list-item-title">Quit my digital map job and picked up woodworking.</div>
                  <div className="main-container-list-item-time">2 hours ago by <a>z3ven</a></div>
                </div>
              </div><div className="main-container-list-item">
                <div className="main-container-list-item-voting">
                  <div className="vote-container">
                    <div className="upvote-symbol"></div>
                  </div>
                  <div className="vote-count">1.2k</div>
                  <div className="vote-container">
                    <div className="downvote-symbol"></div>
                  </div>
                </div>
                <div className="main-container-list-item-img" />
                <div className="main-container-list-item-detail">
                  <div className="main-container-list-item-title">Quit my digital map job and picked up woodworking.</div>
                  <div className="main-container-list-item-time">2 hours ago by <a>z3ven</a></div>
                </div>
              </div><div className="main-container-list-item">
                <div className="main-container-list-item-voting">
                  <div className="vote-container">
                    <div className="upvote-symbol"></div>
                  </div>
                  <div className="vote-count">1.2k</div>
                  <div className="vote-container">
                    <div className="downvote-symbol"></div>
                  </div>
                </div>
                <div className="main-container-list-item-img" />
                <div className="main-container-list-item-detail">
                  <div className="main-container-list-item-title">Quit my digital map job and picked up woodworking.</div>
                  <div className="main-container-list-item-time">2 hours ago by <a>z3ven</a></div>
                </div>
              </div><div className="main-container-list-item">
                <div className="main-container-list-item-voting">
                  <div className="vote-container">
                    <div className="upvote-symbol"></div>
                  </div>
                  <div className="vote-count">1.2k</div>
                  <div className="vote-container">
                    <div className="downvote-symbol"></div>
                  </div>
                </div>
                <div className="main-container-list-item-img" />
                <div className="main-container-list-item-detail">
                  <div className="main-container-list-item-title">Quit my digital map job and picked up woodworking.</div>
                  <div className="main-container-list-item-time">2 hours ago by <a>z3ven</a></div>
                </div>
              </div><div className="main-container-list-item">
                <div className="main-container-list-item-voting">
                  <div className="vote-container">
                    <div className="upvote-symbol"></div>
                  </div>
                  <div className="vote-count">1.2k</div>
                  <div className="vote-container">
                    <div className="downvote-symbol"></div>
                  </div>
                </div>
                <div className="main-container-list-item-img" />
                <div className="main-container-list-item-detail">
                  <div className="main-container-list-item-title">Quit my digital map job and picked up woodworking.</div>
                  <div className="main-container-list-item-time">2 hours ago by <a>z3ven</a></div>
                </div>
              </div><div className="main-container-list-item">
                <div className="main-container-list-item-voting">
                  <div className="vote-container">
                    <div className="upvote-symbol"></div>
                  </div>
                  <div className="vote-count">1.2k</div>
                  <div className="vote-container">
                    <div className="downvote-symbol"></div>
                  </div>
                </div>
                <div className="main-container-list-item-img" />
                <div className="main-container-list-item-detail">
                  <div className="main-container-list-item-title">Quit my digital map job and picked up woodworking.</div>
                  <div className="main-container-list-item-time">2 hours ago by <a>z3ven</a></div>
                </div>
              </div>







            </div>
          </div>
        </div>
        <script src=""></script>
      </div >
    );
  }
}

export default App;