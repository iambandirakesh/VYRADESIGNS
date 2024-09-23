import mongoose from "mongoose";
const ConnectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    const { connection } = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log(`Connected to Database ${connection.host} `);
    } else {
      throw new Error("Connection Failed");
    }
  } catch (err) {
    console.log("Error connecting to Database", err);
  }
};
export default ConnectDB;
