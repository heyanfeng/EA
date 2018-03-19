import React from 'react'
import {connect} from 'react-redux'
import {EAGet, myEAGet} from '../actions'
import {push} from 'react-router-redux/lib/actions'
import Header from '../../shared/header/header'

@connect(state => {
  return {
    documentsList: state.documentsList.items
  }
}, {
  EAGet,
  myEAGet,
  push
})
export default class Index extends React.Component {
  static propTypes = {
    EAGet: React.PropTypes.func.isRequired,
    myEAGet: React.PropTypes.func.isRequired,
    push: React.PropTypes.func.isRequired,
    documentsList: React.PropTypes.array.isRequired
  }
  constructor() {
    super()
    this.state = {
      data: [],
      isShow: {
        display: 'none'
      },
      role: 'all'
    }
    this.getAllDocuments = this.getAllDocuments.bind(this)
    this.getMyDocuments = this.getMyDocuments.bind(this)
    this.jumpToEdit = this.jumpToEdit.bind(this)
    this.jumpToApproval = this.jumpToApproval.bind(this)
  }
  componentWillMount() {
    this.props.EAGet()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.documentsList })
  }
  getAllDocuments() {
    this.props.EAGet()
    this.setState(
      {
        data: this.props.documentsList,
        isShow: {
          display: 'none'
        },
        role: 'all'
      }
    )
  }
  getMyDocuments() {
    this.props.myEAGet()
    this.setState({
      data: this.props.documentsList,
      isShow: {
        display: 'inline'
      },
      role: 'my'
    })
  }
  resolve(status) {
    let text
    switch (status) {
      case 0:
        text = '未审批'
        break
      case 1:
        text = '审批完成'
        break
      default:
        text = '审批不通过'
    }
    return text
  }
  jumpToEdit(id) {
    this.props.push('edit/' + id)
  }
  jumpToApproval(item) {
    if (item.status === 0) {
      this.props.push('approval/' + item.id)
    } else {
      return null
    }
  }
  render() {
    return (
      <div className='home-container'>
        <Header title='首页' buttonName='' {...this.props} />
        <div>
          <button onClick={this.getAllDocuments} className='btn'>单据申请</button>
          <button onClick={this.getMyDocuments} className='btn'>我的单据</button>
        </div>
        <ul className='ea-items'>
          {this.state.data.map(item => {
            return (
              <li>
                <a className='ea-item' onClick={this.state.role === 'all' ? () => { this.jumpToEdit(item.id) } : () => { this.jumpToApproval(item) }}>
                  <span>{item.name}</span>
                  <span style={this.state.isShow} className='status'>{this.resolve(item.status)}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
