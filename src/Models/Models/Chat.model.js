const {mongoose} = require("../../mongose");

const chats = new mongoose.Schema({
    username: String,
    data: String,
    timestamp: { type: Date, default: Date.now },
})

const Chat = mongoose.model("chat", chats)

module.exports = Chat