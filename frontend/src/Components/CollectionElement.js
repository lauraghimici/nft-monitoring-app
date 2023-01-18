import React, {useEffect, useState} from "react";
import Container from "./Modal/Container";
import "../CSS/Card.css";
import ".//Modal/style.css";
import {format} from "date-fns";

export default function CollectionElement(collectionElement) {
    const deleteItem = async (event) => {
        event.preventDefault(event);
        const elementId = collectionElement._id;
        const response = await fetch(
            `http://localhost:4000/api/collections/nft-delete/`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    id: elementId,
                }),
            }
        );
        window.location.reload();
    };


    const updateItem = async (event) => {
        event.preventDefault(event);
        const response = await fetch(
            "http://localhost:4000/api/collections/nft-update",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    id: collectionElement._id,
                    floorPrice: event.target.floorPrice.value,
                    totalSupply: event.target.totalSupply.value,
                    numOwners:event.target.numOwners.value,
                    sevenDaySales:event.target.sevenDaySales.value,
                    totalVolume:event.target.totalVolume.value,

                }),
            }
        );
        window.location.reload();
    };


    return(
    <div className="body_for_card">
            <div className="card">
                <div className="card__head">

                    <div className="card__product-img">
                        <img src={collectionElement.imageSource} alt='NFT image'/>
                        </div>
                </div>
                <div className="card__body">
                        <h3 className="card__title">{collectionElement.name}</h3>
                    <p className="card__text">
                        Total supply: {collectionElement.totalSupply} <br/>
                        Num owners: {collectionElement.numOwners} <br/>
                        Seven day sales: {collectionElement.sevenDaySales} <br/>
                        Total Volume: {collectionElement.totalVolume}
                    </p>
                    <div className="wrapper">
                        <div className="card__price">
                                <span>Floor Price: {collectionElement.floorPrice}</span>
                        </div>

                    </div>
                </div>

                <div className="card__footer">
                    <div className="card__date">

                        <span>Date: {formatDate(collectionElement.date)} </span>
                    </div>
                </div>
                <div className="buttons">
                        <Container triggerText={"Update"} onSubmit={updateItem} />
                    <button className="btn btn-delete" onClick={deleteItem}>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
    </div>
        );

}

export const formatDate = (date: Date | String) => {
    if (!date) {
        return '';
    }
    return format(new Date(date.toString()), 'd MMMM yyyy, hh:mm');
};