import React from 'react'
import axios from 'axios'
import Header from '../../shared/header/header'

export default class Index extends React.Component {
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
  render() {
    let tag = location.hash.split('/')[3].split('?')[0]
    return (
      <div className='approval-container'>
        <Header title='审批结果' buttonName='首页' {...this.props} />
        <p className='approval-title'>{this.state.data.name}</p>
        <p className='approval-result'>单据审批{tag === '0' ? '不通过' : '通过'}</p>
      </div>
    )
  }
}
