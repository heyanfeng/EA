import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux/lib/actions'

@connect(() => {
}, {
  push
})
export default class Index extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    buttonName: React.PropTypes.string,
    push: React.PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.jumpToHome = this.jumpToHome.bind(this)
  }
  jumpToHome() {
    this.props.push('/')
  }
  render() {
    return (
      <header className='header-container'>
        <a onClick={this.jumpToHome} className='header-btn'>{this.props.buttonName}</a>
        <span className='header-title'>{this.props.title}</span>
      </header>
    )
  }
}
