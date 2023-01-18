# NFT monitoring app

Main goal: monitor the price of a collection of NFTs

<h3>Server</h3>
The server application is responsible for saving the details of a NFT collection in a database. Data comes from querying the OpenSea marketplace API at 15 minute intervals. Also, the application will receive from the mobile client a collection for which the price will be queried at an interval of 1 minute previously with the new price, and if the new price has scaled down by 10%, the customer will be notified by SMS.

<h3>Client</h3>
It is implemented with React Native and ExpoGo app on the mobile. The application will send the NFT collection to which we want to monitor its minimum price. The collection name sent will be monitored once every 1 minute, and in case the new price is 10% lower than the previous one, the customer will be notified by SMS.

<h3>Monitor</h3>
It is a WEB application, which allows viewing the details of saved NFT collections. These details will be displayed and can be edited (values changed/deleted).


<br>
All three applications communicate through REST services, based on JSON.
