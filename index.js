const app = require("./src/app");
const { sequelize } = require("./src/db");
require("dotenv").config();

const PORT = process.env.PORT ?? 3001;

const DataService = require("./src/Services/LoadDb");
const { songs, users } = require("./src/Services/data");
const dataService = new DataService(songs, users);


app.listen(PORT, () => {
  sequelize.sync({ alter: true }).then(() => {
    dataService.initialDate().catch((error) => {
      console.log(error);
    });
  });
  console.log(`Listening on port ${PORT}`);
});
