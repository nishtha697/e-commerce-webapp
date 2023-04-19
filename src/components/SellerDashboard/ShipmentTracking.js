import React from "react";
import Shipment from "../OrderShipments/Shipment";
import { useSelector } from "react-redux";

const ShipmentTracking = () => {

    const ordersForSeller = [{
        "order_id": 1681859928,
        "buyer_username": "nishthgos",
        "shippingAddress": {
            "address1": "Boylston St",
            "address2": "Apt 123",
            "city": "Boston",
            "state": "MA",
            "zipcode": "02215",
            "incareof": "Sample User"
        },
        "totalPrice": 140,
        "paymentMethod": "Cash on Delievery",
        "orderDate": "1681859924",
        "shipments": [
            {
                "shipmentId": 1,
                "seller_username": "agaam650",
                "shipmentTotal": 2345,
                "products": [
                    {
                        "product_id": 10567,
                        "quantity": 2,
                        "pricePerUnit": 68.4
                    }
                ],
                "shipmentStatusLog": [
                    {
                        "status": "Placed",
                        "date": 1681859924
                    },
                    {
                        "status": "In-Transit",
                        "date": 1680579842
                    }
                ]
            },
            {
                "shipmentId": 2,
                "seller_username": "shoor292",
                "shipmentTotal": 1234,
                "products": [
                    {
                        "product_id": 10582,
                        "quantity": 1,
                        "pricePerUnit": 70
                    },
                    {
                        "product_id": 10454,
                        "quantity": 2,
                        "pricePerUnit": 79.9
                    },
                    {
                        "product_id": 10953,
                        "quantity": 1,
                        "pricePerUnit": 246.9
                    }
                ],
                "shipmentStatusLog": [
                    {
                        "status": "Placed",
                        "date": 1681859924
                    },
                    {
                        "status": "In-Transit",
                        "date": 1680493442
                    },
                    {
                        "status": "Delivered",
                        "date": 1680839042
                    }
                ]
            }
        ]
    }, {
        "order_id": 1681859928,
        "buyer_username": "nishthgos",
        "shippingAddress": {
            "address1": "Boylston St",
            "address2": "Apt 123",
            "city": "Boston",
            "state": "MA",
            "zipcode": "02215",
            "incareof": "Sample User"
        },
        "totalPrice": 140,
        "paymentMethod": "Cash on Delievery",
        "orderDate": "1681859924",
        "shipments": [
            {
                "shipmentId": 1,
                "seller_username": "agaam650",
                "shipmentTotal": 2345,
                "products": [
                    {
                        "product_id": 10567,
                        "quantity": 2,
                        "pricePerUnit": 68.4
                    }
                ],
                "shipmentStatusLog": [
                    {
                        "status": "Placed",
                        "date": 1681859924
                    },
                    {
                        "status": "In-Transit",
                        "date": 1680579842
                    }
                ]
            },
            {
                "shipmentId": 2,
                "seller_username": "shoor292",
                "shipmentTotal": 1234,
                "products": [
                    {
                        "product_id": 10582,
                        "quantity": 1,
                        "pricePerUnit": 70
                    },
                    {
                        "product_id": 10454,
                        "quantity": 2,
                        "pricePerUnit": 79.9
                    },
                    {
                        "product_id": 10953,
                        "quantity": 1,
                        "pricePerUnit": 246.9
                    }
                ],
                "shipmentStatusLog": [
                    {
                        "status": "Placed",
                        "date": 1681859924
                    },
                    {
                        "status": "In-Transit",
                        "date": 1680493442
                    },
                    {
                        "status": "Delivered",
                        "date": 1680839042
                    }
                ]
            }
        ]
    }]

    const { profile } = useSelector(state => state.user)

    return (
        <div>
            <div>
                {ordersForSeller.map(order => {
                    const shipments = order.shipments.filter(shipment => shipment.seller_username === profile.username)
                    return shipments.map(shipment => < Shipment order={order} shipment={shipment} />)
                })}
            </div>
        </div>)

}

export default ShipmentTracking;