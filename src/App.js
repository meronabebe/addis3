import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import store from './redux/store';
import SongList from './components/SongList';
import AddSongForm from './components/AddSongForm';
import EditSongForm from './components/EditSongForm';


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<SongList />} />
            <Route path="/add" element={<AddSongForm />} />
            <Route path="/edit/:id" element={<EditSongForm />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;