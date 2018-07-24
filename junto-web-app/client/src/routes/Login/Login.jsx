import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: ''
    }
  }

  handleLogin = () => {
    const { username, password } = this.state
    this.props.login({
      username,
      password,
    })
  }

  render() {


     return (
       <div>
         <div className='login-container'>
           <div className='login-wrap'>
             <h3>Header</h3>
             <TextField
               value={this.state.username}
               floatingLabelText='Username'
               fullWidth={true}
               onChange={(e) => this.setState({ username: e.target.value })}/>
             <TextField
               value={this.state.password}
               floatingLabelText='Password'
               fullWidth={true}
               onChange={(e) => this.setState({ password: e.target.value })}/>
             <RaisedButton
               primary={true}
               label="Login"
               onClick={this.handleLogin}
               fullWidth={true} />
           </div>
         </div>
       </div>
     )
   }
}


export default Login;
