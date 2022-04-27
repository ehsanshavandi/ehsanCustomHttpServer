// getting-started.js
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  if (process.env.NODE_ENV === "dev") console.log(`connected to mongodb`);
});

module.exports = db;
