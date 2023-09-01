const { createClient } = require("redis");
const {promisify} = require('util')

const client = createClient({
  url: "redis://default:DNSm69MPUGptpSXRc2UK@containers-us-west-166.railway.app:6801",
});

const GET_ASYNC = promisify(client.get).bind(client)
const SET_ASYNC = promisify(client.set).bind(client)

module.exports = { client, GET_ASYNC, SET_ASYNC };
