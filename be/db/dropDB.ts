import mongoose from "mongoose";

async function dropDatabase() {
  try {
    await mongoose.connect("mongodb://mongo:27017/travolta");
    await mongoose.connection.db.dropDatabase();

    console.log("Database travolta dropped successfully.");
  } catch (error) {
    console.error(`Error dropping database: ${error}`);
  } finally {
    await mongoose.connection.close();
  }
}

dropDatabase();
