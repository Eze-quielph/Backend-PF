const { createClient } = require("redis");
const {promisify} = require('util')

const {REDIS_URL} = process.env

const client = createClient({
  url: REDIS_URL,
});

const GET_ASYNC = promisify(client.get).bind(client)
const SET_ASYNC = promisify(client.set).bind(client)

module.exports = { client, GET_ASYNC, SET_ASYNC };
