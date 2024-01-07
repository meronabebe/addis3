import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSongs, deleteSong } from '../redux/songsSlice';

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSong(id));
    }
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '600px' }}>
      <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '16px' }}>Song List</h1>
      <table style={{ borderSpacing: '8px', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ background: '#333', color: '#fff', padding: '8px' }}>Title</th>
            <th style={{ background: '#333', color: '#fff', padding: '8px' }}>Edit</th>
            <th style={{ background: '#333', color: '#fff', padding: '8px' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td style={{ padding: '8px', background: '#f5f5f5' }}>{song.title || ''}</td>
              <td style={{ padding: '8px', background: '#f5f5f5' }}>
                <Link to={`/edit/${song.id}`} style={{ color: 'green', textDecoration: 'none' }}>
                  Edit
                </Link>
              </td>
              <td style={{ padding: '8px', background: '#f5f5f5' }}>
                <button
                  onClick={() => handleDelete(song.id)}
                  style={{
                    color: '#fff',
                    background: '#e74c3c',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to="/add"
        style={{
          marginTop: '16px',
          display: 'block',
          textAlign: 'center',
          color: '#fff',
          background: '#2980b9',
          padding: '8px',
          textDecoration: 'none',
          borderRadius: '4px',
        }}
      >
        Add Song
      </Link>
    </div>
  );
};

export default SongList;