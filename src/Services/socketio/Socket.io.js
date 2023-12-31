const { Server } = require("socket.io");
const Chat = require("../../Models/Models/Chat.model");

class LiveChat {
  constructor(http) {
    this.io = new Server(http, {
      cors: {
        origin: "http://localhost:5173",
      },
      /*  cors:{
                origin:"https://spoot-front-andrewsando.vercel.app"
              }  */
    });
    this.io.on("connection", (socket) => {
      socket.on("userConnected", async ()=>{
        const chat = await this.getThreeDaysChat()

        socket.emit("chats", chat)
      })
      socket.on("NewMessage", (data) => {
        socket.broadcast.emit("message", data);

        this.saveMessage(data)
          .then((result) => {
            console.info(result);
          })
          .catch((err) => console.log(err));
      });
    });
  }

  async saveMessage(data) {
    try {
      const chat = new Chat({
        username: data.from,
        data: data.body,
      });
      const result = await chat.save();
      console.info("Mensaje guardado correctamente:", result);
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
    }
  }
  

  async getThreeDaysChat() {
    const day = new Date();
    day.setDate(day.getDate() - 3);

    try {
      const chats = await Chat.find({
        timestamp: { $gte: day },
      }).sort({ timestamp: 1 });
      console.info(chats)
     
      return chats;
    } catch (err) {
      console.error("Error al obtener chats:", err);
      return [];
    }
  }
}

module.exports = LiveChat;
