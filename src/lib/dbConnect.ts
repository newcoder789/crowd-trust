import * as mongoose from "mongoose"; 

type ConnectionObject = {
    isConnected?:number
}

const connection: ConnectionObject = {}

// in javascript what we meant from void is *mujhe frak nhi pdata* ki kis trike ka data back a rha thao
async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Database is already connected.")
        console.log(mongoose.models)
        return 
    }
    
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
        // consod le.log(db); try this for educational purpose 
        connection.isConnected = db.connections[0].readyState;
        console.log("Database is Connected successfully.")
    } catch (error) {
        console.log("Database connection is failed.")
        console.log("Error:", error);
        // gracefully disconnect
    }
}


export default dbConnect;