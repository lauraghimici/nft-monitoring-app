const collectionModel= require('./Models')

const collectionService={
    createRecord:(collection,success,fail)=>{
        collectionModel.create(collection)
            .then(data=>success(data))
            .catch(error=>fail(error))
    },
    readRecords:(collection,success,fail)=>{
        collectionModel.find(collection)
            .then(data=>success(data))
            .catch(error=>fail(error))
    },
    updateRecord:(collectionId,collectionFloorPrice,collectionTotalSupply,collectionNumOwners,collectionSevenDaySales,collectionTotalVolume,success,fail)=>{
        collectionModel.findByIdAndUpdate(collectionId,{"floorPrice":collectionFloorPrice,"totalSupply":collectionTotalSupply,"numOwners":collectionNumOwners,"sevenDaySales":collectionSevenDaySales,"totalVolume":collectionTotalVolume})
            .then(data=>success(data))
            .catch(error=>fail(error))

    },
    deleteRecord:(collectionId,success,fail)=>{
        collectionModel.findByIdAndDelete(collectionId)
            .then(data=>success(data))
            .catch(error=>fail(error))

    },
    startMonitoring: (collectionName, success, fail) => {
        collectionModel.findOne(collectionName)
            .then(data => success(data))
            .catch(error => fail(error))
    },

}
module.exports=collectionService