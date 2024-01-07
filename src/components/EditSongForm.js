import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSong } from '../redux/songsSlice';

const EditSongForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  const songs = useSelector((state) => state.songs);
  const song = songs.find((song) => song.id === id);

  if (!song) {
    return <div>Song not found</div>;
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateSong({ id, title }));
    navigate('/');
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '600px' }}>
      <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '16px' }}>Edit Song</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Title:
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              marginBottom: '16px',
            }}
          />
        </label>

        <button
          type="submit"
          style={{
            display: 'block',
            width: '100%',
            padding: '8px',
            fontSize: '16px',
            color: '#fff',
            background: '#2980b9',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Update Song
        </button>
      </form>
    </div>
  );
};

export default EditSongForm;