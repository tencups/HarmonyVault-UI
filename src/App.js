import { useEffect, useState, useRef } from 'react';
import './App.css';
import { getArtists, saveArtist, updatePhoto } from "./api/ArtistService"
import ArtistList from "./components/ArtistList"
import Header from "./components/Header"
import ArtistDetail from "./components/ArtistDetail"
import { Routes, Route, Navigate } from "react-router-dom"

function App() {

  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: '',
    genre: '',
    country: '',
    biography: '',
  });

  const onChange = event => {
    // event.target.name -> binds to name="" property
    setValues({ ...values, [event.target.name]: event.target.value });
    //console.log(values);
  }

  const getAllArtists = async (page = 0, size = 2) => {
    try {
      setCurrentPage(page);
      const { data } = await getArtists(page, size);
      setData(data);
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNewArtist = async (event) => {
    event.preventDefault();

    if (!values.genre) {
      values.genre = "ROCK"; // Ensure default value is set before submission
    }
    try {
      const { data } = await saveArtist(values);

      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', data.id);
      const { data: photoUrl } = await updatePhoto(formData); // rename the object u destructure
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: '',
        genre: '',
        country: '',
        biography: ''
      })
      getAllArtists();

    } catch (error) {
      console.log(error)
    }

  }

  const updateArtist = async (artist) => {
    try {
      const { data } = await saveArtist(artist);
      getAllArtists();
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await updatePhoto(formData);
      getAllArtists();
      console.log(photoUrl)
    } catch (error) {
      console.log(error)
    }

  }

  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllArtists();
  }, [])

  return (
    <>
      <Header toggleModal={toggleModal} numOfArtists={data.totalElements} />
      <main className="main">
        <div className='container'>
          <Routes>
            <Route path="/" element={<Navigate to={'/artists'} />} />
            <Route path="/artists" element={<ArtistList data={data} currentPage={currentPage} getAllArtists={getAllArtists} />} />
            <Route path="/artists/:id" element={<ArtistDetail updateArtist={updateArtist} updateImage={updateImage} getAllArtists={getAllArtists} />} />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Artist</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewArtist}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Genre</span>
                <select value={values.genre} onChange={onChange} name="genre" required>
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
                <input type="text" value={values.country} onChange={onChange} name='country' required />
              </div>
              <div className="input-box">
                <span className="details">Biography</span>
                <input type="text" value={values.biography} onChange={onChange} name='biography' required />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default App;
