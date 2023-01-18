const express = require('express');
const collectionService= require('./Services');

const collectionRouter = express.Router();

collectionRouter.route('/nft-create').post(createCollection);
collectionRouter.route('/nft-read').get(readCollections);
collectionRouter.route('/nft-update').put(updateCollection);
collectionRouter.route('/nft-delete').delete(deleteCollection);
collectionRouter.route('/start').get(startMonitor);

function startMonitor(request, response) {
    const value =request.body;
    collectionService.startMonitoring(
        value,
        data=> response.status(201).json(data),
        error=> response.status(400).json(error),
    );
}

function createCollection(request,response){
    const value = request.body;
    collectionService.createRecord(
        value,
        data=>response.status(201).json(data),
        error=>response.status(400).json(error),
    );
}

function readCollections(request,response){
    const value = request.body;
    collectionService.readRecords(
        value,
        data=>response.status(201).json(data),
        error=>response.status(400).json(error),
    );
}
function updateCollection(request,response){
    const value = request.body;
    console.log(value)
    collectionService.updateRecord(
        value.id,
        value.floorPrice,
        value.totalSupply,
        value.numOwners,
        value.sevenDaySales,
        value.totalVolume,
        data=>response.status(201).json(data),
        error=>response.status(400).json(error),
    );
}
function deleteCollection(request,response){
    const value = request.body;
    collectionService.deleteRecord(
        value.id,
        data=>response.status(201).json(data),
        error=>response.status(400).json(error),

    );
}
module.exports=collectionRouter;