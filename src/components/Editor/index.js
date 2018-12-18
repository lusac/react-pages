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

const AddButton = ({ onClickHandler } = {}) => {
  return (
    <div className="editor__add" onClick={onClickHandler}>
      + adicionar
    </div>
  )
}

const Header = ({ onChangeHandler } = {}) => {
  return (
    <div className="editor__popin__content__header">
      <h2>Choose a widget</h2>
      <SearchInput onChangeHandler={onChangeHandler} />
    </div>
  )
}

const Footer = ({ onCloseButton } = {}) => {
  return (
    <div className="editor__popin__content__footer">
      <button onClick={onCloseButton}>cancelar</button>
      <button>adicionar</button>
    </div>
  )
}

const Section = ({ components, onItemClick, selectedItem } = {}) => {
  return (
    <div className="editor__popin__content__section">
      {components.map((c, i) => (
        <PopinItem
          key={i}
          item={c}
          selected={c.id === selectedItem}
          onClickHandler={onItemClick.bind(this)}
        />))}
    </div>
  )
}

export default class Editor extends React.Component {
  state = {
    searchTerm: '',
    showPopin: false,
    selectedItem: null
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
      selectedItem: id
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
        <AddButton onClickHandler={this.openPopin.bind(this)} />

        {this.state.showPopin &&
          <div className="editor__popin">
            <div className="editor__popin__content">
              <Header onChangeHandler={this.searchOnChange.bind(this)} />
              <Section
                components={this.getComponents()}
                selectedItem={this.state.selectedItem}
                onItemClick={this.itemOnClick.bind(this)} />
              <Footer onCloseButton={this.closePopin.bind(this)} />
            </div>
          </div>
        }
      </div>
    )
  }
}
