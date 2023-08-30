const songRouter = require('express').Router();
const {SongsHandler} = require('../Handlers/index.handlers')

const songsHandler = new SongsHandler();

songRouter.get('/', songsHandler.getSong) //Get All || Username
songRouter.get('/:id', songsHandler.getById) //Get by Id
songRouter.put('/:id', songsHandler.updateSong)

module.exports = songRouter 