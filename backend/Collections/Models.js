const mongoose = require('mongoose');
const { Schema } = mongoose;
const collectionSchema = new Schema({
    floorPrice: String,
    averagePrice: String,
    totalSupply: String,
    numOwners: String,
    totalVolume: String,
    sevenDaySales: String,
    name: String,
    date: { type: Date, default: Date.now},
    imageSource: String
})

const Collection = mongoose.model('Collection', collectionSchema)
module.exports = Collection