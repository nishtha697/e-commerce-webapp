import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySellerThunk } from "../../services/products-thunks.js";
import { Table, Tag } from 'antd';
import { Link } from "react-router-dom";

const ProductListings = () => {

    const dispatch = useDispatch();

    const { profile } = useSelector(state => state.user)
    const { products, loading } = useSelector(state => state.productsData)

    useEffect(() => {
        if (profile && profile.username) {
            dispatch(getProductBySellerThunk(profile.username))
        }
    }, [])

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product_image',
            key: 'product_image',
            width: "7.5%",
            ellipsis: true,
            render: (_, { product_image }) => (
                <img src={product_image} style={{ width: "auto", height: "100%", maxWidth: "100%" }} />
            ),
        },
        {
            title: 'Id',
            dataIndex: 'product_id',
            key: 'product_id',
            width: "7.5%",
            ellipsis: true,
            align: 'center',
            sorter: (a, b) => a.product_id - b.product_id,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: "40%",
            ellipsis: true,
            render: (title, record) => (
                <Link to={`/products/${record.product_id}`} style={{ whiteSpace: 'normal', textDecoration: "none" }} >
                    {title}
                </Link>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: "10%",
            ellipsis: true,
            align: 'center',
            render: (_, { price }) => <span>${price}</span>,
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Inventory',
            dataIndex: 'inventory',
            key: 'inventory',
            width: "10%",
            ellipsis: true,
            align: 'center',
            sorter: (a, b) => a.inventory - b.inventory,
        },
        {
            title: 'Total Orders',
            dataIndex: 'numorders',
            key: 'numorders',
            width: "10%",
            ellipsis: true,
            align: 'center',
            sorter: (a, b) => a.numorders - b.numorders,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: "25%",
            render: (_, { category }) => (
                <>
                    {category.map((tag, idx) => <Tag color="green" key={idx}> {tag.toUpperCase()} </Tag>)}
                </>
            ),
        },
    ];

    return (
        <div className="m-5">
            {loading ? <li className="list-group-item"> Loading... </li> :
                <Table columns={columns} dataSource={products} />}
        </div>
    );
}

export default ProductListings;