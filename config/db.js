import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.DB);
        console.log(`DB connected !`);

    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

export default connectDB;