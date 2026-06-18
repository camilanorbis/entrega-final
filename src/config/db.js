import mongoose from "mongoose"
import { logger } from "../utils/logger.js"

export const connectDB = async(url,dbName) => {
    try {
        await mongoose.connect(url,{dbName})
        logger.info({ msg: "Mongoose connected" })
    } catch (error){
        logger.error({ msg: "Unable to connect mongoose" })
        throw error
    }
}