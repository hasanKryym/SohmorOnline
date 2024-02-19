require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");

// middleware
const authenticate = require("./middleware/authentication");

// routers
const authRouter = require("./routes/auth");
const shopsRouter = require("./routes/shop");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const cors = require("cors");
const corsOptions = {
  // origin: 'http://localhost:3000',
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
// extra packages

// routes
app.use("/auth", authRouter);
app.use("/shops", shopsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    console.log("connecting");
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
