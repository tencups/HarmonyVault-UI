import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { deleteArtist, getArtist } from "../api/ArtistService"

const ArtistDetail = ({ updateArtist, updateImage, getAllArtists }) => {

    const inputRef = useRef();
    const navigate = useNavigate();
    const [artist, setArtist] = useState({
        id: '',
        name: '',
        genre: '',
        country: '',
        biography: '',
        photoUrl: '',
    });

    const { id } = useParams();


    const fetchArtist = async (id) => {
        try {
            const { data } = await getArtist(id);
            setArtist(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const selectImage = () => {
        inputRef.current.click(); // when button is clicked, the invisible form will be triggered
    }

    const updatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await updateImage(formData);
            setArtist((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}` }));
        } catch (error) {
            console.log(error)
        }

    }

    const onChange = event => {
        setArtist({ ...artist, [event.target.name]: event.target.value });
    }

    const onUpdateArtist = async (event) => {

        if (!artist.genre) {
            artist.genre = "ROCK";
        }
        event.preventDefault();
        await updateArtist(artist)
        fetchArtist(id);

    }


    const handleDelete = async (event) => {

        try {
            await deleteArtist(artist.id)
            console.log('Artist deleted successfully');
            getAllArtists();
            navigate('/');
        } catch (error) {
            console.error('Error deleting artist:', error);
        }
    };


    useEffect(() => {
        fetchArtist(id);
    }, [])

    return (
        <>
            <Link to={'/artists'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
            <div className='profile'>
                <div className='profile__details'>
                    <img src={artist.photoUrl} alt={`Profile photo of ${artist.name}`} />
                    <div className='profile__metadata'>
                        <p className="proifle__name">{artist.name}</p>
                        <p className="proifle__muted">JPG, GIF, or PNG. Max size of 10MG</p>
                        <button onClick={selectImage} className='btn'><i className="bi bi-cloud-upload"></i>Change Photo</button>
                    </div>
                </div>
                <div className='profile__settings'>

                    <div>
                        <form onSubmit={onUpdateArtist} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={artist.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input type="text" value={artist.name} onChange={onChange} name="name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Genre</span>
                                    <select value={artist.genre} onChange={onChange} name="genre" required>
                                        <option value="ROCK">Rock</option>
                                        <option value="POP">Pop</option>
                                        <option value="JAZZ">Jazz</option>
                                        <option value="CLASSICAL">Classical</option>
                                        <option value="HIP HOP">Hip Hop</option>
                                        <option value="ELECTRONIC">Electronic</option>
                                        <option value="COUNTRY">Country</option>
                                        <option value="BLUES">Blues</option>
                                        <option value="REGGAE">Reggae</option>
                                        <option value="METAL">Metal</option>
                                        <option value="NOISE">Noise</option>
                                    </select>
                                </div>

                                <div className="input-box">
                                    <span className="details">Country</span>
                                    <input type="text" value={artist.country} onChange={onChange} name="country" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Biography</span>
                                    <input type="text" value={artist.biography} onChange={onChange} name="biography" required />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type="submit" className="btn">Save</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => updatePhoto(event.target.files[0])} name='file' accept='image/*' />
            </form>
        </>
    )
}

export default ArtistDetail