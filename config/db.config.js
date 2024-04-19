const mongoose = require("mongoose");

const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;


// creo bd ficticia de mongo
MongoMemoryServer.create()
  .then((mongoServer) => mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    dbName: "express-day-2",
    useCreateIndex: true,
    useUnifiedTopology: true
  }))
  .then(() =>
    console.info(`Successfully connected to the database`)
  )
  .catch((error) => {
    console.error("An error occurred trying to connect to the database", error);
    process.exit(1);
  });


// Cierre de BD
process.on("SIGINT", () => {
  mongoose
    .disconnect()
    .then(() => {
      console.info("Successfully disconected mongodb");
      process.exit(0);
    })
    .catch((error) => {
      console.error("An error ocurred trying to disconect mongoose", error);
      process.exit(1);
    });
});