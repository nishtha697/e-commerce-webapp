import { Form, Button, Input, Select, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAppliedFilters, updateAppliedFilters } from "../../reducers/products-reducer";
import { getProductFilteredThunk } from "../../services/products-thunks";

const FilterPanel = () => {

    const dispatch = useDispatch();
    const { filters, appliedFilters } = useSelector(state => state.productsData)
    const [newFilters, setNewFilters] = useState({
        title: null,
        description: null,
        maxPrice: null,
        minPrice: null,
        category: { category1: '', category2: '', category3: '' }
    })

    useEffect(() => {
        return () => dispatch(clearAppliedFilters)
    }, [])

    useEffect(() => {
        dispatch(getProductFilteredThunk(appliedFilters))
    }, [appliedFilters])

    useEffect(() => {
        dispatch(updateAppliedFilters(newFilters))
    }, [newFilters])

    const handleFilterChange = (key, value) => {
        const updatedFilters = { ...newFilters }
        switch (key) {
            case 'price':
                updatedFilters.minPrice = value[0]
                updatedFilters.maxPrice = value[1]
                break;
            case 'category1':
                updatedFilters.category = { category1: value, category2: '', category3: '' }
                break;
            case 'category2':
                updatedFilters.category = { ...updatedFilters.category, category2: value, category3: '' }
                break;
            case 'category3':
                updatedFilters.category = { ...updatedFilters.category, category3: value }
                break;
            default:
                updatedFilters[key] = value;
        }
        setNewFilters(updatedFilters)
    }

    const handleClearFilters = () => {
        setNewFilters({
            title: null,
            description: null,
            maxPrice: null,
            minPrice: null,
            category: { category1: '', category2: '', category3: '' }
        })
        dispatch(clearAppliedFilters())
    }

    return (
        <div className="card bg-glass">
            <div className="card-body d-flex flex-column justify-content-center">
                <h4 className="mb-4">Filters</h4>

                <Form
                    style={{ maxWidth: 600 }}
                    layout="vertical"
                >
                    <Form.Item label="Title" >
                        <Input.Search
                            allowClear
                            onSearch={(e) => handleFilterChange('title', e)} />
                    </Form.Item>

                    <Form.Item label="Description" >
                        <Input.Search
                            allowClear
                            onSearch={(e) => handleFilterChange('description', e)} />
                    </Form.Item>

                    <Form.Item label="Price" >
                        <Slider
                            range
                            min={0}
                            max={3500}
                            defaultValue={[newFilters.minPrice, newFilters.maxPrice]}
                            onAfterChange={(e) => handleFilterChange('price', e)} />
                    </Form.Item>

                    <Form.Item label="Category">
                        <Select style={{ width: '100%' }}
                            onChange={(e) => handleFilterChange('category1', e)}
                            value={newFilters.category.category1}
                            allowClear
                        >
                            {filters.categories && Object.keys(filters.categories).map(category =>
                                <Select.Option value={category} key={category}>{category}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Sub-Category">
                        <Select style={{ width: '100%' }}
                            disabled={!newFilters.category.category1}
                            onChange={(e) => handleFilterChange('category2', e)}
                            value={newFilters.category.category2}
                        >
                            {newFilters.category.category1
                                && Object.keys(filters.categories[newFilters.category.category1])
                                    .filter(c => c !== 'Other')
                                    .map(category =>
                                        <Select.Option value={category} key={category}>{category}</Select.Option>
                                    )}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Sub-Category 2">
                        <Select
                            style={{ width: '100%' }}
                            disabled={!newFilters.category.category1 || !newFilters.category.category2}
                            onChange={(e) => handleFilterChange('category3', e)}
                            value={newFilters.category.category3}
                        >
                            {newFilters.category.category1
                                && newFilters.category.category2
                                && filters.categories[newFilters.category.category1][newFilters.category.category2]
                                    .filter(c => c !== 'Other')
                                    .map(category =>
                                        <Select.Option value={category} key={category}>{category}</Select.Option>
                                    )}
                        </Select>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" style={{ backgroundColor: "coral", color: "white" }}
                            onClick={handleClearFilters}
                        >
                            Clear Filters
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default FilterPanel;