import mongoose from "mongoose"

export const connectDB = async(url,dbName) => {
    try {
        await mongoose.connect(url,{dbName})
        logger.info({ msg: '~ init ~ mongoose.connected' })
    } catch (error){
        next(error)
    }
}