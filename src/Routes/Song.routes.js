const songRouter = require('express').Router();
const multer = require('multer')
const {SongsHandler} = require('../Handlers/index.handlers')

const songsHandler = new SongsHandler();

const upload = multer({ dest: 'uploads/' });


songRouter.get('/', songsHandler.getSong) //Get All || Username
songRouter.get('/:id', songsHandler.getById) //Get by Id
songRouter.put('/:id', upload.single('file'), songsHandler.updateSong) // name | description | genre | artist | image

module.exports = songRouter 