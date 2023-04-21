import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Collapse, Tag } from "antd";
import styled from "styled-components";
import { getAllProductsThunk } from "../../services/products-thunks";
import { cancelAllShipmentsThunk, findOrderAndSpecificShipmentBySellerThunk, findOrdersByBuyerUsernameThunk } from "../../services/orders-thunks";
import Shipment from "./Shipment";

const CustomPanel = styled(Collapse.Panel)`
    .ant-collapse-header{
        background: bisque;
    }
`

const Order = () => {

    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.ordersData)
    const { type, profile } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllProductsThunk())
        if (type === "buyer") dispatch(findOrdersByBuyerUsernameThunk(profile.username))
        else if (type === "seller") dispatch(findOrderAndSpecificShipmentBySellerThunk(profile.username))
    }, [])

    const existingOrders = orders && orders.length > 0

    const getOrderStatus = (shipments) => {
        const shipmentStatus = shipments.map(shipment => shipment.shipmentStatusLog[shipment.shipmentStatusLog.length - 1].status)
        if (shipmentStatus.every(value => value === 'Cancelled')) return 'Cancelled'
        else if (shipmentStatus.every(value => value === 'Placed')) return 'Placed'
        else if (shipmentStatus.every(value => value === 'In-Transit')) return 'In-Transit'
        else if (shipmentStatus.every(value => value === 'Delivered')) return 'Complete'
        else return 'Processing'
    }

    const handleCancelOrder = (order) => {
        dispatch(cancelAllShipmentsThunk(order.order_id))
    }

    return (
        <div>
            {!existingOrders && <div>No orders found!</div>}
            {existingOrders && orders.map((order, idx) => {
                const orderStatus = getOrderStatus(order.shipments)
                return < Collapse className="mb-3" >
                    <CustomPanel
                        key={idx}
                        header={
                            <div className="d-flex flex-row justify-content-between w-100">
                                <b>Order #{order.order_id}</b>
                                <b>Placed on: {new Date(order.orderDate).toLocaleString()}</b>
                                <Tag style={{ background: 'coral', color: 'white', display: 'flex', alignItems: 'center' }}>{orderStatus}</Tag>
                            </div>
                        }
                    >
                        {!['Complete', 'Cancelled'].includes(orderStatus) &&
                            <div className="d-flex flex-row justify-content-end mb-3">
                                <Button danger type="primary" onClick={() => handleCancelOrder(order)} >
                                    Cancel Order
                                </Button>
                            </div>
                        }
                        {order.shipments.map(shipment => <Shipment shipment={shipment} order={order} showOrderDets={false} />)}
                    </CustomPanel>
                </Collapse>
            })}
        </div >)
}

export default Order;