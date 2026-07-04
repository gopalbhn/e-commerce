import mongoose from "mongoose";


const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        if(conn.STATES.connected){
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        }
    }catch(error: any){
        console.log("Error: ", error.message);
    }
}


export default connectDB;