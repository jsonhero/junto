import { connect } from 'react-redux'

import * as c from 'store/features/authentication/constants'




function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (action) => {
      dispatch(Object.assign({
        type: c.LOGIN_REQUEST
      }, action))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(require('./Login').default)
