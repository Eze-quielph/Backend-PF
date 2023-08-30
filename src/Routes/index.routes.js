const songRouter = require('./Song.routes')
const  mainRouter = require('express').Router()

mainRouter.use('/song', songRouter)

module.exports = mainRouter