import { connect } from 'react-redux'
import { LOGOUT } from 'store/features/authentication/constants'

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch({
        type: LOGOUT
      })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(require('./AppWrap').default)
