import React from 'react'
import {Router, Route} from 'react-router'
import Home from 'modules/pages/home'
import Intl from 'i18n/intl'

const Edit = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/pages/edit'))
  }, 'Edit')
}
const Approval = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/pages/approval'))
  }, 'approval')
}
const ApprovalResult = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/pages/approvalResult'))
  }, 'approvalResult')
}

const routes = history => (
  <Router history={history}>
    <Route component={Intl}>
      <Route path='/' component={Home} />
      <Route path='/edit/:id' getComponent={Edit} />
      <Route path='/approval/:id' getComponent={Approval} />
      <Route path='/approvalResult/:id/:tag' getComponent={ApprovalResult} />
    </Route>
  </Router>
)

export default routes
