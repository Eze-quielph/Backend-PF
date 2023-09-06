const app = require("./app/src/app");
const { sequelize } = require("./app/src/db");
require("dotenv").config();

const { client } = require("./app/src/Services/Redis/redis.config");

const PORT = process.env.PORT ?? 3001;

const DataService = require("./app/src/Services/LoadDb");
const { songs, users } = require("./app/src/Services/data");
const dataService = new DataService(songs, users);

app.listen(PORT, () => {
  sequelize.sync({ force: true }).then(async () => {
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    dataService.initialDate().catch((error) => {
      console.log(error);
    });
  });
  console.log(`Listening on port ${PORT}`);
});
