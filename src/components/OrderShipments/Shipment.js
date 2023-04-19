import React from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Collapse, Select, Tag, Timeline } from 'antd';

const Shipment = ({ order, shipment, showOrderDets }) => {

    const { allProducts } = useSelector(state => state.productsData)
    const allStatus = ['Placed', 'In-Transit', 'Delivered', 'Cancelled']

    const getFormattedDate = (timestamp) => {
        const date = new Date(timestamp);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const getPendingStatus = (log) => {
        let orderStatuses = log.map(entry => entry.status)
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

    return (
        <Collapse className="mb-3">
            <Collapse.Panel header={
                <div className="d-flex flex-row justify-content-between w-100">
                    {showOrderDets && <div>{`Order #${order.order_id}`}</div>}
                    <div>
                        <Tag className="bg-dark text-white">{getMostRecentStatus(shipment.shipmentStatusLog)}</Tag>
                        {`Shipment #${shipment.shipmentId}`}
                    </div>
                </div>
            }>

                {shipment.products.map(orderProduct => {
                    const product = allProducts.find(product => product.product_id === orderProduct.product_id)
                    return (
                        <div className="row border-bottom pt-2 pb-2">
                            <div className="col-lg-1 col-md-2 col-sm-3 d-flex flex-row justify-content-end">
                                <img src={product.product_image} style={{ width: "auto", height: "80px", maxWidth: "100%" }} alt="" />
                            </div>
                            <div className="col-lg-11 col-md-10 col-sm-9">
                                <Link to={`/products/${product.product_id}`}> {product.title} </Link>
                                <div><b>Qty:</b> {orderProduct.quantity}</div>
                                <div><b>Price/Unit:</b> ${orderProduct.pricePerUnit}</div>
                            </div>
                        </div>
                    )

                })}

                <div className="mt-3">
                    {showOrderDets &&
                        <div className="mb-2"><b>Shipping to: </b> {displayAddress(order.shippingAddress)} </div>
                    }
                    <div>
                        <div className="mb-2"><b>Status History:</b></div>
                        <Timeline items={getShipmentStatusTimeline(shipment.shipmentStatusLog)} />
                    </div>
                    {showOrderDets &&
                        <div>
                            <b>Update Shipment Status: &nbsp; &nbsp;</b>
                            <Select style={{ width: '200px' }}>
                                {allStatus.map(status => (
                                    <Select.Option value={status} disabled={!getPendingStatus(shipment.shipmentStatusLog).includes(status)}> {status} </Select.Option>
                                ))}
                            </Select>
                        </div>
                    }
                </div>

            </Collapse.Panel>
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
