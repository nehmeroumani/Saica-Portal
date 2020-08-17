import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import { translate } from 'react-admin';
import drilldown from 'highcharts/modules/drilldown.js';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import CircularProgress from '@material-ui/core/CircularProgress';
drilldown(Highcharts);

const styles = {
    main: { paddingLeft: 10, paddingRight: 10 },
    card: { marginTop: 20, overflow: 'inherit', padding: 16, minHeight: 52 }
};

class PieChart extends PureComponent {
    state = { data: this.props.data }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({ data: this.props.data });
        }
    }

    getChartOptions(data) {

        let options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            credits: false,
            title: {
                text: 'Annotations per category/subcategory'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> {point.percentage:.1f} %',
                        useHTML: true,
                    },
                }
            },
            series: [{
                name: 'Annotations',
                colorByPoint: true
            }],
            drilldown: {
                activeAxisLabelStyle: {
                    textDecoration: 'none',
                    fontStyle: 'italic'
                },
                activeDataLabelStyle: {
                    textDecoration: 'none',
                    fontStyle: 'italic'
                },
                series: [],
            }
        }

        if (data) {
            options.series[0].data = data.seriesData;
            options.drilldown.series = data.drilldownSeriesData;
        }
        return options;
    }

    renderChart(options) {
        return (
            <div style={{ width: "100%" }}>
                <HighchartsReact
                    containerProps={{ className: "highchartscss" }}
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        );
    }

    render() {
        const { data } = this.state;
        const options = this.getChartOptions(data);
        console.log('pie chart data');
        console.log(options);
        return (
            <div style={styles.main}>
                <Card style={styles.card}>
                    {data ? this.renderChart(options) : <CircularProgress />}
                </Card>
            </div>
        );
    }
}

export default PieChart;
