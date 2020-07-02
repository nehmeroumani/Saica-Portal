import React from 'react';
import Card from '@material-ui/core/Card';
import { translate } from 'react-admin';
import CircularProgress from '@material-ui/core/CircularProgress';
import Highcharts from 'highcharts'
import HC_exporting from 'highcharts/modules/exporting'

import HighchartsReact from 'highcharts-react-official'
HC_exporting(Highcharts)

const styles = {
    main: {
        paddingLeft: 10,
        paddingRight: 10
    },
    card: {
        overflow: 'inherit',
        padding: 16,
        marginTop: 20,
        minHeight: 52,
    },
};



class LineChart extends React.Component {
    state = {data : this.props.data}

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({data: this.props.data});
        }
    }

    getChartOptions (data) { 
        const optionsLineChart = {
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    }
                }
                ]
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },
    
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'spline'
            }, credits: false,
            title: {
                text: 'Tweets/Articles'
            },
            "xAxis": {
                "type": 'datetime',
                "labels": {
                    "style": {
                        "color": '#aeaeae'
                    }
                },
                'minPadding': 0
            },
            yAxis: {
                title: {
                    text: 'Posts'
                }
            },
        }
        let datalist = [];
        for (let i in data) {
            let item = data[i];
            var dt = Date.parse(new Date(item.date));
            datalist.push([dt, item.count]);
        }
    
        optionsLineChart.series = [
            {
                pointWidth: 20, borderRadius: 2, color: 'rgb(29, 161, 242)',
                pointPlacement: 0, "pointInterval": 1,
                type: 'line', name: "Tweets", data: datalist
            }
        ];
        return optionsLineChart;
    }
  
    renderChart (options) {
        return (
            <div >
                <HighchartsReact
                    containerProps={{ className: "highchartscss" }} 
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        );
    }

    render (){
        const {data} = this.state;
        const options = this.getChartOptions(data)
        return (
            <div style={styles.main}>
                <Card style={styles.card}>
                    {data? this.renderChart(options) : <CircularProgress/>}
                </Card>
            </div>
        );
    }
}

export default LineChart;
