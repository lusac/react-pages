import React from 'react'
import './index.scss'
import Popin from '../Popin'
import * as components from '../../external/index'

const AddButton = ({ onClickHandler } = {}) => {
  return (
    <div className="editor__add" onClick={onClickHandler}>
      + adicionar
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
