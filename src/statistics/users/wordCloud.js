import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import { translate } from 'react-admin';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import CircularProgress from '@material-ui/core/CircularProgress';
require('highcharts/modules/wordcloud')(Highcharts);

const styles = {
    main: {paddingLeft: 10, paddingRight: 10},
    card: {marginTop: 20, overflow: 'inherit',padding: 16,minHeight: 52}
};

class WordCloud extends PureComponent {
    state = {data : this.props.data}

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({data: this.props.data});
        }
    }

    getChartOptions (data) { 
    
        const options = {
            credits: false,
            title: {
                text: 'Keywords Occurences'
            },
            tooltip: {
                useHTML: true,
                headerFormat: '<table>',
                pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                    '<tr><th>Twitter Detected:</th><td>{point.twitterCount}</td></tr>' +

                    '<tr><th>Websites Detected:</th><td>{point.websiteCount}</td></tr>',
                footerFormat: '</table>',
                followPointer: true
            },
        }

        let datalist = [];
        for (let i in data) {
            let item = data[i];
            if (item.itemCount > 0)
                datalist.push({ name: item.name, weight: item.itemCount,twitterCount:item.twitterCount,websiteCount:item.websiteCount });
        }
        let makeScale = function (domain, range) {
            const minDomain = domain[0];
            const maxDomain = domain[1];
            const rangeStart = range[0];
            const rangeEnd = range[1];
            return (value) => {
                return rangeStart + (rangeEnd - rangeStart) * ((value - minDomain) / (maxDomain - minDomain));
            }
        };

        // Find min and max weight using reduce on data array
        if (datalist && datalist.length > 0) {
            const minWeight = datalist.reduce((min, word) =>
                (word.weight < min ? word.weight : min),
                datalist[0].weight
            );
            const maxWeight = datalist.reduce((max, word) =>
                (word.weight > max ? word.weight : max),
                datalist[0].weight
            );
            const scale = makeScale([minWeight, maxWeight], [0.3, 8]);
            // creating a new, scaled data array
            const scaledData = datalist.map(word =>
                ({
                    name: word.name, weight: word.weight,twitterCount:word.twitterCount,websiteCount:word.websiteCount
                    , color: `rgba(26, 115, 232,${scale(word.weight)})`
                })
            );
            options.series = [
                {
                    type: 'wordcloud',
                    data: scaledData,
                    rotation: {
                        from: 0,
                        to: 0,
                    },
                    animation: false,
                    name: 'Keywords',
                    minFontSize: 7
                }
            ];
        } else {
            options.series = [
                {
                    animation: false,
                    type: 'wordcloud',
                    data: []
                }
            ];
        }
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

    render() {
        const {data} = this.state;
        const options = this.getChartOptions(data);
        return (
            <div style={styles.main}>
                <Card style={styles.card}>
                    {data? this.renderChart(options) : <CircularProgress/>}
                </Card>
            </div>
        );
    }
}

export default WordCloud;
