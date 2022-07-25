import mongoose from "mongoose";


const mongodbConnect = async ()  => {
    try{
        const dbUrl = process.env.DB_URL;
        const connection = await mongoose.connect(dbUrl,{useNewUrlParser:true});
        return connection;
    }catch(error){
        throw error;
    }
}

export default mongodbConnect;