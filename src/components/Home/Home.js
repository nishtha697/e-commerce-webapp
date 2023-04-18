import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsThunk, getProductCategoriesThunk } from "../../services/products-thunks.js";
import FilterPanel from "./FilterPanel.js";
import { Tag } from "antd";

const Home = () => {

    const dispatch = useDispatch();

    const { allProducts, filteredProducts, loading, filters, appliedFilters } = useSelector(state => state.productsData)

    useEffect(() => {
        dispatch(getAllProductsThunk())
        dispatch(getProductCategoriesThunk())
    }, [])

    const productsToShow = (filters.applied && filteredProducts) || allProducts || []

    return (
        <div>
            {loading && <li className="list-group-item"> Loading... </li>}

            <div className="row d-flex flex-row mt-2 mb-2">
                <div class="col-md-2">
                    <FilterPanel />
                </div>

                <div className="col-md-10 row mx-auto align-items-stretch">
                    <div className="mb-2 text-muted">Total Products: {productsToShow.length}</div>

                    {filters.applied &&
                        <div className="mb-4">
                            {Object.keys(appliedFilters)
                                .filter(key => appliedFilters[key])
                                .map(key => key !== 'category' ?
                                    <Tag color="coral" > {key}: {appliedFilters[key]} </Tag>
                                    : <>
                                        {Object.keys(appliedFilters[key])
                                            .filter(category => appliedFilters[key][category])
                                            .map(category => <Tag color="coral" > category: {appliedFilters[key][category]} </Tag>)}
                                    </>

                                )}
                        </div>
                    }

                    {productsToShow
                        .filter((prod) => !prod.unavailable)
                        .map((product, idx) => <div className="col" key={idx}>
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



        </div>
    );
}

export default Home;