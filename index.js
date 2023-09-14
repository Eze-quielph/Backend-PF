const { app, server } = require("./src/app"); // Importa el servidor y la instancia de Express desde app.js
const { client } = require("./src/Services/Redis/redis.config");
const DataService = require("./src/Services/LoadDb");
const { songs, users } = require("./src/Services/data");
const mailer = require("./src/Services/nodemailer/Mailer");

const sequelize  = require("./src/sequelize"); // Importa la instancia de Sequelize

const PORT = process.env.PORT ?? 3001;

sequelize
  .sync({ alter: true }) // Sincroniza los modelos con la base de datos
  .then(() => {
    console.log("Modelos sincronizados con la base de datos.");

    server.listen(PORT, async () => {
      client.on("error", (err) => console.log("Redis Client Error", err));

      await client.connect();

      const dataService = new DataService(songs, users);
      await dataService.initialDate().catch((error) => console.log(error));
      await mailer.initialMain().catch((error) => console.log(error));

      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al configurar Sequelize:", error);
  });
