import React, {useState} from "react";
import {Button, Tag} from "antd";
import {useDispatch} from "react-redux";
import {
    shoppingCartDeleteProductThunk,
    shoppingCartUpdateProductThunk
} from "../../services/cart-thunks";

const CartItem = ({product, initialQuantity, user}, width = "180px", height = "180px") => {
    console.log(initialQuantity)
    const [quantity, setQuantity] = useState(initialQuantity);
    const dispatch = useDispatch();

    const handleQuantityUpdate = (event) => {
        setQuantity(event.target.value);
        dispatch(shoppingCartUpdateProductThunk({ username: user.username, productId: product.product_id, quantity:event.target.value }))
    }
    const handleDelete = () => {
        dispatch(shoppingCartDeleteProductThunk({ username: user.username, productId: product.product_id }))
    }


    return (<>
        {product && <li aria-current="true" className="list-group-item mb-4">
            <div className="row pb-2 mt-3 border-bottom">
                <div className="col-2 col-lg-2 col-md-3 d-none d-md-block align-self-center">
                    <img className="wd-post-image" height={height}
                         src={`${product.product_image}`}
                         width={width}/>
                </div>
                <div className="col-10 col-lg-10 col-md-9">
                    <div className="row pb-3 border-bottom">
                        <div className="col-10">
                            <div className="wd-light-text fw-bold">{product.title}</div>
                            <div>
                                {product.category && product.category
                                    .filter(c => c !== 'Other')
                                    .map(c =>
                                             <span key={c}
                                                   style={{ background: "coral" }}
                                                   className="badge badge-pill badge-warning me-3 mb-2"
                                             >
                                {c}
                            </span>
                                    )}
                            </div>
                            <div className="small">Sold by: {product.seller}</div>

                            {product.unavailable ?       <Tag color="red">Out of Stock</Tag>
                                                     :      (product.inventory < quantity ? <Tag color="red">Not enough in Stock</Tag> : <Tag color="green">In Stock</Tag>)
                            }
                            <div className="mt-4">Qty:</div>
                            <input
                                min="1"
                                max={product.inventory > 20 ? 20 : product.inventory}
                                type="number"
                                id="typeNumber"
                                style={{width: "100px", display: "inline"}}
                                className="form-control me-3"
                                value={quantity}
                                onChange={handleQuantityUpdate}
                            />
                            <Button danger onClick={handleDelete}>Delete</Button>
                        </div>
                        <div className="col-2">

                            <div className="fw-bold h6">${product.price}
                            </div>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-8"></div>
                        <div className="col-4 mt-2">Total Product Price: <b>${(quantity * product.price).toFixed(2)}</b></div>

                    </div>
                </div>

            </div>

        </li>}
    </>);
}

export default CartItem;