import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findOrderAndSpecificShipmentBySellerThunk } from "../../services/orders-thunks";
import Shipment from "./Shipment";

const ReceivedShipments = () => {

    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.ordersData)
    const { profile } = useSelector(state => state.user);

    const existingOrders = orders && orders.length > 0

    useEffect(() => {
        dispatch(findOrderAndSpecificShipmentBySellerThunk(profile.username))
    }, [])

    return (<div>
        {!existingOrders && <div>No orders found!</div>}
        {existingOrders && orders && orders
            .map(order => order.shipments
                .filter(shipment => shipment.seller_username === profile.username)
                .map(shipment => <Shipment shipment={shipment} order={order} />)
            )
        }
    </div>);
}

export default ReceivedShipments;
