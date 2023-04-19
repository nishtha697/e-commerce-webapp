import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchChartDataThunk} from '../../services/chart-data-thunks';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {Card} from "antd";

const Dashboard = () => {
    const dispatch = useDispatch();
    const chartData = useSelector(state => state.chartData);
    const {
        userDemographicData,
        categoriesData,
        timelineData,
        categoriesTopLevelData,
        revenueData
    } = chartData;
    const {profile} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchChartDataThunk(profile.username));
    }, [dispatch]);

    const demographicsSeries = {
        name: "User Demographics",
        data: userDemographicData.map((item) => ({
            name: item._id,
            y: item.count,
        })),
    };

    const demographicsChartOptions = {
        chart: {
            type: "pie",
        },
        title: {
            text: "User Demographics",
        },
        subtitle: {
            text: "Analyses the gender distribution of buyers that placed orders",
        },
        series: [demographicsSeries],
    };

    const categoriesSeries = {
        name: "Categories",
        data: categoriesData.map((item) => ({
            name: item._id,
            y: item.count,
        })),
    };

    const categoriesChartOptions = {
        chart: {
            type: "column",
        },
        title: {
            text: "Categories",
        },
        subtitle: {
            text: "Analyses the categories distribution of products for the placed orders",
        },
        xAxis: {
            categories: categoriesData.map((item) => item._id),
            title: {
                text: "Category",
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Count",
                align: "high",
            },
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        series: [categoriesSeries],
    };

    const generateTopLevelCategoryChartOptions = (categoryData, topLevelCategory) => {
        const seriesData = categoryData.map((item) => ({
            name: item._id[1], // Second level category
            y: item.count,
        }));

        return {
            chart: {
                type: "bar",
            },
            title: {
                text: `Product Distribution for ${topLevelCategory}`,
            },
            xAxis: {
                categories: seriesData.map((item) => item.name),
                title: {
                    text: "Second-level Categories",
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Number of Items Sold",
                },
            },
            series: [
                {
                    name: "Products",
                    data: seriesData,
                },
            ],
        };
    };

    const timelineOptions = {
        title: {
            text: 'Timeline'
        },
        subtitle: {
            text: "Analyses the order time distribution of placed orders",
        },
        xAxis: {
            type: 'datetime'
        },
        series: [{
            type: 'line',
            data: timelineData.map(data => [new Date(data.date).getTime(), data.value]),
            color: "#d76765"
        }],
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
    };

    const revenueOptions = {
        chart: {
            type: 'column',
            zoomType: "xy"
        },
        title: {
            text: 'Revenue by Product'
        },
        subtitle: {
            text: "Analyses the revenue distribution per product for the placed orders",
        },
        xAxis: {
            categories: revenueData.map(item => item._id.title),
            title: {
                text: 'Product'
            },
            type: "category"
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Revenue'
            }
        },
        series: [{
            name: 'Revenue',
            data: revenueData.map(item => item.revenue),
            color: "#65bd5c"
        }],
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
    };

    return (
        <div>
            <h4 className="mb-4">Analytics of Placed Orders</h4>
            <Card className="mt-2 mb-4">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={demographicsChartOptions}
                />
            </Card>
            <Card className="mt-4 mb-4">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={categoriesChartOptions}
                />
            </Card>
            <Card className="mt-4 mb-4">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={revenueOptions}
                />
            </Card>
            {/*{categoriesTopLevelData.map((topLevelCategory) => {*/}
            {/*    const categoryData = categoriesData.filter(*/}
            {/*        (item) => item._id[0] === topLevelCategory*/}
            {/*    );*/}

            {/*    return (*/}
            {/*        <HighchartsReact*/}
            {/*            key={topLevelCategory}*/}
            {/*            highcharts={Highcharts}*/}
            {/*            options={generateTopLevelCategoryChartOptions(*/}
            {/*                categoryData,*/}
            {/*                topLevelCategory*/}
            {/*            )}*/}
            {/*        />*/}
            {/*    );*/}
            {/*})}*/}
            <Card className="mt-4 mb-4">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={timelineOptions}
                />
            </Card>
        </div>
    );
};

export default Dashboard;
