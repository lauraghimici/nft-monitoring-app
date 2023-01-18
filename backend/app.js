const cron = require('node-cron')
const sdk= require('api')('@opensea/v1.0#bg4ikl1mk428b')
const express = require('express')
const mongoose= require('mongoose')
const collectionRouter = require("./Collections/Controller");
const app = express()
const collectionModel= require('./Collections/Models')

let sid='AC8ef3d5eb901723e93fca336f8b3b20b5';
let auth = '3af25dbf5fbbbf116b6b081c89f2f740';
var twilio = require("twilio")(sid,auth);

require('dotenv').config()

function saveCollectionStats(slug){
    sdk.retrievingCollectionStats({collection_slug: slug})
        .then(res => {console.log(res)
           let result={};
            result.floorPrice=res.stats.floor_price;
            result.averagePrice=res.stats.average_price;
            result.totalSupply=res.stats.total_supply;
            result.numOwners=res.stats.num_owners;
            result.totalVolume=res.stats.total_volume;
            result.sevenDaySales=res.stats.seven_day_sales;
            if(slug==='doodles-official') {
                result.name = "Doodles";
                result.imageSource="https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=3840"
            }
            else if(slug==='valhalla') {
                result.name = "Valhalla";
                result.imageSource="https://i.seadn.io/gcs/files/d7936464d55988206c1b16c6929856f6.jpg?auto=format&w=3840";
            }
            else {
                result.name = "Lil Pudgys";
                result.imageSource="https://i.seadn.io/gae/s4Td3KYsUlCblO6lQKAGAWdKwsCuumcxYpebM_YL-Pex-BP886JYAWjKBLeB5StNopAAD6kVx3QHqWm9AmudXyCaCZszHbt8SdteEQ?auto=format&w=3840";
            }
            console.log("Saved in db")
            collectionModel.create(result)
                .then(status=>console.log(status))
                .catch(err=>console.log(err))
        })
        .catch(err => console.error(err))
}
let floorPriceEveryMinute;

const readData = (slug) => {
    sdk.retrievingCollectionStats({collection_slug: slug})
        .then(res => {
            floorPriceEveryMinute = res.stats.floor_price;
        })
        .catch(err => console.error(err));

}

const fetchData=()=>{

saveCollectionStats("doodles-official");
saveCollectionStats("valhalla");
saveCollectionStats("lilpudgys");

}
function getSlug(name){
    switch (name){
        case 'Doodles':{
        return 'doodles-official'
        }
        case 'Valhalla':{
            return 'valhalla'
        }
        case 'Lil Pudgys':{
            return 'lilpudgys'
        }
        default:{
            return 'not-found'
        }

    }
}


const sendNotification = (triggerValue) => {
    if (floorPriceEveryMinute < triggerValue) {
        console.log("e bine!!!!!!")
       twilio.messages.create({
            from:"+18597651525",
            to: "+40742684541",
            body: "The price of the collection has scaled down by 10%"
        })
            .then((res)=> console.log("SMS sent"))
            .catch((err)=>{console.log(err)})
    }
    else {
        console.log("The price is not changed.")
    }
}

const startServer =()=>{
    app.listen(4000,()=>console.log('server started'))
}
const startDatabase=()=>{
    mongoose.connect('mongodb://localhost:27017',()=>console.log('database started'))
}
const initRoutes = () => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');
        next();
    });
    app.use(express.json());
    app.use('/api/collections',collectionRouter);
}
const startApp=()=>{
    startServer()
    startDatabase()
    initRoutes()
}
startApp()
//modif la 10 sec
//cron.schedule('*/10 * * * * *',fetchData,{});
cron.schedule('*/15 * * * *',fetchData,{});

    collectionRouter.post("/start", (req) => {
    let selectedName = req.body.name;
    let selectedSlug =getSlug(selectedName)
    console.log(selectedSlug)
    readData(selectedSlug);
        const getNewPriceTrigger=()=> {
            collectionModel
                .find({name: selectedName})
                .sort({date: -1})
                .then((result) => {
                    let triggerValue = result[0].floorPrice - 0.1 * result[0].floorPrice;
                    sendNotification(triggerValue);
                }).catch((err) => {
                console.log(err)
            })
        }
        cron.schedule('*/10 * * * * *', getNewPriceTrigger, {});

    })
