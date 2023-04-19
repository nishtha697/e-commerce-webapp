import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsThunk} from "../../services/products-thunks";
import {
    cancelAllShipmentsThunk,
    findOrderAndSpecificShipmentBySellerThunk,
    findOrdersByBuyerUsernameThunk
} from "../../services/orders-thunks";
import Shipment from "./Shipment";
import {Button, Collapse} from "antd";

const {Panel} = Collapse;

const Order = () => {

    const dispatch = useDispatch();
    const {orders} = useSelector(state => state.ordersData)
    const {type, profile} = useSelector(state => state.user);

    useEffect(() => {
        debugger
        dispatch(getAllProductsThunk())
        if (type === "buyer") {
            dispatch(findOrdersByBuyerUsernameThunk(profile.username))
        } else if (type === "seller") {
            dispatch(findOrderAndSpecificShipmentBySellerThunk(profile.username))
        }
    }, [])

    const existingOrders = orders && orders.length > 0

    const handleCancelOrder = (order) => {
        dispatch(cancelAllShipmentsThunk(order.order_id))
    }
    return (
        <div>
            {!existingOrders && <div>No orders found!</div>}
            {existingOrders && <Collapse defaultActiveKey={['1']} >
                    {orders && orders.map(order =>
                                              <Panel header={
                                                  <div className="d-flex flex-row justify-content-between w-100">
                                                      Order #{order.order_id}
                                                      <Button type="primary" style={{ backgroundColor: "coral", color: "white" }}
                                                              onClick={() => handleCancelOrder(order)}
                                                      >
                                                          Cancel Order
                                                      </Button>
                                                  </div>} key="1">
                                                  {order.shipments.map(
                                                      shipment => <Shipment shipment={shipment}
                                                                            order={order}/>)}
                                              </Panel>)
                    }
                </Collapse>
            }
        </div>)

}

export default Order;