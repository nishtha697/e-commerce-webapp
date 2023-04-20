import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProductBySellerThunk } from "../../services/products-thunks.js";
import { Button, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { ToastContainer } from "react-toastify";

const CustomTable = styled(Table)`
    table {
        border: 1px solid coral;
    }
    th {
        background-color: coral !important;
        color: white !important;
    }
`;

const ProductListings = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { profile } = useSelector(state => state.user)
    const { allProducts, loading } = useSelector(state => state.productsData)

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
            render: (_, { product_image }) => (product_image ?
                <img src={product_image} style={{ width: "auto", height: "100%", maxWidth: "100%" }} alt="" />
                : <span> No Image </span>)
            ,
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
            render: (inventory, record) => (<div>{record.unavailable ? "Not Available" : inventory}</div>),
        },
        {
            title: '# Orders',
            dataIndex: 'order_count',
            key: 'numorders',
            width: "10%",
            ellipsis: true,
            align: 'center',
            sorter: (a, b) => a.order_count - b.order_count,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: "25%",
            render: (_, { category }) => (
                <>
                    {category.filter(c => c !== 'Other').map((tag, idx) => <Tag color="green" key={idx}> {tag.toUpperCase()} </Tag>)}
                </>
            ),
        },
    ];

    return (
        <div>
            {loading ? <li className="list-group-item"> Loading... </li>
                : <div className="d-flex flex-column">
                    <div className="mb-3" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <h3>Your Products</h3>
                        <Button type="primary" shape="round"
                            icon={<PlusOutlined />}
                            style={{ width: "180px", display: "flex", alignItems: "center", alignSelf: "flex-end", background: "coral" }}
                            onClick={() => navigate('/seller/newlisting')}
                        >
                            Add New Listing
                        </Button>
                    </div>

                    <CustomTable
                        columns={columns}
                        dataSource={allProducts}
                        rowKey={(row) => row.product_id}
                    />
                </div>
            }
            <ToastContainer />
        </div>
    );
}

export default ProductListings;