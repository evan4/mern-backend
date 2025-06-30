import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL)
  .then(()=>{
    console.log("Connected to MongoDB");
  })
  .catch(()=>{

    console.log("Couldn't connect to MongoDB", process.env.DB_URL);
  });
}
