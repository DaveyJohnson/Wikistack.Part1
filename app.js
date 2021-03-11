const express = require('express');
const morgan = require('morgan');
const path = require('path');
const views = require('./views');
const { db, Page, User } = require('./models');
const wikiRoutes = require("./routes/wiki")
const userRoutes = require("./routes/users")

db.authenticate().then(() => {
  console.log('connected to the database');
});

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/wiki", wikiRoutes);
// app.use("/users", userRoutes);

app.get('/', (req, res, next) => {
  res.redirect("/wiki");
});

const PORT = 3000;
const init = async () => {
  await db.sync();

  app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}!`);
  });
};

init();
