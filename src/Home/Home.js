import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {findProductsThunk} from "../services/products-thunks.js";
import {Link} from "react-router-dom";

const Home = () => {
    const {products, loading} = useSelector(
        state => state.productsData)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findProductsThunk())
    }, [])

    return (
        <>
            {loading &&
             <li className="list-group-item">
                 Loading...
             </li>
            }
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2 mb-2">
                { products.map(product => {
                    //Fix images
                    return(
                        <div className="col" >
                    <div className="card" style={{height: "500px"}}>
                        <img src={product.product_image} className="card-img-top" style={{height: "250px"}} alt={product.title}/>
                        <div className="card-body">
                            <Link
                                className="wd-user"
                                to={`/products/${product.product_id}`}
                                state={{ product: product }}
                                style={{textDecoration: "none"}}
                            ><h6 className="card-title" style={{maxHeight: "80px", overflow: "hidden"}}>{product.title}</h6></Link>
                            <p className="card-text" style={{height: "100px", overflow: "hidden"}}>{product.description}</p>
                            <p className="card-text"><small className="text-muted">{product.price} USD</small></p>
                        </div>
                    </div>
                        </div>);
                })}
             </div>
        </>
    );
}

export default Home;