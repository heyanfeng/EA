import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {EAModify} from '../actions'
import {push} from 'react-router-redux/lib/actions'
import Header from '../../shared/header/header'

@connect(state => {
  return {
  }
}, {
  EAModify,
  push
})
export default class Index extends React.Component {
  static propTypes = {
    push: React.PropTypes.func.isRequired,
    EAModify: React.PropTypes.func.isRequired
  }
  componentWillMount() {
    this.state = {
      id: location.hash.split('/')[2].split('?')[0],
      data: {}
    }
    axios.get('/api/v0.1/myDocuments/' + this.state.id)
    .then(res => {
      this.setState({
        data: res.data
      })
    })
  }
  approval(tag) {
    if (tag) {
      this.props.EAModify({
        id: this.state.id,
        name: this.state.data.name,
        status: 1
      })
      this.props.push('approvalResult/' + this.state.id + '/' + tag)
    } else {
      this.props.EAModify({
        id: this.state.id,
        name: this.state.data.name,
        status: 2
      })
      this.props.push('approvalResult/' + this.state.id + '/' + tag)
    }
  }
  render() {
    return (
      <div className='approval-container'>
        <Header title='单据审批' buttonName='首页' />
        <p className='ea-name'>{this.state.data.name}</p>
        <div className='form'>
          <div className='textarea-item'>
            <p>节点审批人：{this.state.data.username}</p>
            <p className='textarea-item-title'>审批说明：</p>
            <textarea className='textarea' />
          </div>
          <div className='btn-item'>
            <button className='btn pass' onClick={() => { this.approval(1) }}>通过</button>
            <button className='btn reject' onClick={() => { this.approval(0) }}>不通过</button>
          </div>
        </div>
      </div>
    )
  }
}
