const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Server running. API port: ${PORT}. Database connection successful`
      );
    })
  )
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
