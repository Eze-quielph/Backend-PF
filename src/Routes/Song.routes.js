const songRouter = require('express').Router();

//Middleware
const validateInputMiddleware = require('../Middleware/songs.Middleware/getName.middleware')
const validateIdMiddleware = require('../Middleware/songs.Middleware/GetId.middleware')
const validatePutMiddleware = require('../Middleware/songs.Middleware/Put.middleware')
const validatePostMiddlewae = require('../Middleware/songs.Middleware/Post.middleware')

//Handler
const {SongsHandler} = require('../Handlers/index.handlers')
const songsHandler = new SongsHandler();

//Files
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

//Routes
songRouter.get('/', songsHandler.getSong) //GET All
songRouter.get('/name', validateInputMiddleware, songsHandler.getByName) // GET by Name
songRouter.get('/:id', validateIdMiddleware, songsHandler.getById) //GET by Id
songRouter.put('/:id', upload.single('file'), validatePutMiddleware, songsHandler.updateSong) // name | description | genre | artist | image
songRouter.post('/post',  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'sound', maxCount: 1 }]), validatePostMiddlewae, songsHandler.postSound) // name | description | genre | artist | image | sound

module.exports = songRouter 