import React, { Component } from 'react'

import './style.css'

import defaultPost from '../../assets/main-container/default-post-img.jpg'

export default class index extends Component {
  render() {
    return (
      <div class={this.props.shown == false ? "main-container-floating-post" : "main-container-floating-post-open"}>
        <img src={this.props.item.url} className="floating-post-img" />
        <div className="floating-post-detail-area">
          <div className="floating-post-title">{this.props.item.title}</div>
        </div>
        <div className="main-container-floating-post-close" onClick={() => {this.props.handleClose()}}>
          <div className="floating-post-close-icon">
            <div className="floating-post-close-icon-element-1"></div>
            <div className="floating-post-close-icon-element-2"></div>
          </div>
        </div>
      </div>
    )
  }
}
