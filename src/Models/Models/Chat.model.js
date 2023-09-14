const {mongoose} = require("../../mongose");

const chats = new mongoose.Schema({
    username: String,
    data: String,
    timestamp: { type: Date, default: Date.now, index: true, },
})

const Chat = mongoose.model("chat", chats)

module.exports = Chat