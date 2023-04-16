import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { findProductsByIdThunk } from "../../services/products-thunks";
import { useDispatch, useSelector } from "react-redux";

// Reload the product using api call to have up to date inventory
const Product = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    let product = useSelector(state => state.productsData.currentProduct);
    let [quantity, setQuantity] = useState(1);

    const currentUser = useSelector(state => state.user.profile);
    const isLoggedIn = () => {
        return !(currentUser === null || Object.keys(currentUser).length === 0 || currentUser === undefined)
    }

    useEffect(() => {
        dispatch(findProductsByIdThunk(id))
    }, [])

    const handleChange = (e) => {
        setQuantity(e.target.value)
    }

    return (
        <div className="container mt-3 mb-2">
            {!product ? <li className="list-group-item"> Loading... </li> :
                <div>
                    <div className="card-body">
                        <br />
                        {/* Title */}
                        <h5 className="card-title mb-2"><b>{product.title}</b></h5>
                        {/* Product Tags */}
                        {product.category && product.category.map(c =>
                            <span key={c}
                                style={{ background: "coral" }}
                                className="badge badge-pill badge-warning me-3 mb-2"
                            >
                                {c}
                            </span>
                        )}
                        <br />
                        {/* Image */}
                        <img
                            src={product.product_image}
                            style={{ width: "auto", height: "300px" }}
                            className="card-img-top mt-2 mb-1"
                            alt={product.title}
                        />
                        {/* Description */}
                        <p className="card-text">{product.description}</p>
                        {/* Price */}
                        <p className="card-text"><small className="text-muted">${product.price}</small></p>
                        {/* Qty & Add to Cart */}
                        <div className="mb-3">
                            <input
                                min="1"
                                max={product.inventory > 20 ? 20 : product.inventory}
                                type="number"
                                id="typeNumber"
                                style={{ width: "80px", display: "inline" }}
                                className="form-control me-3"
                                value={quantity}
                                onChange={handleChange} />
                            <button className="btn btn-outline-success" style={{ display: "inline" }} disabled={!isLoggedIn()}>
                                Add to Cart
                            </button>
                            {!isLoggedIn() && <div><i style={{ color: "red" }}>Login to add product to cart</i></div>}
                        </div>

                        <p className="card-text">Total Price: <b>${(quantity * product.price).toFixed(2)}</b></p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Product;