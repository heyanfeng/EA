import { handleActions } from 'redux-actions'
import * as T from './actionTypes'

const initialState = {
  loading: true,
  error: false,
  items: []
}

export const documentsList = handleActions({
  [`${T.EA_GET}_PENDING`](state, action) {
    return {
      ...state,
      loading: true,
      error: false
    }
  },
  [T.EA_GET]: {
    next(state, action) {
      // handle success
      console.log(action)
      return {
        ...state,
        loading: false,
        error: false,
        items: action.payload.data
      }
    },
    throw(state, action) {
      // handle error
      return {
        ...state,
        loading: false,
        error: true
      }
    }
  }
}, initialState)
