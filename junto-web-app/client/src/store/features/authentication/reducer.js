import * as c from './constants'


export default (state = {
  token: '',
  error: '',
  pendingAuthentication: false,
}, action) => {
  switch (action.type) {
    case c.LOGIN_SUCCESS:
      return Object.assign({}, state, { token: action.token })
    case c.LOGIN_FAILURE:
      return Object.assign({}, state, { error: action.error})
    case c.AUTH_CHECK:
      return Object.assign({}, state, { pendingAuthentication: true})
    case c.AUTH_FAILURE:
      return Object.assign({}, state, { pendingAuthentication: false})
    case c.AUTH_SUCCESS:
        return Object.assign({}, state, { pendingAuthentication: false})
    default:
      return state;
  }
}
