import { combineReducers } from 'redux'

import authentication from './features/authentication/reducer'

const rootReducer = combineReducers({
  authentication
})


export default rootReducer;
