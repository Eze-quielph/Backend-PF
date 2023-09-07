require("dotenv").config();

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  native: false,
});

module.exports = { sequelize };


// Define relaciones y sincroniza los modelos aquí
const User  = require("./src/Models/Users.model");
const Song  = require("./src/Models/Songs.model");
const Playlist = require("./src/Models/Playlists.model");

User.belongsToMany(Song, { through: "user_song" });
Song.belongsTo(User, { through: "user_song" });
User.belongsToMany(Playlist, { through: "playlist_user" });
Playlist.belongsTo(User, { through: "playlist_user" });
Song.belongsToMany(Playlist, { through: "song_playlist" });
Playlist.belongsToMany(Song, { through: "song_playlist" });

const app = require("./src/app");
const { client } = require("./src/Services/Redis/redis.config");

 const mailer = require('./src/Services/nodemailer/Mailer');

const PORT = process.env.PORT ?? 3001;

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxito.");
    return sequelize.sync({force:true}); 
  })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos.");

    // Resto de la lógica de la aplicación
    const DataService = require("./src/Services/LoadDb");
    const { songs, users } = require("./src/Services/data");
    const dataService = new DataService(songs, users);
    
    app.listen(PORT, async () => {
      client.on("error", (err) => console.log("Redis Client Error", err));
      await client.connect();
      dataService.initialDate().catch((error) => {
        console.log(error);
      });
      // Utiliza mailer aquí si está configurado
       mailer.initialMain().catch((error) => console.log(error));
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al configurar Sequelize:", error);
  });

