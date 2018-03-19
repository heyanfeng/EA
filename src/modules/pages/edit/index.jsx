import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {EAAdd} from '../actions'
import {push} from 'react-router-redux/lib/actions'
import Header from '../../shared/header/header'

@connect(state => {
  return {
  }
}, {
  EAAdd,
  push
})
export default class Index extends React.Component {
  static propTypes = {
    push: React.PropTypes.func.isRequired,
    EAAdd: React.PropTypes.func.isRequired
  }
  constructor() {
    super()
    this.state = {
      isShowMask: {
        display: 'none'
      },
      id: location.hash.split('/')[2].split('?')[0],
      data: {}
    }
    this.verify = this.verify.bind(this)
    this.commit = this.commit.bind(this)
    this.cancelCommit = this.cancelCommit.bind(this)
  }
  componentWillMount() {
    axios.get('/api/v0.1/documents/' + this.state.id)
    .then(res => {
      this.setState({
        data: res.data
      })
    })
  }
  submit() {
    this.setState({
      isShowMask: {
        display: 'block'
      }
    })
  }
  verify() {
    let reg = /^[^\s]+$/
    let username = this.refs.username.value
    let num = this.refs.num.value
    if (reg.test(username) && reg.test(num)) {
      this.submit()
    } else {
      alert('你输的输入为空或者有空格，请重新输入！')
    }
  }
  cancelCommit() {
    this.setState({
      isShowMask: {
        display: 'none'
      }
    })
  }
  commit(title, username) {
    let params = {
      name: title,
      status: 0,
      username: username
    }
    this.props.EAAdd(params)
    this.jumpToApproval()
  }
  jumpToApproval() {
    axios.get('/api/v0.1/myDocuments')
    .then(res => {
      this.props.push('/approval/' + res.data[res.data.length - 1].id)
    })
  }
  render() {
    return (
      <div className='edit-container'>
        <Header title='单据编辑' buttonName='首页' {...this.props} />
        <p className='ea-name'>{this.state.data.name}</p>
        <div className='form'>
          <div className='input-items'>
            <div className='input-item'>
              <span>姓名：</span><input type='text' className='input' ref='username' />
            </div>
            <div className='input-item'>
              <span>工号：</span><input type='text' className='input' ref='num' />
            </div>
          </div>
          <div className='textarea-item'>
            <p className='textarea-item-title'>单据说明：</p>
            <textarea className='textarea' />
          </div>
          <div className='btn-item'>
            <button className='btn' onClick={this.verify}>提交</button>
          </div>
        </div>
        <div className='mask' style={this.state.isShowMask}>
          <div className='popup'>
            <p className='popup-name'>是否确认提交单据？</p>
            <p>
              <button className='btn sure' onClick={() => { this.commit(this.state.data.name, this.refs.username.value) }}>确认</button>
              <button className='btn cancel' onClick={this.cancelCommit}>取消</button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
