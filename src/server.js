const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let songs = [];


app.get('/songs', (req, res) => {
  try {
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/songs', (req, res) => {
  try {
    const { title } = req.body;
    const newSong = { id: Date.now().toString(), title };
    songs.push(newSong);
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/songs/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const song = songs.find((s) => s.id === id);
    if (!song) {
      res.status(404).json({ message: 'Song not found' });
    } else {
      song.title = title;
      res.json(song);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/songs/:id', (req, res) => {
  try {
    const { id } = req.params;
    const songIndex = songs.findIndex((s) => s.id === id);
    if (songIndex === -1) {
      res.status(404).json({ message: 'Song not found' });
    } else {
      const deletedSong = songs.splice(songIndex, 1)[0];
      res.json(deletedSong);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});