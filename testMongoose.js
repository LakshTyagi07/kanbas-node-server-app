   // testMongoose.js
   import mongoose from 'mongoose';

   const uri = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"; // Use your connection string

   async function run() {
     try {
       // Connect to MongoDB
       await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
       console.log("Connected to MongoDB!");

       // Test the connection by fetching a document from a collection
       const UserModel = mongoose.model('User', new mongoose.Schema({ name: String })); // Replace with your schema
       const user = await UserModel.findOne({});
       if (user) {
         console.log("User found:", user);
       } else {
         console.log("No users found in the collection.");
       }
     } catch (error) {
       console.error("Error connecting to MongoDB:", error);
     } finally {
       // Close the connection
       await mongoose.connection.close();
     }
   }

   run().catch(console.error);