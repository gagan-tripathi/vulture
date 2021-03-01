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
      postList: [

      ],
      trendingSubredditList: [

      ],
      subredditList: [
        // {name: 'Home'},
        // {name: 'wallstreetbets'},
        // {name: 'AskReddit'},
        // {name: 'Minecraft'},
        // {name: 'Minecraft'},
      ]
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
    parentdiv.className = 'main-container-list-item'

    fetch('http://www.reddit.com/r/memes/new.json')
      .then(response => response.json())
      .then(body => {
        for (let index = 0; index < body.data.children.length; index++) {
          let img = document.createElement('div')
          img.className = 'main-container-list-item-img'

        }
      })
  }

  componentDidMount() {
    fetch('http://www.reddit.com/top.json')
      .then(response => response.json())
      .then(body => {
        for (let index = 0; index < body.data.children.length; index++) {
          this.setState({
            postList: [
              ...this.state.postList,
              {
                title: body.data.children[index].data.title,
                img: body.data.children[index].data.url_overridden_by_dest,
                score: body.data.children[index].data.score,
                author: body.data.children[index].data.author,
              }
            ]
          })
        }
      })
    this.loadTrendingSubredditList();
  }

  loadTrendingSubredditList() {
    fetch('https://api.reddit.com/subreddits/popular.json')
      .then(response => response.json())
      .then(body => {
        for (let index = 0; index < body.data.children.length; index++) {
          this.setState({
            trendingSubredditList: [
              ...this.state.trendingSubredditList,
              {
                name: body.data.children[index].data.display_name,
              }
            ]
          })
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
              <input className="search-bar-tf-active" placeholder="Search Subreddits">
              </input>
            </div>
          </div>
        </div>
        <div className="main-area">
          <div className="main-sidebar" style={{ width: this.state.sidebarWidth }}>
            <div className="main-sidebar-trending-section"></div>
            <div className="main-sidebar-subreddit-section">
              <div className="main-sidebar-subreddit-section-title-area">
                <div className="main-sidebar-subreddit-section-title-area-title">Trending</div>
              </div>
              {
                this.state.trendingSubredditList.map(item =>
                  <div className="subreddit-list-item">
                    <div className="subreddit-list-item-name">r/{item.name}</div>
                  </div>
                )
              }
            </div>
          </div>
          <div className="main-container">
            <div className="main-container-list-sort-area">
              <div className="main-container-list-sort-item main-container-list-sort-item-selected">Hot</div>
              <div className="main-container-list-sort-item">New</div>
              <div className="main-container-list-sort-item">Top</div>
            </div>
            <div className="main-container-list">
              {
                this.state.postList.map(item =>
                  <div className="main-container-list-item">
                    <div className="main-container-list-item-voting">
                      <div className="vote-container">
                        <div className="upvote-symbol"></div>
                      </div>
                      <div className="vote-count">{item.score}</div>
                      <div className="vote-container">
                        <div className="downvote-symbol"></div>
                      </div>
                    </div>
                    <img src={item.img} className="main-container-list-item-img" />
                    <div className="main-container-list-item-detail">
                      <div className="main-container-list-item-title">{item.title}</div>
                      <div className="main-container-list-item-time">2 hours ago by <a>{item.author}</a></div>
                    </div>
                  </div>
                )
              }













            </div>
          </div>
        </div>
        <script src=""></script>
      </div >
    );
  }
}

export default App;