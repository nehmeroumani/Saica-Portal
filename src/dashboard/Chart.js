import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import DollarIcon from '@material-ui/icons/Sms';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import CardIcon from './CardIcon';
const options = {
    responsive: {
        rules: [{
            condition: {
               // maxWidth: 500
            }
        }
        ]
    },
    chart: {
        type: 'line'
    },
    title: {
        text: 'Tweets/Articles'
    },
    // subtitle: {
    //     text: 'Source: WorldClimate.com'
    // },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Posts'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Tweets',
        data: [70, 69, 95, 145, 184, 215, 252, 265, 233, 183, 139, 96]
    }, {
        name: 'Articles',
        data: [39, 42, 57, 85, 119, 152, 170, 166, 142, 103, 66, 48]
    }]
}
const styles = {
    main: {
        //flex: '1',
        //marginRight: '1em',
        marginTop: 20,
    },
    card: {
        overflow: 'inherit',
        padding: 16,
        minHeight: 52,
    },
};

const Tweets = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <Card className={classes.card}>

            <div style={{ width: "90%" }}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>

        </Card>
    </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(Tweets);
