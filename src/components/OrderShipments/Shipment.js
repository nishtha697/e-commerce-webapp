import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Collapse, Select, Tag, Timeline } from 'antd';
import { toast } from "react-toastify";
import styled from "styled-components";
import { sellerByUsernameThunk } from "../../services/seller-thunks";
import { updateOrderShipmentStatusThunk } from "../../services/orders-thunks";

const CustomPanel = styled(Collapse.Panel)`
    .ant-collapse-header{
        background: lightyellow !important;
    }
`

const Shipment = ({ order, shipment, showOrderDets }) => {

    const dispatch = useDispatch();
    const { allProducts } = useSelector(state => state.productsData)
    const { type } = useSelector(state => state.user);
    const [seller, setSeller] = useState(null);

    const allStatus = ['Placed', 'In-Transit', 'Delivered', 'Cancelled']

    useEffect(() => {
        dispatch(sellerByUsernameThunk({ username: shipment.seller_username }))
            .then((result) => setSeller(result.payload))
            .catch((error) => console.error(error));
    }, [dispatch, shipment]);

    const getFormattedDate = (timestamp) => {
        const date = new Date(timestamp);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const getPendingStatus = (log) => {
        let orderStatuses = log.map(entry => entry.status)
        if (orderStatuses.includes('Cancelled')) return null
        if (orderStatuses.includes('Delivered')) return null
        return allStatus.filter(status => !orderStatuses.includes(status))
    }

    const getShipmentStatusTimeline = (log) => {
        const total = log.length
        return log.map((entry, idx) => ({
            children: <p> {entry.status} on <i>{getFormattedDate(entry.date)}</i></p>,
            color: idx + 1 === total ? 'green' : 'blue'
        }))
    }

    const getMostRecentStatus = (log) => {
        const total = log.length
        return log[total - 1].status
    }

    const displayAddress = (addressObj) => {
        let address = ''
        if (addressObj.incareof) { address = `${addressObj.incareof}, ` }
        if (addressObj.address1) { address = `${address} ${addressObj.address1}, ` }
        if (addressObj.address2) { address = `${address} ${addressObj.address2}, ` }
        if (addressObj.city) { address = `${address} ${addressObj.city}, ` }
        if (addressObj.state) { address = `${address} ${addressObj.state}, U.S.` }
        if (addressObj.zipcode) { address = `${address} - ${addressObj.zipcode}` }
        return address
    }

    const handleCancelShipment = () => {
        dispatch(updateOrderShipmentStatusThunk({ orderId: order.order_id, shipmentId: shipment.shipmentId, status: "Cancelled" }))
        toast.success('Shipment ' + shipment.shipmentId + ' cancelled successfully! :)', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const getShipmentStatus = (shipment) => {
        const shipmentStatus = shipment.shipmentStatusLog[shipment.shipmentStatusLog.length - 1].status
        if (shipmentStatus === 'Cancelled') return 'Cancelled'
        else if (shipmentStatus === 'Placed') return 'Placed'
        else if (shipmentStatus === 'In-Transit') return 'In-Transit'
        else if (shipmentStatus === 'Delivered') return 'Complete'
        else return ''
    }

    return (
        <Collapse className="mb-3">
            <CustomPanel header={
                <div className="d-flex flex-row justify-content-between w-100">
                    {showOrderDets && <div ><b className="pe-10">{`Order #${order.order_id}  `}</b><div>Placed on: <b>{new Date(order.orderDate).toLocaleString()}</b></div></div>}
                    <div>
                        <Tag style={{ background: "darkorange" }} className="text-white ">{getMostRecentStatus(shipment.shipmentStatusLog)}</Tag>
                        {`Shipment #${shipment.shipmentId}`}
                    </div>
                </div>
            }>
                {shipment.products.map(orderProduct => {
                    const product = allProducts.find(product => product.product_id === orderProduct.product_id)
                    return (
                        <>
                            {product && <div className="row border-bottom pt-2 pb-2">
                                <div className="col-lg-1 col-md-2 col-sm-3 d-flex flex-row justify-content-end">
                                    <img src={product.product_image} style={{ width: "auto", height: "80px", maxWidth: "100%" }} alt="" />
                                </div>
                                <div className="col-lg-11 col-md-10 col-sm-9">
                                    <Link to={`/products/${product.product_id}`}> {product.title} </Link>
                                    <div><b>Qty:</b> {orderProduct.quantity}</div>
                                    <div><b>Price/Unit:</b> ${orderProduct.pricePerUnit}</div>
                                </div>
                            </div>}</>
                    )
                })}
                <div className="mt-2">
                    {showOrderDets &&
                        <div className="mb-2"><b>Shipping to: </b> {displayAddress(order.shippingAddress)} </div>
                    }
                    {type === "buyer" && seller &&
                        <div className="mb-2"><b>Seller: </b> {seller.name} </div>
                    }
                    <div>
                        <div className="mb-2"><b>Status History:</b></div>
                        <Timeline items={getShipmentStatusTimeline(shipment.shipmentStatusLog)} />
                    </div>
                    {type === "seller" && showOrderDets && getPendingStatus(shipment.shipmentStatusLog) &&
                        <div>
                            <b>Update Shipment Status: &nbsp; &nbsp;</b>
                            <Select
                                style={{ width: '200px' }}
                                onSelect={(e) => dispatch(updateOrderShipmentStatusThunk({ orderId: order.order_id, shipmentId: shipment.shipmentId, status: e }))}
                            >
                                {allStatus
                                    .map(status => (
                                        <Select.Option value={status} disabled={!getPendingStatus(shipment.shipmentStatusLog).includes(status)}> {status} </Select.Option>
                                    ))}
                            </Select>
                        </div>
                    }
                    {type === "buyer" && ['Placed'].includes(getShipmentStatus(shipment)) &&
                        <Button type="primary" onClick={handleCancelShipment} style={{ backgroundColor: "coral", color: "white" }} >
                            Cancel Shipment
                        </Button>
                    }
                </div>
            </CustomPanel>
        </Collapse>
    )

}
Shipment.defaultProps = {
    showOrderDets: true
};

Shipment.propTypes = {
    order: PropTypes.object.isRequired,
    shipment: PropTypes.object.isRequired,
    showOrderDets: PropTypes.bool
};


export default Shipment;
