import React from 'react'
import './index.scss'
import { components } from '../../data/components';

const PopinItem = ({ item, selected, clickHandler} = {}) => {
  const classNames = 'editor__popin__item ' + (selected ? ' editor__popin__item--selected' : '');

  return (
    <div className={classNames} onClick={clickHandler.bind(this, item.id)}>
      <figure>
        <img src={item.thumbnail} />
        <figcaption>{item.name}</figcaption>
      </figure>
    </div>
  )
}

export default class Editor extends React.Component {
  state = {
    showPopin: true,
    itemSelected: null
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

  itemOnClick(id) {
    this.setState({
      itemSelected: id
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
                <h2>Choose a widget:</h2>
              </div>
              <div className="editor__popin__content__section">
                {components.map((c, i) => (
                  <PopinItem
                    key={i}
                    item={c}
                    selected={c.id === this.state.itemSelected}
                    clickHandler={this.itemOnClick.bind(this)}
                  />))}
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
