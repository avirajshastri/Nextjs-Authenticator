import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!) //"!" ka meaning MongoURI undefined ya null ni hogi kbhi, skip the type warning
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDb connected successfully");
        })

        connection.on('error', (err)=>{
            console.log('MongoDB connection error, Error',err)
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong, Error",error)
    }
}