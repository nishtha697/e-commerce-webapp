import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Button, Divider, Input, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { shoppingCartDeleteThunk, shoppingCartFindThunk } from "../../services/cart-thunks";
import { buyerAddAddressThunk } from "../../services/buyer-thunks";
import { getAllProductsThunk } from "../../services/products-thunks.js";
import CartItem from "./CartItem";
import {createOrderThunk} from "../../services/orders-thunks";

const Cart = () => {
    const dispatch = useDispatch();

    const { profile } = useSelector(state => state.user);
    const { shoppingCart } = useSelector(state => state.shoppingCartData);
    const { allProducts } = useSelector(state => state.productsData)
    const [totalPrice, setTotalPrice] = useState(0);
    const inputRef = useRef(null);

    // const initialAddresses = profile.addresses && profile.addresses.map(address => {
    //     if (address != null) {
    //         return address.incareof + "\n" + address.address1 + "\n" +
    //             (address.address2 !== undefined || address.address2 !== null ? address.address2 : "")
    //             + "\n" + address.city + ", " + address.state + ", United States, " + address.zipcode
    //     }
    // })

    const initialAddresses = profile.addresses && profile.addresses.map(address => {
        if (address != null) {
            return {
                id: address.id,
                address: address.incareof + "\n" + address.address1 + "\n" +
                                  (address.address2 !== undefined || address.address2 !== null ? address.address2 : "")
                                  + "\n" + address.city + ", " + address.state + ", United States, " + address.zipcode
            };
        }
    });

    const [incareof, setInCareOf] = useState('');
    const onInCareOfChange = (event) => {
        setInCareOf(event.target.value)
    }
    const [address1, setAddress1] = useState('');
    const onAddress1Change = (event) => {
        setAddress1(event.target.value)
    }
    const [address2, setAddress2] = useState('');
    const onAddress2Change = (event) => {
        setAddress2(event.target.value)
    }
    const [city, setCity] = useState('');
    const onCityChange = (event) => {
        setCity(event.target.value)
    }
    const [state, setState] = useState('');
    const onStateChange = (event) => {
        setState(event.target.value)
    }
    const [zipcode, setZip] = useState('');
    const onZipChange = (event) => {
        setZip(event.target.value)
    }
    const [addresses, setAddresses] = useState(initialAddresses);
    const [selectedAddress, setSelectedAddresses] = useState(addresses[0].address);
    const [selectedAddressId, setSelectedAddressId] = useState(addresses[0].id);

    const handleAddressValueChange = (value, option) => {
        const { value: selectedId, label: selectedAddress } = option;
        setSelectedAddresses(selectedAddress)
        setSelectedAddressId(selectedId);
    }

    const addItem = (e) => {
        e.preventDefault();
        if (incareof !== '' && address1 !== '' && city !== '' && state !== '' & city !== '' && zipcode !== '') {
            const newAddressId = (new Date()).getTime()
            const newAddress = {
                id: newAddressId,
                address: incareof + "\n" + address1 + "\n" +
                         (address2 !== undefined || address2 !== null ? address2 : "") + "\n" +
                         city + ", " + state + ", United States, " + zipcode
            };
            setAddresses([...addresses, newAddress]);
            const address = {
                id: newAddressId,
                incareof: incareof,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zipcode: zipcode
            }
            setInCareOf('');
            setAddress1('')
            setAddress2('')
            setCity('')
            setState('')
            setZip('')
            setTimeout(() => { inputRef.current?.focus() }, 0);
            dispatch(buyerAddAddressThunk({ username: profile.username, address: address }));
        } else {
            toast.error("Please enter valid values in address!", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }

    };

    useEffect(() => {
        dispatch(getAllProductsThunk())
        if (profile.username) {
            dispatch(shoppingCartFindThunk(profile.username))
        }
    }, [])

    useEffect(() => {
        if (shoppingCart.products && allProducts) {
            const newTotalPrice = shoppingCart.products.reduce(
                (total, cartItem) => {
                    const product = allProducts.find((product) => product.product_id === cartItem.productId);
                    if (product) {
                        return total + product.price * cartItem.quantity;
                    } else {
                        return total;
                    }
                }, 0
            );
            setTotalPrice(newTotalPrice);
        }
    }, [shoppingCart, allProducts]);

    const createShipments = (products) => {
        const shipments = [];
        // group products by seller
        const productsBySeller = products.reduce((acc, product) => {
            if (acc[product.seller]) {
                const { seller, ...shipmentProduct } = product
                acc[product.seller].push(shipmentProduct);
            } else {
                const { seller, ...shipmentProduct } = product
                acc[product.seller] = [shipmentProduct];
            }
            return acc;
        }, {});

        // create a shipment for each seller
        let shipmentId = 1;
        for (const seller in productsBySeller) {
            const products = productsBySeller[seller];
            const shipment = {
                shipmentId: shipmentId++,
                seller_username: seller,
                products,
                shipmentStatusLog: [{
                    status: "Placed",
                    date: Date.now()
                }]
            };
            shipments.push(shipment);
        }
        return shipments;
    };

    const handleCheckout = () => {

        const filteredProducts = allProducts.filter((product) => {
            const matchingProduct = shoppingCart.products.find((item) => item.productId === product.product_id);
            return !!matchingProduct;
        }).map((product) => {
            const matchingProduct = shoppingCart.products.find((item) => item.productId === product.product_id);
            const { productId, quantity } = matchingProduct;
            const { price, seller } = product;
            return { product_id: productId, quantity, pricePerUnit: price, seller };
        });

        console.log(filteredProducts)
        debugger

        const shipments = createShipments(filteredProducts);


        const order = {
            "buyer_username": profile.username,
            "shippingAddress": profile.addresses.find(address => address.id === selectedAddressId),
            "totalPrice": totalPrice,
            "paymentMethod": "Cash on Delievery",
            "shipments": shipments
        }
        console.log(order)
        debugger
        dispatch(createOrderThunk(order))
        dispatch(shoppingCartDeleteThunk(profile.username))
        toast.success('Order placed! :)', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const cartFull = shoppingCart && shoppingCart.products && shoppingCart.products.length > 0

    return (<>

        <div className="pb-3 h5 border-bottom d-flex flex-row justify-content-between">
            <div>Shopping Cart</div>
            {cartFull && <Button danger onClick={() => dispatch(shoppingCartDeleteThunk(profile.username))}>Delete Cart</Button>}
        </div>
        {!cartFull && <div className="mb-5"> <b>No products added to the cart</b></div>}
        {cartFull && shoppingCart.products && allProducts && shoppingCart.products.slice(0).reverse().map(shoppingCartProduct => {
            const product = allProducts.find(product => product.product_id === shoppingCartProduct.productId)
            return <CartItem product={product} initialQuantity={shoppingCartProduct.quantity} user={profile} />
        })
        }
        {cartFull &&
            <>
                <div className="mb-4 row">
                    <div className="col-10">
                        <div className="mt-3 mb-1 ">Shipping Address:</div>
                        <Select
                            style={{ width: 1000 }}
                            placeholder="Shipping Address"
                            value={selectedAddress}
                            onChange={handleAddressValueChange}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider style={{ margin: '8px 0' }} />
                                    <Space style={{ padding: '0 8px 4px' }}>
                                        <Input
                                            placeholder="In care of "
                                            ref={inputRef}
                                            value={incareof}
                                            onChange={onInCareOfChange}
                                        />
                                        <br />
                                        <Input
                                            placeholder="Address line 1"
                                            ref={inputRef}
                                            value={address1}
                                            onChange={onAddress1Change}
                                        />
                                        <br />
                                        <Input
                                            placeholder="Address Line 2"
                                            ref={inputRef}
                                            value={address2}
                                            onChange={onAddress2Change}
                                        />
                                        <br />
                                        <Input
                                            placeholder="City"
                                            ref={inputRef}
                                            value={city}
                                            onChange={onCityChange}
                                        />
                                        <br />
                                        <Input
                                            placeholder="State"
                                            ref={inputRef}
                                            value={state}
                                            onChange={onStateChange}
                                        />
                                        <br />
                                        <Input
                                            placeholder="Zip Code"
                                            ref={inputRef}
                                            value={zipcode}
                                            onChange={onZipChange}
                                        />
                                        <br />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                            Add address
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={addresses.map((address) => ({ label: address.address, value: address.id }))}
                        />
                    </div>
                    <div className="mt-3 mb-3 mb-1 col-2">Payment Method: <br /><b>Cash on Delivery</b></div>
                </div>
                <h5 className="pt-3 d-inline">Total Price: <b>${totalPrice.toFixed(2)}</b></h5>
                <Button large size="large"
                    style={{ background: "coral", color: "white", border: "coral", float: "right", marginRight: "65px" }}
                    onClick={handleCheckout}
                >
                    Checkout
                </Button>
            </>
        }

        <ToastContainer />
    </>

    );
}

export default Cart;