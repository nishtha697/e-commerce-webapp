import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsThunk } from "../../services/products-thunks.js";

const Home = () => {

    const dispatch = useDispatch();

    const { products, loading } = useSelector(state => state.productsData)

    useEffect(() => {
        dispatch(getAllProductsThunk())
    }, [])

    return (
        <div>
            {loading && <li className="list-group-item"> Loading... </li>}
            <div className="row mx-auto mt-2 mb-2 g-4 align-items-stretch">
                {products.map((product, idx) =>
                    <div className="col" key={idx}>
                        <div className="card" style={{ height: "400px", minWidth: "300px", maxWidth: "400px", border: "0px" }}>
                            <img src={product.product_image} className="card-img-top" style={{ height: "200px", width: "auto" }} alt={product.title} />
                            <div className="card-body">
                                <Link
                                    className="wd-user"
                                    to={`/products/${product.product_id}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <h6 className="card-title" style={{ maxHeight: "80px", overflow: "hidden" }}>{product.title}</h6>
                                    <p className="card-text"><small className="text-muted">Sold by {product.seller}</small></p>
                                </Link>
                                <div className="mt-auto">
                                    <p className="card-text"><small>${product.price}</small></p>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;