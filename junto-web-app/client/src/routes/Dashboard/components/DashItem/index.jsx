import React from 'react'

import './style.scss'

class DashItem extends React.Component {
  render() {
    const { name } = this.props
    return (
      <div className='col-xs'>
        <div className='dash-item'>
          <div className='dash-name'>
            {name}
          </div>
        </div>
      </div>
    )
  }
}

export default DashItem
