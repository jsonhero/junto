import React from 'react'

import DashItem from '../DashItem'

class DashRow extends React.Component {
  constructor() {
    super()
    this.state = {
      itemsPerRow: 3
    }
  }

  RowItems() {
    const { itemsPerRow, data } = this.props

    return data.reduce((a, b, i) => {
      console.log(a, 'a')
      let index = Math.floor(i / (itemsPerRow || this.state.itemsPerRow))
      if (!a[index]) {
        a[index] = []
      }
      a[index].push(<DashItem {...b} />)
      return a;
    }, []).map(row => {
      return (
        <div className='row'>
          {row}
        </div>
      )
    })


  }

  render() {
    return (
      <div>
        {this.RowItems()}
      </div>
    )
  }
}

export default DashRow
