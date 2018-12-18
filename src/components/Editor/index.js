import React from 'react'
import './index.scss'
import Search from '@material-ui/icons/Search'
import { components } from '../../data/components'

const SearchInput = ({ onChangeHandler } = {}) => {
  return (
    <span className="editor__popin__search">
      <label htmlFor="popin-search"><Search /></label>
      <input id="popin-search" onChange={onChangeHandler} />
    </span>
  )
}

const PopinItem = ({ item, selected, onClickHandler} = {}) => {
  const classNames = 'editor__popin__item ' + (selected ? ' editor__popin__item--selected' : '');

  return (
    <div className={classNames} onClick={onClickHandler.bind(this, item.id)}>
      <figure>
        <img src={item.thumbnail} />
        <figcaption>{item.name}</figcaption>
      </figure>
    </div>
  )
}

export default class Editor extends React.Component {
  state = {
    searchTerm: '',
    showPopin: true,
    itemSelected: null
  }

  searchOnChange(e) {
    this.setState({ searchTerm: e.target.value })
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

  getComponents() {
    if (this.state.searchTerm.length === 0)
      return components
    return components.filter((c) => c.name.toLocaleLowerCase().indexOf(this.state.searchTerm.toLocaleLowerCase()) >= 0)
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
                <h2>Choose a widget</h2>
                <SearchInput onChangeHandler={this.searchOnChange.bind(this)} />
              </div>
              <div className="editor__popin__content__section">
                {this.getComponents().map((c, i) => (
                  <PopinItem
                    key={i}
                    item={c}
                    selected={c.id === this.state.itemSelected}
                    onClickHandler={this.itemOnClick.bind(this)}
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
