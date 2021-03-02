import React, { StyleSheet } from 'react';
import './App.css';
import closeIcon from './assets/titlebar/close.png';
import minimizeIcon from './assets/titlebar/minimize.png';
import searchIcon from './assets/titlebar/search.png';
import settingsIcon from './assets/titlebar/settings.png';
import iconArrow from '../src/assets/main-container/icon-arrow.png';
import defaultPost from '../src/assets/main-container/default-post-img.jpg'
const { remote } = window.require('electron');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.floatingPostRef = React.createRef();
    this.state = {
      searchBarActive: false,
      sidebarWidth: 215,
      isFloatingPostShown: false,
      postList: [

      ],
      trendingSubredditList: [

      ],
      subredditList: [

      ],
      searchText: '',
    };
  }

  handleFloatingPost() {
    if (this.state.isFloatingPostShown == false)
      this.setState({ isFloatingPostShown: true })
    else
      this.setState({ isFloatingPostShown: false })
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
                // img: body.data.children[index].data.url_overridden_by_dest,
                img: body.data.children[index].data.thumbnail,
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


  loadPostListByTopic = (item) => {
    this.setState({
      postList: []
    })
    fetch('http://www.reddit.com/r/' + item + '.json')
      .then(response => response.json())
      .then(body => {
        for (let index = 0; index < body.data.children.length; index++) {
          this.setState({
            postList: [
              ...this.state.postList,
              {
                title: body.data.children[index].data.title,
                img: body.data.children[index].data.thumbnail,
                score: body.data.children[index].data.score,
                author: body.data.children[index].data.author,
              }
            ]
          })
        }
      })
  }

  _handleSearchResult = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        postList: []
      })
      fetch('http://www.reddit.com/search.json?q=' + this.state.searchText)
        .then(response => response.json())
        .then(body => {
          for (let index = 0; index < body.data.children.length; index++) {
            this.setState({
              postList: [
                ...this.state.postList,
                {
                  title: body.data.children[index].data.title,
                  img: body.data.children[index].data.thumbnail,
                  score: body.data.children[index].data.score,
                  author: body.data.children[index].data.author,
                }
              ]
            })
          }
        })
    }
  }

  formatScore(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
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
              <input className="search-bar-tf-active" placeholder="Search here" onChange={(e) => { this.setState({ searchText: e.target.value }) }} onKeyDown={this._handleSearchResult}>
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
              <div className="main-sidebar-subreddit-section-list">
                {
                  this.state.trendingSubredditList.map(item =>
                    <div className="subreddit-list-item" onClick={() => { this.loadPostListByTopic(item.name); }}>
                      <div className="subreddit-list-item-name">r/{item.name}</div>
                    </div>
                  )
                }
              </div>
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
                  <div className="main-container-list-item" onClick={() => {this.handleFloatingPost();}}>
                    <div className="main-container-list-item-voting">
                      <div className="vote-container">
                        <div className="upvote-symbol"></div>
                      </div>
                      <div className="vote-count">{this.formatScore(item.score)}</div>
                      <div className="vote-container">
                        <div className="downvote-symbol"></div>
                      </div>
                    </div>
                    {item.img === 'self' || item.img === 'default' || item.img == '' || item.img == 'nsfw' || item.img == 'spoiler' ?
                      <img src={defaultPost} className="main-container-list-item-img" />
                      :
                      <img src={item.img} className="main-container-list-item-img" />
                    }

                    <div className="main-container-list-item-detail">
                      <div className="main-container-list-item-title">{item.title}</div>
                      <div className="main-container-list-item-time">2 hours ago by <a>{item.author}</a></div>
                    </div>
                  </div>
                )
              }
            </div>
            <div ref={this.floatingPostRef} class={this.state.isFloatingPostShown == false ? "main-container-floating-post" : "main-container-floating-post-open"} onClick={() => {this.handleFloatingPost();}}>
              {/* rrrr */}
            </div>
          </div>
        </div>
        <script src=""></script>
      </div >
    );
  }
}

export default App;