const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Mongo Connected :- ${con.connection.host} ${con.connection.name}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnect;
