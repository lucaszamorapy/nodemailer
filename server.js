const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const sequelize = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(8082, () => {
  console.log("Server is running on port 8082");
});

sequelize.sync({ force: false }).then(() => {
  console.log("Database and tables created");
});
