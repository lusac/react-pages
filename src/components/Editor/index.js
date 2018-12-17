import React from 'react'
import './index.scss'

export default class Editor extends React.Component {
  state = {
    showPopin: false
  }

  openPopin() {
    this.setState({
      showPopin: true
    })
  }

  closePopin() {
    this.setState({
      showPopin: false
    })
  }

  render() {
    return (
      <div>
        <div className="editor" onClick={this.openPopin.bind(this)}>
          + adicionar
        </div>

        {this.state.showPopin &&
          <div className="editor__popin">
            <div className="editor__popin__content">
              <div className="editor__popin__content__header">
                <h2>Escolha um componente:</h2>
              </div>
              <div className="editor__popin__content__section">
                <p>components...</p>
              </div>
              <div className="editor__popin__content__footer">
                <button onClick={this.closePopin.bind(this)}>cancelar</button>
                <button>adicionar</button>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
