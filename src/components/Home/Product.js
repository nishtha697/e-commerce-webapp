import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductByIdThunk, updateProductThunk } from "../../services/products-thunks";
import { useDispatch, useSelector } from "react-redux";
import { Input, InputNumber } from "antd";

// Reload the product using api call to have up to date inventory
const Product = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    let { currentProduct } = useSelector(state => state.productsData);
    const [product, setProduct] = useState({ ...currentProduct })

    let [quantity, setQuantity] = useState(1);
    let [isSellerEdit, setIsSellerEdit] = useState(false);

    const { profile, type } = useSelector(state => state.user);
    const isLoggedIn = () => profile && Object.keys(profile).length > 0 && type;

    useEffect(() => {
        dispatch(getProductByIdThunk(id))
    }, [])

    useEffect(() => {
        setProduct({ ...currentProduct })
    }, [currentProduct])

    const handleSave = (p) => {
        dispatch(updateProductThunk(p))
    }


    const handleUnavailable = async () => {
        let newProduct = { ...product };
        if (product.hasOwnProperty("unavailable") && product.unavailable === true) {
            newProduct["unavailable"] = false;
        } else {
            newProduct["unavailable"] = true
        }
        setProduct(newProduct)
        handleSave(newProduct)
    }

    const handleSellerEdit = (key, value) => {
        let newProduct = { ...product };
        newProduct[key] = value;
        setProduct(newProduct);
    }

    return (<div className="container">
        {!product ? <li className="list-group-item"> Loading... </li>
            : <div className="card-body">


                {/* Title */}
                {isSellerEdit ?
                    <div className="mb-3">
                        <h5>Title</h5>
                        <Input.TextArea size="large" showCount value={product.title} onChange={(e) => handleSellerEdit("title", e.target.value)} />
                    </div>
                    : <h4 className="card-title mb-2">{product.title}</h4>
                }

                {/* Product Tags & Seller */}
                <div className="mb-3">
                    {product.category && product.category.map(c =>
                        <span key={c}
                            style={{ background: "coral" }}
                            className="badge badge-pill badge-warning me-3 mb-2"
                        >
                            {c}
                        </span>
                    )}
                    {isLoggedIn() && type === "buyer" && <p className="card-text text-muted">Sold by {product.seller}</p>}
                </div>


                {/* Image */}
                <div className="mb-3">
                    <img
                        src={product.product_image}
                        style={{ width: "auto", height: "300px" }}
                        className="card-img-top mt-2 mb-1"
                        alt={product.title}
                    />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <h5>Description</h5>
                    {isSellerEdit ?
                        <Input.TextArea size="large" row={10} showCount value={product.description} onChange={(e) => handleSellerEdit("description", e.target.value)} />
                        : <p className="card-text">{product.description}</p>
                    }
                </div>

                {/* Highlights */}
                <div className="mb-3">
                    <h5>Highlights</h5>
                    {isSellerEdit ?
                        <Input.TextArea size="large" row={10} showCount value={product.highlights} onChange={(e) => handleSellerEdit("highlights", e.target.value)} />
                        : <p className="card-text">{product.highlights}</p>
                    }
                </div>

                {/* Price */}
                <div className="mb-3">
                    <h5>Price</h5>
                    {isSellerEdit ?
                        <InputNumber size="large" value={product.price} onChange={(e) => handleSellerEdit("price", Number(e))} />
                        : <p className="card-text text-muted">${product.price}</p>
                    }
                </div>

                {/* Qty & Add to Cart */}
                {type !== "seller" && <div className="mb-3">
                    <h5>Qty: </h5>
                    <input
                        min="1"
                        max={product.inventory > 20 ? 20 : product.inventory}
                        type="number"
                        id="typeNumber"
                        style={{ width: "100px", display: "inline" }}
                        className="form-control me-3"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button className="btn btn-outline-success" style={{ display: "inline" }} disabled={!isLoggedIn()}>
                        Add to Cart
                    </button>
                    {!isLoggedIn() && <div><i style={{ color: "red" }}>Login to add product to cart</i></div>}
                </div>}

                {/* Total Price */}
                {type !== "seller" && <p className="card-text">Total Price: <b>${(quantity * product.price).toFixed(2)}</b></p>}

                {/* Stock Level */}
                {type === "seller" &&
                    <div className="mb-3">
                        <h5>Inventory Level</h5>
                        {isSellerEdit ?
                            <InputNumber size="large" value={product.inventory} onChange={(e) => handleSellerEdit("inventory", Number(e))} />
                            : <p className="card-text text-muted">{product.inventory} qty</p>
                        }
                    </div>
                }

                {type === "seller" &&
                    <button
                        className="btn btn-outline-success mt-3 mb-3"
                        onClick={() => {
                            if (isSellerEdit) {
                                handleSave(product)
                            }
                            setIsSellerEdit(!isSellerEdit)
                        }}
                    >
                        {isSellerEdit ? "Save Product" : "Edit Product"}
                    </button>
                }
                <br />
                {type === "seller" &&
                    <button
                        className="btn btn-outline-danger me-2 mb-3"
                        onClick={handleUnavailable}
                    >
                        {product.hasOwnProperty("unavailable") && product.unavailable === true ? "Mark as Available" : "Mark as Unavailable"}
                    </button>
                }

            </div>
        }
    </div>
    )

}


export default Product;