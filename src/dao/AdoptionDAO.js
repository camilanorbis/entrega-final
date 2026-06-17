import AdoptionModel from '../model/adoption.model.js'

export default class AdoptionDAO {
    
    async createAdoption (newAdoption) {
        return await AdoptionModel.create(newAdoption)
    }

    async getAdoptions () {
        return await AdoptionModel.find()
    }

    async getAdoptionByFilter (filter) {
        return await AdoptionModel.findOne(filter).lean()
    }

    async modifyAdoption (id, update) {
        return await AdoptionModel.updateOne({ _id: id }, update )
    }

    async deleteAdoption (id) {
        return await AdoptionModel.deleteOne({ _id: id })
    }
    
}