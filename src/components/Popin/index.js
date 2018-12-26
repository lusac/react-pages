import React from 'react'
import './index.scss'
import Search from '@material-ui/icons/Search'

const SearchInput = ({ onChangeHandler } = {}) => {
  return (
    <span className="editor__popin__search">
      <label htmlFor="popin-search"><Search /></label>
      <input id="popin-search" onChange={onChangeHandler} />
    </span>
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

const PopinFooter = ({ onCloseButton, onAddComponent, selectedItem } = {}) => {
  return (
    <div className="editor__popin__content__footer">
      <button onClick={onCloseButton}>cancelar</button>
      <button onClick={onAddComponent.bind(this, selectedItem)}>adicionar</button>
    </div>
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

export default Popin;
