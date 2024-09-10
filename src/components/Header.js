import React from 'react'

const Header = ({ toggleModal, numOfArtists}) => {
  return (
    <header className='header'>
      <div className='container'>
          <h3>Artist List ({numOfArtists})</h3>
          <button onClick={() => toggleModal(true)} className='btn'>
            <i className='bi bi-plus-square'></i>Add New Artist
          </button>
      </div>
    </header>
  )
}

export default Header