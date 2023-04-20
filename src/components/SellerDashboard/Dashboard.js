import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartDataThunk } from '../../services/chart-data-thunks';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from "antd";
import HighchartsDrilldown from "highcharts/modules/drilldown";

HighchartsDrilldown(Highcharts);

const Dashboard = () => {
    const dispatch = useDispatch();
    const chartData = useSelector(state => state.chartData);
    const {
        userDemographicData,
        categoriesData,
        timelineData,
        revenueData
    } = chartData;
    const { profile } = useSelector(state => state.user);

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


    const timelineOptions = {
        title: {
            text: 'Order Timeline'
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
            type: 'bar',
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
            bar: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
    };

    const generateCategoryChartOptions = (categoriesData) => {
        const topLevelSeriesData = categoriesData.map((item) => {
            const totalCount = item.secondLevelCategories.reduce(
                (acc, secondLevelCategory) =>
                    acc +
                    secondLevelCategory.thirdLevelCategories.reduce(
                        (innerAcc, thirdLevelCategory) => innerAcc + thirdLevelCategory.count,
                        0,
                    ),
                0,
            );

            return {
                name: item._id,
                y: totalCount,
                drilldown: item._id,
            };
        });

        const secondLevelDrilldownSeries = categoriesData.flatMap(
            (topLevelCategory) =>
                topLevelCategory.secondLevelCategories.map((secondLevelCategory) => {
                    const secondLevelTotalCount = secondLevelCategory.thirdLevelCategories.reduce(
                        (acc, thirdLevelCategory) => acc + thirdLevelCategory.count,
                        0,
                    );

                    return {
                        id: `${topLevelCategory._id}-${secondLevelCategory.secondLevelCategory}`,
                        name: secondLevelCategory.secondLevelCategory,
                        data: secondLevelCategory.thirdLevelCategories.map((thirdLevelCategory) => ({
                            name: thirdLevelCategory.thirdLevelCategory,
                            y: thirdLevelCategory.count,
                        })),
                    };
                }),
        );

        const drilldownSeries = categoriesData.map((topLevelCategory) => ({
            id: topLevelCategory._id,
            name: topLevelCategory._id,
            data: topLevelCategory.secondLevelCategories.map((secondLevelCategory) => ({
                name: secondLevelCategory.secondLevelCategory,
                y: secondLevelCategory.thirdLevelCategories.reduce(
                    (acc, thirdLevelCategory) => acc + thirdLevelCategory.count,
                    0,
                ),
                drilldown: `${topLevelCategory._id}-${secondLevelCategory.secondLevelCategory}`,
            })),
        })).concat(secondLevelDrilldownSeries);


        return {
            chart: {
                type: "bar",
                events: {
                    drilldown: function (e) {
                        this.setTitle({ text: e.point.name });
                    },
                    drillup: function (e) {
                        this.setTitle({ text: e.seriesOptions.name });
                    },
                },
            },
            title: {
                text: "Product Distribution by Categories",
            },
            subtitle: {
                text: "Product distribution by categories of placed orders. Click on the bars for categories to see distribution within those categories.",
            },
            xAxis: {
                type: "category",
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
                    data: topLevelSeriesData,
                },
            ],
            drilldown: {
                series: drilldownSeries,
                drillUpButton: {
                    relativeTo: "spacingBox",
                    position: {
                        y: 0,
                        x: 0,
                    },
                    theme: {
                        fill: "white",
                        "stroke-width": 1,
                        stroke: "silver",
                        r: 0,
                        states: {
                            hover: {
                                fill: "#a4edba",
                            },
                            select: {
                                stroke: "#039",
                                fill: "#a4edba",
                            },
                        },
                    },
                },
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                    },
                },
            },
        };
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
                    options={revenueOptions}
                />
            </Card>
            <Card className="mt-4 mb-4">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={generateCategoryChartOptions(categoriesData)}
                />
            </Card>

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
