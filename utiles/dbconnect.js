import mongoose from "mongoose";
          

const connection={};

async function dbconnect(){
    if(connection.isConnected)
    {
        return;
    }
    const db=await mongoose.connect("mongodb+srv://okba:vjm816OU9K4kBgau@cluster0.0plbrrg.mongodb.net/",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    connection.isConnected=db.connections[0].readystate;

      
      
}
export default dbconnect