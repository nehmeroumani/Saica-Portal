import React from 'react';
import Card from '@material-ui/core/Card';
import { translate } from 'react-admin';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    main: {paddingLeft: 10, paddingRight: 10},
    card: {
        overflow: 'inherit',
        padding: 16,
        marginTop: 20,
        minHeight: 52,
    },
};

class Stacked extends React.Component{
    state = {data : this.props.data}

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({data: this.props.data});
        }
    }

    getChartOptions (data) {
        let options ={
            chart: {
                type: 'bar',
            }, 
            credits: false,
            title: {
                text: 'Theme Keywords Per Datasource'
            },
            xAxis: {
               // categories: ['صحافي', 'اعلام', 'رقابة', 'حرية رأي', 'رقابة ذاتية']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Datasource'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
        }
        let datalist = [{
            name: 'Twitter',
            data: [],color:'rgb(29, 161, 242)'
        },{
            name: 'Websites',color:'rgb(255, 152, 0)',
            data: []
        }, {
            name: 'Facebook',color:'rgb(66, 103, 178)',
            data: []
        } ]
        let caregories = [];
        for (let i in data) {
            if(i>10)
            break;
            let item = data[i];
            datalist[0].data.push(item.twitterCount);
            datalist[1].data.push(item.websiteCount);

            datalist[2].data.push(item.facebookCount);
            caregories.push(item.name)
        }

        options.series = datalist;
        options.xAxis.categories = caregories
        return options;
    }

    renderChart (options) {
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

    render () {
        const { data } = this.state;
        const options = this.getChartOptions(data);
        return (
            <div style={styles.main}>
                <Card style={styles.card}>
                    {data? this.renderChart(options) : <CircularProgress/> }
                </Card>
            </div>
        );
    }
}



export default Stacked;
