import React from 'react'
import './index.scss'
import Search from '@material-ui/icons/Search'
import * as components from '../../external/index'

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
        <img src={item.RenderCMA.getThumbnail()} />
        <figcaption>{item.RenderCMA.getName()}</figcaption>
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

const PopinHeader = ({ onChangeHandler } = {}) => {
  return (
    <div className="editor__popin__content__header">
      <h2>Choose a widget</h2>
      <SearchInput onChangeHandler={onChangeHandler} />
    </div>
  )
}

const PopinFooter = ({ onCloseButton, onAddComponent, selectedItem } = {}) => {
  return (
    <div className="editor__popin__content__footer">
      <button onClick={onCloseButton}>cancelar</button>
      <button onClick={onAddComponent.bind(this, selectedItem)}>adicionar</button>
    </div>
  )
}

const PopinSection = ({ components, onItemClick, selectedItem } = {}) => {
  return (
    <div className="editor__popin__content__section">
      {components.map((c, i) => (
        <PopinItem
          key={i}
          item={c}
          selected={selectedItem && c === selectedItem}
          onClickHandler={onItemClick.bind(this, c)}
        />))}
    </div>
  )
}

const Popin = ({ onChangeHandler, selectedItem, onItemClick, onCloseButton, onAddComponent, components } = {}) => {
  return (
    <div className="editor__popin">
      <div className="editor__popin__content">
        <PopinHeader onChangeHandler={onChangeHandler} />
        <PopinSection
          components={components}
          selectedItem={selectedItem}
          onItemClick={onItemClick} />
        <PopinFooter
          selectedItem={selectedItem}
          onCloseButton={onCloseButton}
          onAddComponent={onAddComponent} />
      </div>
    </div>
  )
}

const AddedComponents = ({ components, onRemoveClick } = {}) => {
  return (
    components.map((Component, i) => (
      <div key={i} className="editor__component">
        (<span onClick={onRemoveClick.bind(this, i)}>remove</span>)
        {<Component.RenderCMA />}
      </div>
    ))
  )
}

export default class Editor extends React.Component {
  state = {
    searchTerm: '',
    showPopin: false,
    selectedItem: null,
    addedComponents: []
  }

  searchOnChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  togglePopin() {
    this.setState({
      selectedItem: null,
      showPopin: !this.state.showPopin
    })
  }

  addComponent(component) {
    this.setState({
      addedComponents: [...this.state.addedComponents, component]
    })
    this.togglePopin()
  }

  removeComponent(index) {
    const updateComponents = this.state.addedComponents.filter((c, i) => i !== index)
    this.setState({
      addedComponents: updateComponents
    })
  }

  itemOnClick(item) {
    this.setState({
      selectedItem: item
    })
  }

  getComponents() {
    if (this.state.searchTerm.length === 0)
      return components.default

    return components.default.filter((c) => {
      if (c.RenderCMA.getName().toLocaleLowerCase().indexOf(this.state.searchTerm.toLocaleLowerCase()) >= 0) {
        return c
      }
      return false
    })
  }

  render() {
    return (
      <div className="editor">
        <AddedComponents
          components={this.state.addedComponents}
          onRemoveClick={this.removeComponent.bind(this)} />

        <AddButton onClickHandler={this.togglePopin.bind(this)} />

        {this.state.showPopin &&
          <Popin
            components={this.getComponents()}
            selectedItem={this.state.selectedItem}
            onChangeHandler={this.searchOnChange.bind(this)}
            onItemClick={this.itemOnClick.bind(this)}
            onCloseButton={this.togglePopin.bind(this)}
            onAddComponent={this.addComponent.bind(this)}
          />
        }
      </div>
    )
  }
}
