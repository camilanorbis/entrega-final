import { Schema, model } from "mongoose"
import validator from "validator"

const adoptionSchema = new Schema({
    document: {
        type: String,
        required: true,
        unique: true
    },
    completeName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (valor) => { return validator.isEmail(valor) },          
            message: "Email is not valid"
        }
    },
    age: {
        type: Number
    },
    petType: {
        type: String,
        required: true
    },
    petPatent: {
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    petAge: {
        type: Number
    },
    adoptionDate: {
        type: Date,
        required: true
    }
})

const AdoptionModel = model("Adoption", adoptionSchema)

export default AdoptionModel