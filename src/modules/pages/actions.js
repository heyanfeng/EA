import {createAction} from 'redux-actions'
import * as T from './actionTypes'
import axios from 'axios'

export let EAGet = createAction(T.EA_GET,
  () => axios.get('/api/v0.1/documents')
)

export let myEAGet = createAction(T.EA_GET,
  () => axios.get('/api/v0.1/myDocuments')
)

export let EAAdd = createAction(T.EA_ADD,
  (data) => axios.post('/api/v0.1/myDocuments', data)
)

export let EAModify = createAction(T.EA_ADD,
  (data) => axios.put('/api/v0.1/myDocuments/' + data.id, data)
)
