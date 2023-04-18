import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { createProductThunk, getProductCategoriesThunk } from "../../services/products-thunks";
import { useNavigate } from "react-router";

const NewProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { profile } = useSelector(state => state.user)
    const { categories, newProductCreation } = useSelector(state => state.productsData)

    const [categoryValue, setCategoryValue] = useState('');
    const [subCategoryValue, setSubCategoryValue] = useState('');
    const [subCategory2Value, setSubCategory2Value] = useState('');

    const [trySave, setTrySave] = useState(false)

    const handleCategoryChange = value => {
        setCategoryValue(value);
        setSubCategoryValue('');
        setSubCategory2Value('');
    };

    const handleSubCategoryChange = value => {
        setSubCategoryValue(value);
        setSubCategory2Value('');
    };
    const handleSubCategory2Change = value => {
        setSubCategory2Value(value);
    };

    useEffect(() => {
        dispatch(getProductCategoriesThunk())
    }, [])

    useEffect(() => {
        if (trySave && newProductCreation && newProductCreation.complete) {
            if (!newProductCreation.error) {
                toast.success("Product successfully created!", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                navigate(`/products/${newProductCreation.product.product_id}`)
            } else {
                toast.error("Product Error creating new product!", {
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
        }

    }, [newProductCreation.complete, newProductCreation.error])

    const onFinish = async (values) => {
        const categories = [values.category, subCategoryValue, subCategory2Value].filter(c => c)
        while (categories.length < 3) {
            categories.push('Other')
        }
        const newProduct = {
            ...values,
            category: categories,
            seller: profile.username
        }
        console.log('Product Creation Attempted:', newProduct)
        dispatch(createProductThunk(newProduct))
        setTrySave(true)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Product Creation Attempt Failed:', errorInfo)
        toast.error("Error/Missing product information!", {
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

    return (

        <>
            <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5 d-flex flex-column justify-content-center">
                    <h1 className="mb-4">New Product Form</h1>

                    <Form
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Title" name="title"
                            rules={[
                                { required: true, message: 'Please enter a title!' },
                                { min: 10, message: 'Title cannot be less than 10 characters!' }
                            ]}
                        >
                            <Input.TextArea showCount autoSize={{ minRows: 3 }} />
                        </Form.Item>

                        <Form.Item
                            label="Description" name="description"
                            rules={[
                                { required: true, message: 'Please enter a description!' },
                                { min: 10, message: 'Description cannot be less than 10 characters!' }
                            ]}
                        >
                            <Input.TextArea showCount autoSize={{ minRows: 3 }} />
                        </Form.Item>

                        <Form.Item
                            label="Highlights" name="highlights"
                            rules={[
                                { required: true, message: 'Please enter some highlights!' },
                                { min: 10, message: 'Highlights cannot be less than 10 characters!' }
                            ]}
                        >
                            <Input.TextArea showCount autoSize={{ minRows: 3 }} />
                        </Form.Item>

                        <Form.Item
                            label="Price" name="price"
                            rules={[
                                { required: true, message: 'Please enter a price!' },
                                { type: "number", message: "Must be a number" }
                            ]}
                        >
                            <InputNumber addonBefore=" USD  " min={0.1} step="0.01" />
                        </Form.Item>

                        <Form.Item
                            label="Inventory" name="inventory"
                            rules={[
                                { required: true, message: 'Please enter current inventory level!' },
                                { type: "number", message: "Must be a number" }
                            ]}
                        >
                            <InputNumber addonBefore=" Qty  " min={1} step="1" />
                        </Form.Item>

                        <Form.Item label="Category" name="category"
                            rules={[{ required: true, message: 'Please select a category!' }]}
                        >
                            <Select style={{ width: '100%' }}
                                onChange={handleCategoryChange}
                                value={categoryValue}
                            >
                                {categories && Object.keys(categories).map(category =>
                                    <Select.Option value={category}>{category}</Select.Option>
                                )}
                            </Select>

                        </Form.Item>

                        <Form.Item label="Sub-Category">
                            <Select style={{ width: '100%' }}
                                disabled={!categoryValue}
                                onChange={handleSubCategoryChange}
                                value={subCategoryValue}
                            >
                                {categoryValue && Object.keys(categories[categoryValue])
                                    .filter(c => c !== 'Other')
                                    .map(category =>
                                        <Select.Option value={category}>{category}</Select.Option>
                                    )}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Sub-Category 2">
                            <Select
                                style={{ width: '100%' }}
                                disabled={!subCategoryValue || !categoryValue}
                                onChange={handleSubCategory2Change}
                                value={subCategory2Value}
                            >
                                {categoryValue && subCategoryValue && categories[categoryValue][subCategoryValue]
                                    .filter(c => c !== 'Other')
                                    .map(category =>
                                        <Select.Option value={category}>{category}</Select.Option>
                                    )}
                            </Select>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: "coral", color: "white" }}>
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default NewProduct;