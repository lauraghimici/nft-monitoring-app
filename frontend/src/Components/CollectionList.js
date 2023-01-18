import React, { useState, useEffect } from "react";
import CollectionElement from "./CollectionElement";
export default function CollectionList(){
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/api/collections/nft-read", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                setData(data);
            });
    }, []);



    data.forEach(element => {
        console.log(element)
        //element.date = format(element.date, "MMMM do, yyyy H:mma")
    });
        return (
            <div>
                {data.map((element) => (
                    //console.log(element.averagePrice)
                    <CollectionElement key={element._id } {...element}/>
                ))}
            </div>
        );

}
