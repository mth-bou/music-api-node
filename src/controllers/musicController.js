const musicModel = require('../models/musicModel');

const getAllMusics = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(musicModel.getMusics()));
}

const getMusic = (req, res, id) => {
  const music = musicModel.getMusicById(id);
  if (music) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(music));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Music not found' }));
  }
}

const createMusic = (req, res, body) => {
  const newMusic = musicModel.addMusic(JSON.parse(body));
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newMusic));
}

const updateMusic = (req, res, id, body) => {
  const updatedMusic = musicModel.addMusic(id, JSON.parse(body));
  if (updatedMusic) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updatedMusic));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Music not found' }));
  }
}

const deleteMusic = (req, res, id) => {
  if (musicModel.deleteMusic(id)) {
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Music deleted' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Music not found' }));
  }
}

module.exports = { getAllMusics, getMusic, createMusic, updateMusic, deleteMusic };
