const express = require("express");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/task");

//Db Connection
dbConnect();

const app = new express();

//Body Parser
app.use(express.json());

// Router Mounting
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening at Port No :${PORT}`);
});
