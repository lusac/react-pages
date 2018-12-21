import React from 'react'

export default class RenderCMA extends React.Component {
  static getName() {
    return 'Custom Box'
  }

  static getThumbnail() {
    return 'https://via.placeholder.com/200x150'
  }

  render() {
    return (
      <div>box render cma</div>
    )
  }
}
