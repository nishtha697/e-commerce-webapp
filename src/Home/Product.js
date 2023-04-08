import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";

//Reload the product using api call to have up to date inventory
const Product = () => {
    let [product, setProduct] = useState({});
    let [quantity, setQuantity] = useState(1);
    let [totalPrice, setTotalPrice] = useState(product.price);
    const location = useLocation();
    useEffect(() => {
        if (location.state !== undefined) {
            setProduct(location.state.product);
            setTotalPrice(location.state.product.price);
        }
    }, [])

    const handleChange = (e) => {
        setQuantity(e.target.value)
        setTotalPrice(e.target.value * product.price)
    }

    debugger
    return (
        <div className="container mt-3 mb-2">
            <div>
                <img src={product.product_image} className="card-img-top" alt={product.title}/>
                <div className="card-body">
                    <br/>
                    <h5 className="card-title mb-2"><b>{product.title}</b></h5>
                    {product.category && product.category.map(c => <span style={{background: "coral"}} className="badge badge-pill badge-warning me-3 mb-2">{c}</span>)}
                    <br/>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text"><small className="text-muted">${product.price}</small>
                    </p>
                    <div className="mb-3">
                        <input min="1" max={product.inventory > 20 ? 20 : product.inventory}
                               type="number" id="typeNumber"
                               style={{width: "80px", display: "inline"}}
                               className="form-control me-3" value={quantity}
                               onChange={handleChange}/>
                        <button className="btn btn-outline-success" style={{display: "inline"}}>Add to
                            Cart
                        </button>
                    </div>
                    <p className="card-text">Total Price: <b>${totalPrice}</b></p>
                </div>
            </div>
        </div>
    )
}

export default Product;