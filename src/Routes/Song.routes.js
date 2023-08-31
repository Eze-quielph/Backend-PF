const songRouter = require('express').Router();
const multer = require('multer')

//Middleware
const validateInputMiddleware = require('../Middleware/songs.Middleware/getName.middleware')
const validateIdMiddleware = require('../Middleware/songs.Middleware/GetId.middleware')
const validatePutMiddleware = require('../Middleware/songs.Middleware/Put.middleware')

const {SongsHandler} = require('../Handlers/index.handlers')
const songsHandler = new SongsHandler();

const upload = multer({ dest: 'uploads/' });

songRouter.get('/', songsHandler.getSong) //GET All
songRouter.get('/name', validateInputMiddleware, songsHandler.getByName) // GET by Name
songRouter.get('/:id', validateIdMiddleware, songsHandler.getById) //GET by Id
songRouter.put('/:id', upload.single('file'), validatePutMiddleware, songsHandler.updateSong) // name | description | genre | artist | image
songRouter.post('/post',  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'sound', maxCount: 1 }]), songsHandler.postSound) // name | description | genre | artist | image | sound

module.exports = songRouter 