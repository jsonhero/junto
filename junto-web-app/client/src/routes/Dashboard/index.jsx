import React from 'react'

import config from './config'

import DashMenu from './components/DashMenu'

class Dashboard extends React.Component {

  render() {
    return (
      <div className='dashboard'>
        <DashMenu itemsPerRow={3} data={config}/>
      </div>
    )
  }
}

export default Dashboard
