import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSong } from '../redux/songsSlice';

const AddSongForm = () => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSong({ title }));
    setTitle('');
    navigate('/');
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '600px' }}>
      <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '16px' }}>Add Song</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter song title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            padding: '8px',
            fontSize: '16px',
            marginBottom: '16px',
          }}
        />
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
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSongForm;