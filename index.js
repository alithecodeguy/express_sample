const express = require("express");
const app = express();
const routes = require("./router/itemroutes");

//Set up Middleware and Routes
app.use(express.json());
app.use(routes);

//Port
const PORT = process.env.PORT || 2090;

app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
