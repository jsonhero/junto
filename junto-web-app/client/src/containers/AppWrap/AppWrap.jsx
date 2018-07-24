import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'

import './style.scss'

class AppWrap extends React.Component {

  handleLogout = () => {
    this.props.logout()
  }

  render() {
    return (
      <div>
        <AppBar
          title='Homepage'
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem
                primaryText="Logout"
                onClick={this.handleLogout}/>
            </IconMenu>
          }
          />
        <div className='container'>
          { this.props.children }
        </div>
      </div>
    )
  }
}


export default AppWrap
