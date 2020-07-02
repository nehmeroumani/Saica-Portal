import React, { Component } from 'react';
import { GET_LIST, GET_MANY, Responsive, withDataProvider } from 'react-admin';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { AutocompleteInput, DateInput, ReferenceArrayInput, SelectArrayInput, ReferenceArrayField, SingleFieldList, ChipField, ReferenceInput, ReferenceField, SelectInput, List, Datagrid, TextField, Filter, TextInput, BooleanField, BooleanInput } from 'react-admin';
import Statistics from './Statistics';
import WordCloud from './wordCloud';
import Stacked from './Stacked';
import Grid from '@material-ui/core/Grid';
import Chart from './LineChart';
import PieChart from './PieChart';

const styles = {
    flex: {display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

// const UserDataFilter = (props) => (
//     <Filter {...props} >
//         <ReferenceInput sort={{ field: 'itemCount', order: 'DESC' }} key="dictionaryIdFilter"
//          filter={{ themeId: props.themeId}}
//         source="dictionaryId" label="Keywords" reference="dictionary"  alwaysOn>
//             <AutocompleteInput optionText="name" />
//         </ReferenceInput>
//         <DateInput source="fromDate"  key="fromDateFilter" alwaysOn />
//         <DateInput source="toDate"  key="toDateFilter" alwaysOn />

//     </Filter>
// );

class Overview extends Component {
    state = {filter:{}};

    componentDidMount () {
        this.fetchAllData(this.state.filter);
    }

    fetchAllData(filter) {
        this.fetchStatistics(filter);
        this.fetchWordCloud(filter);
        this.fetchTasksLine(filter);
        this.fetchPieChart(filter);
    }

    async fetchStatistics (filter) {
        const { dataProvider } = this.props;
        //     const { data: statistics } = await dataProvider(
        //     GET_LIST,
        //     'statistics',
        //     {
        //         filter: {
        //             statistics: 'statistics',
        //             startdate: filter.fromDate,
        //             enddate: filter.toDate,
        //         },
        //         // sort: { field: 'ItemCount', order: 'DESC' },
        //         // pagination: { page: 1, perPage: 100 },
        //     }
        // );
        // this.setState({
        //     statistics
        // });
        this.setState({
            statistics: {
                completedTasks: 1500,
                pendingTasks: 100,
                percentCompleted: 93.75,
                timeSpent: 16,
                chosenWords: 150,
                precision: 50
            }
        });
    }

    async fetchWordCloud(filter) {
        const { dataProvider } = this.props;
        // const { data: dictionaryCloud } = await dataProvider(
        //     GET_LIST,
        //     'word-cloud',
        //     {
        //         filter: {
        //             statistics: 'statistics',
        //             themeId: theme,
        //             startdate: filter.fromDate,
        //             enddate: filter.toDate,
        //             id: filter.dictionaryId,
        //             twitterAppId: filter.twitterAppId,
        //         },
        //         sort: { field: 'ItemCount', order: 'DESC' },
        //         pagination: { page: 1, perPage: 100 },
        //     }
        // );
        // this.setState({
        //     dictionaryCloud
        // });
        this.setState({
            dictionaryCloud: [{"name":" كورونا","themeCategoryId":"452876d5-3e17-4b21-a0f5-ab7436222722","isMultiple":false,"lang":"ar","itemCount":2171,"count":100,"twitterCount":50,"facebookCount":15,"websiteCount":10,"themeColor":"#963c89","themeIcon":null,"themeName":"public health","themeId":"aa04316f-3af0-4f4c-bf27-c0d1c4686ac4","id":"adeea3c5-aec4-4546-981a-cef737fdac34","lastModified":"2020-03-31T15:39:35.087","displayOrder":0,"isActive":true,"isDeleted":false},{"name":"قانون انتخاب","themeCategoryId":"475523b6-fa5a-4b3c-a5ac-b906e27a29ef","isMultiple":false,"lang":"ar","itemCount":566,"count":0,"twitterCount":0,"facebookCount":0,"websiteCount":0,"themeColor":"123","themeIcon":"add","themeName":"Good Governance","themeId":"7eab8364-1683-4f3c-805f-d179d0428a23","id":"e5aab0ba-1ef9-4023-b225-78834c3f648e","lastModified":"2020-03-31T16:16:17.48","displayOrder":0,"isActive":true,"isDeleted":false},{"name":" وزارة الصحة","themeCategoryId":"452876d5-3e17-4b21-a0f5-ab7436222722","isMultiple":false,"lang":"ar","itemCount":496,"count":15,"twitterCount":0,"facebookCount":15,"websiteCount":0,"themeColor":"#963c89","themeIcon":null,"themeName":"public health","themeId":"aa04316f-3af0-4f4c-bf27-c0d1c4686ac4","id":"9161be45-e0f3-4d98-b2c2-9c7213c2291b","lastModified":"2020-03-31T15:39:35.097","displayOrder":0,"isActive":true,"isDeleted":false},{"name":"وباء كورونا","themeCategoryId":"452876d5-3e17-4b21-a0f5-ab7436222722","isMultiple":false,"lang":"ar","itemCount":363,"count":0,"twitterCount":0,"facebookCount":0,"websiteCount":0,"themeColor":"#963c89","themeIcon":null,"themeName":"public health","themeId":"aa04316f-3af0-4f4c-bf27-c0d1c4686ac4","id":"8720c763-eeae-42ae-8681-904c25b9ab95","lastModified":"2020-03-31T15:39:35.083","displayOrder":0,"isActive":true,"isDeleted":false},{"name":" حرية تعبير","themeCategoryId":"282fa6d2-9a1d-4044-95a0-b34f9e7201bc","isMultiple":false,"lang":"ar","itemCount":338,"count":0,"twitterCount":0,"facebookCount":0,"websiteCount":0,"themeColor":"#963c89","themeIcon":"pencil","themeName":"Freedom of speech","themeId":"0322c85a-c784-427b-8eda-dbbce4b052e1","id":"0dc5dace-49ed-47c7-bfc6-b4dbcc6209be","lastModified":"2020-04-01T14:02:02.613","displayOrder":0,"isActive":true,"isDeleted":false},{"name":"مجلس نيابي","themeCategoryId":"e040eee2-0d58-40d5-ae0e-0c438806a8e7","isMultiple":false,"lang":"ar","itemCount":335,"count":0,"twitterCount":0,"facebookCount":0,"websiteCount":0,"themeColor":"123","themeIcon":"add","themeName":"Good Governance","themeId":"7eab8364-1683-4f3c-805f-d179d0428a23","id":"9baaa97f-23ae-435d-9941-d39587e9951e","lastModified":"2020-04-24T10:43:50.757","displayOrder":0,"isActive":true,"isDeleted":false},{"name":" انتخابات نيابية","themeCategoryId":"475523b6-fa5a-4b3c-a5ac-b906e27a29ef","isMultiple":false,"lang":"ar","itemCount":303,"count":0,"twitterCount":0,"facebookCount":0,"websiteCount":0,"themeColor":"123","themeIcon":"add","themeName":"Good Governance","themeId":"7eab8364-1683-4f3c-805f-d179d0428a23","id":"45eef00c-e583-4e2d-82e7-44a6d2a017a8","lastModified":"2020-03-31T16:16:17.483","displayOrder":0,"isActive":true,"isDeleted":false},{"name":"مازوت","themeCategoryId":"29e9b0d5-6ccf-4f9b-9a8b-8ca46af58700","isMultiple":false,"lang":"ar","itemCount":195,"count":0,"twitterCount":0,"facebookCount":0,"websiteCount":0,"themeColor":"#3c4496","themeIcon":"","themeName":"Energy,Gas&Oil","themeId":"c93549da-db4a-4183-8395-83eed7e41e0d","id":"5b901b6a-f11f-4fc3-8016-15c3367e9a9c","lastModified":"2020-04-28T10:35:05.083","displayOrder":0,"isActive":true,"isDeleted":false},{"name":" خطة الكهرباء","themeCategoryId":"29e9b0d5-6ccf-4f9b-9a8b-8ca46af58700","isMultiple":false,"lang":"ar","itemCount":158,"count":0,"twitterCount":0,"facebookCount":0,"websiteCount":0,"themeColor":"#3c4496","themeIcon":"","themeName":"Energy,Gas&Oil","themeId":"c93549da-db4a-4183-8395-83eed7e41e0d","id":"6449c20c-f56f-4736-a452-e18ee5d78d2b","lastModified":"2020-03-31T16:27:35.593","displayOrder":0,"isActive":true,"isDeleted":false},{"name":"  وزير الصحة","themeCategoryId":"452876d5-3e17-4b21-a0f5-ab7436222722","isMultiple":false,"lang":"ar","itemCount":150,"count":0,"twitterCount":0,"facebookCount":0,"websiteCount":0,"themeColor":"#963c89","themeIcon":null,"themeName":"public health","themeId":"aa04316f-3af0-4f4c-bf27-c0d1c4686ac4","id":"775692d3-ab02-4232-820c-23f6bff1ffdc","lastModified":"2020-03-31T15:39:35.097","displayOrder":0,"isActive":true,"isDeleted":false},{"name":" حرية الاعلام","themeCategoryId":"282fa6d2-9a1d-4044-95a0-b34f9e7201bc","isMultiple":false,"lang":"ar","itemCount":137,"count":0,"twitterCount":0,"facebookCount":0,"websiteCount":0,"themeColor":"#963c89","themeIcon":"pencil","themeName":"Freedom of speech","themeId":"0322c85a-c784-427b-8eda-dbbce4b052e1","id":"7c96d559-336c-4dc2-8032-54fe8037a707","lastModified":"2020-04-01T14:02:02.57","displayOrder":0,"isActive":true,"isDeleted":false},{"name":" خصوصية","themeCategoryId":"282fa6d2-9a1d-4044-95a0-b34f9e7201bc","isMultiple":false,"lang":"ar","itemCount":134,"count":0,"twitterCount":0,"facebookCount":0,"websiteCount":0,"themeColor":"#963c89","themeIcon":"pencil","themeName":"Freedom of speech","themeId":"0322c85a-c784-427b-8eda-dbbce4b052e1","id":"137c471c-7ec3-41ff-a129-3d1f9e97d16e","lastModified":"2020-04-01T14:02:02.613","displayOrder":0,"isActive":true,"isDeleted":false}]
        })
    }

    async fetchTasksLine(filter) {
        const { dataProvider } = this.props;
        // const { data: tasksLine } = await dataProvider(
        //     GET_LIST,
        //     'tasks',
        //     {
        //         filter: {
        //             themeId: theme,
        //             statistics: 'statistics',
        //             startdate: filter.fromDate,
        //             enddate: filter.toDate,
        //             twitterAppId: filter.twitterAppId,
        //             dictionaryId: filter.dictionaryId
        //         },

        //         sort: { field: 'publicId', order: 'DESC' },
        //         pagination: { page: 1, perPage: 100 },
        //     }
        // );
        // this.setState({
        //     tasksLine
        // });
        this.setState({
            tasksLine: [{"date":"2020/04/24","count":30,"factStatus":null,"text":null,"appName":null,"evaluation":0,"tweetCreationDate":"0001-01-01T00:00:00","userId":null,"twitterAppId":null,"userName":null,"userScreenName":null,"userProfileImageUrl":null,"userLocation":null,"userFollowerCount":0,"retweetCount":0,"favoriteCount":0,"keywords":null,"images":null,"videos":null,"isRetweet":false,"originalUser":null,"twitterApp":null,"dictionaryLabel_ids":null,"tag_ids":null,"twitterAppName":null,"twitterAppPhoto":null,"firstDictionaryId":null,"themeDetected":false,"factTypes":null,"factsDetected":null,"factTypes_ids":null,"factTypeId":null,"factTypeName":null,"factDetectedCount":0,"id":null,"lastModified":"0001-01-01T00:00:00","displayOrder":0,"isActive":false,"isDeleted":false},{"date":"2020/04/25","count":11,"factStatus":null,"text":null,"appName":null,"evaluation":0,"tweetCreationDate":"0001-01-01T00:00:00","userId":null,"twitterAppId":null,"userName":null,"userScreenName":null,"userProfileImageUrl":null,"userLocation":null,"userFollowerCount":0,"retweetCount":0,"favoriteCount":0,"keywords":null,"images":null,"videos":null,"isRetweet":false,"originalUser":null,"twitterApp":null,"dictionaryLabel_ids":null,"tag_ids":null,"twitterAppName":null,"twitterAppPhoto":null,"firstDictionaryId":null,"themeDetected":false,"factTypes":null,"factsDetected":null,"factTypes_ids":null,"factTypeId":null,"factTypeName":null,"factDetectedCount":0,"id":null,"lastModified":"0001-01-01T00:00:00","displayOrder":0,"isActive":false,"isDeleted":false},{"date":"2020/04/26","count":21,"factStatus":null,"text":null,"appName":null,"evaluation":0,"tweetCreationDate":"0001-01-01T00:00:00","userId":null,"twitterAppId":null,"userName":null,"userScreenName":null,"userProfileImageUrl":null,"userLocation":null,"userFollowerCount":0,"retweetCount":0,"favoriteCount":0,"keywords":null,"images":null,"videos":null,"isRetweet":false,"originalUser":null,"twitterApp":null,"dictionaryLabel_ids":null,"tag_ids":null,"twitterAppName":null,"twitterAppPhoto":null,"firstDictionaryId":null,"themeDetected":false,"factTypes":null,"factsDetected":null,"factTypes_ids":null,"factTypeId":null,"factTypeName":null,"factDetectedCount":0,"id":null,"lastModified":"0001-01-01T00:00:00","displayOrder":0,"isActive":false,"isDeleted":false}]
        });
    }

    async fetchPieChart(filter) {
        const { dataProvider } = this.props;
        // const { data: pieChartData } = await dataProvider(
        //     GET_LIST,
        //     'pieChartData',
        //     {
        //         filter: {
        //             themeId: theme,
        //             statistics: 'statistics',
        //             startdate: filter.fromDate,
        //             enddate: filter.toDate,
        //             twitterAppId: filter.twitterAppId,
        //             dictionaryId: filter.dictionaryId
        //         },

        //         sort: { field: 'publicId', order: 'DESC' },
        //         pagination: { page: 1, perPage: 100 },
        //     }
        // );
        // this.setState({
        //     pieChartData
        // });
        this.setState({
            pieChartData: [{
                name: 'Chrome',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: 'Internet Explorer',
                y: 11.84
            }, {
                name: 'Firefox',
                y: 10.85
            }, {
                name: 'Edge',
                y: 4.67
            }, {
                name: 'Safari',
                y: 4.18
            }, {
                name: 'Sogou Explorer',
                y: 1.64
            }, {
                name: 'Opera',
                y: 1.6
            }, {
                name: 'QQ',
                y: 1.2
            }, {
                name: 'Other',
                y: 2.61
            }]
        });
    }
   
    render() {
        const { ...props } = this.props;
        props.setFilters = this.setFilters
        const {statistics, dictionaryCloud, tasksLine, pieChartData} = this.state;
        return (
            <div>
                {/* <div style={{ marginBottom: '20px', marginTop: '10px' }}>
                    <UserDataFilter {...props} />
                </div> */}
                <div>
                    <Statistics data={statistics} />
                </div>
                <div className={styles.root}>
                    <Grid container >
                        <Grid item xs={12} sm={6}>
                            <Chart data={tasksLine} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <WordCloud data={dictionaryCloud} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stacked data={dictionaryCloud} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PieChart data={pieChartData} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    setFilters = (filter) => {
        if (filter && filter.fromDate == null)
            filter.fromDate = '';
        if (filter && filter.toDate == null)
            filter.toDate = '';
        if(filter.fromDate !=this.state.filter.fromDate
            || filter.toDate !=this.state.filter.toDate
            ){
            this.setState({ filter: filter });
            this.fetchAllData(filter)
        }
    };
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withDataProvider
)(Overview);
