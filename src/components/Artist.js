import React from 'react'
import { Link } from 'react-router-dom'

const Artist = ({artist}) => {
  return (
    <Link to={`/artists/${artist.id}`} className="artist__item">
            <div className="artist__header">
                <div className="artist__image">
                    <img src={artist.photoUrl} alt={artist.name}  />
                </div>
                <div className="artist__details">
                    <p className="artist_name">{artist.name.substring(0, 15)} </p>
                </div>
            </div>
            <div className="artist__body">
                <p><i className="bi bi-geo-alt fs-5 text-primary"></i> {artist.country}</p>
                <p><i className="bi bi-music-note fs-5 text-success"></i> {artist.genre}</p>
                <p><i className="bi bi-pencil fs-5 text-info"></i> {artist.biography}</p>
            </div>
    </Link>
  )
}

export default Artist