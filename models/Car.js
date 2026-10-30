const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    name:{
        type:String
    },

    isElectric:{
        type: Boolean
    }
    
},{timestamps: true})

const Car = mongoose.model('Car',carSchema)

module.exports = Car