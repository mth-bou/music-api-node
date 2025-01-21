const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const FILE_PATH = './data/musics.json';

const getMusics = () => {
  try {
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
  } catch (error) {
    console.error('Error reading file: ', error);
    return [];
  }
}

const saveMusics = (musics) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(musics, null, 2));
}

const addMusic = (music) => {
  const musics = getMusics();
  music.id = uuidv4();
  musics.push(music);
  saveMusics(musics);
  return music;
}

const getMusicById = (id) => getMusics().find((music) => music.id === id);

const updateMusic = (id, updatedMusic) => {
  let musics = getMusics();
  const index = musics.findIndex((music) => music.id === id);
  if (index !== -1) {
    musics[index] = { ...musics[index], ...updatedMusic };
    saveMusics(musics);
    return musics[index];
  }

  return null;
}

const deleteMusic = (id) => {
  let musics = getMusics();
  const newMusics = musics.filter((music) => music.id !== id);
  if (musics.length !== newMusics.length) {
    saveMusics(newMusics);
    return true;
  }

  return false;
}

module.exports = { getMusics, addMusic, getMusicById, updateMusic, deleteMusic };
