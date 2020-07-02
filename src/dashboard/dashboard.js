import React, { Component } from 'react';
import { GET_LIST, GET_MANY, Responsive, withDataProvider } from 'react-admin';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import { Redirect } from 'react-router';
import CardIcon from './CardIcon';
import PieChart from '@material-ui/icons/PieChart';

import ShoppingCartIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';
import twitter from '../twitter';
import UserIcon from '@material-ui/icons/People';
import SmsIcon from '@material-ui/icons/Sms';
import ExtensionIcon from '@material-ui/icons/Extension';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import { Link } from 'react-router-dom';
import analytics from "../helpers/analytics";

const styles = {
    flex: { margin: '50px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
    flexColumn: {
        // display: 'flex', flexDirection: 'column'
    },
    leftCol: {
        // flex: 1, marginRight: '1em' 
    },
    rightCol: {
        //  flex: 1, marginLeft: '1em' 
    },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: '2em',
        textAlign: 'center',
        // color: theme.palette.text.secondary,
    },
    main: {
        width: '350px',
        marginLeft: '1em',
        marginTop: 70,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};
const Tasks = ({ value, translate }) => (
    <div style={styles.main}>
        <a href='#/annotationTask' className='sp-link'>
            <CardIcon Icon={ShoppingCartIcon} bgColor="#933c96" />
            <Card style={styles.card}>
                <Typography style={styles.title} color="textSecondary">
                {translate('resources.annotations.name')}                  
                </Typography>
                <Typography variant="headline" component="h2">
                    {value}
                </Typography>
            </Card>
        </a>
    </div>
);


const Twitter = ({ value, translate }) => (
    <div style={styles.main}>
        <Link  
          to={{
            pathname: '/tweet'                    
        }}  
        
        className='sp-link'> 
        
         <CardIcon Icon={twitter.icon} bgColor="#1da1f2" />
            <Card style={styles.card}>
                <Typography style={styles.title} color="textSecondary">
                    {translate('resources.twitter.name')}
                </Typography>
                <Typography variant="headline" component="h2">
                    {value}
                </Typography>
            </Card>  </Link >
    </div>
);


const Reports = ({ value, translate }) => (
    <div style={styles.main}>
        <a href='#/statistics/overview' className='sp-link'>
            <CardIcon Icon={PieChart} bgColor="#ff9800" />
            <Card style={styles.card}>
                <Typography style={styles.title} color="textSecondary">
                    {translate('resources.reporting.name')}

                </Typography>
                <Typography variant="headline" component="h2">
                    {value}
                </Typography>
            </Card>  </a>
    </div>
);

const Users = ({ value, translate }) => (
    <div style={styles.main}>
        <a  href='#/users' className='sp-link'>   <CardIcon Icon={UserIcon} bgColor="#31708f" />
            <Card style={styles.card}>
                <Typography style={styles.title} color="textSecondary">
                    {translate('resources.users.name')}
                </Typography>
                <Typography variant="headline" component="h2">
                    {value}
                </Typography>
            </Card>  </a>
    </div>
);
const Annotations = ({ value, translate }) => (
    <div style={styles.main}>
        <a href='#/annotationTaskUserTweet' className='sp-link'>   <CardIcon Icon={SmsIcon} bgColor="#f44336" />
            <Card style={styles.card}>
                <Typography style={styles.title} color="textSecondary">
                    {translate('resources.annotations.monitor')}
                </Typography>
                <Typography variant="headline" component="h2">
                    {value}
                </Typography>
            </Card>  </a>
    </div>
);


const Categories = ({ value, translate }) => (
    <div style={styles.main}>
                <Link  
                 to={{
                    pathname: '/category'                    
                }}                
               
                className='sp-link'> 

            <CardIcon Icon={ExtensionIcon} bgColor="#4caf50" />
            <Card style={styles.card}>
                <Typography style={styles.title} color="textSecondary">
                    {translate('resources.category.name')}
                </Typography>
                <Typography variant="headline" component="h2">
                    {value}
                </Typography>
            </Card>
        </Link>

    </div>
);

const Levels = ({ value, translate }) => (
    <div style={styles.main}>
                <Link  
                 to={{
                    pathname: '/levelOfConfidence'                    
                }}                
               
                className='sp-link'> 

            <CardIcon Icon={QuestionAnswer} bgColor="#ffd560" />
            <Card style={styles.card}>
                <Typography style={styles.title} color="textSecondary">
                    {translate('resources.levelOfConfidence.name')}
                </Typography>
                <Typography variant="headline" component="h2">
                    {value}
                </Typography>
            </Card>
        </Link>

    </div>
);
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { totalTasks: 0 };
        this.redirect = null;
        if (localStorage.role !== 'admin' && localStorage.nextAnnotationId) {
            this.redirect = `/annotationTaskUserTweet/${localStorage.nextAnnotationId}`;
            // localStorage.removeItem('nextAnnotationId');
        }
        analytics.logPageView('Dashboard');
    }

    componentDidMount() {
        this.fetchData();
    }
    async fetchTweetsCount() {
        const { dataProvider } = this.props;
        const { total: totalTweets } = await dataProvider(GET_LIST, 'tweet',
            { filter: {  count: 'count' }, sort: { field: 'id', order: 'ASC' }, pagination: { page: 1, perPage: 1 } });
        this.setState({ totalTweets });
    }
    async fetchTasksCount() {
        const { dataProvider } = this.props;
        const { total: totalTasks } = await dataProvider(GET_LIST, 'annotationtask',
            { filter: {  count: 'count' }, sort: { field: 'id', order: 'ASC' }, pagination: { page: 1, perPage: 1 } });
        this.setState({ totalTasks });
    }
    async fetchAnnotationTaskUserTweet() {
        const { dataProvider } = this.props;
        const { total: totalAnnotations } = await dataProvider(GET_LIST, 'annotationTaskUserTweet',
            { filter: {  count: 'count' }, sort: { field: 'id', order: 'ASC' }, pagination: { page: 1, perPage: 1 } });
        this.setState({ totalAnnotations });
    }
    async fetchUsersCount() {
        const { dataProvider } = this.props;
        const { total: totalUsers } = await dataProvider(GET_LIST, 'users',
            { filter: {  count: 'count' }, sort: { field: 'id', order: 'ASC' }, pagination: { page: 1, perPage: 1 } });
        this.setState({ totalUsers });
    }
    async fetchCategorysCount() {
        const { dataProvider } = this.props;
        const { total: totalCategorys } = await dataProvider(GET_LIST, 'category',
            { filter: {  count: 'count' }, sort: { field: 'id', order: 'ASC' }, pagination: { page: 1, perPage: 1 } });
        this.setState({ totalCategorys });
    }
    async fetchLevelsCount() {
        const { dataProvider } = this.props;
        const { total: totallevelOfConfidences } = await dataProvider(GET_LIST, 'levelOfConfidence',
            { filter: {  count: 'count' }, sort: { field: 'id', order: 'ASC' }, pagination: { page: 1, perPage: 1 } });
        this.setState({ totallevelOfConfidences });
    }
    fetchData() {
        console.log("fetchAllData");
        this.fetchTweetsCount();
        this.fetchTasksCount();
        this.fetchAnnotationTaskUserTweet();
        this.fetchUsersCount();
        this.fetchCategorysCount();
        this.fetchLevelsCount();
      
    }
    componentDidUpdate(prevProps) {
        // handle refresh
        if (this.props.version !== prevProps.version) {
            //  this.fetchData({});
        }
    }


    render() {

        const { totalTasks ,totalTweets,totalCategorys,totalAnnotations,totalUsers,totallevelOfConfidences} = this.state;

        return (
            <>
                {(this.redirect) ? <Redirect to={this.redirect} /> :
                    <div style={styles.flex}>
                        {<Tasks value={totalTasks} translate={this.props.translate} />}
                        {/* {<Annotations value={totalAnnotations} translate={this.props.translate} />} */}
                        {<Reports value={3} translate={this.props.translate} />}
                        {<Twitter value={totalTweets} translate={this.props.translate} />}                      
                        {<Users value={totalUsers} translate={this.props.translate} />}
                        {<Categories value={totalCategorys} translate={this.props.translate} />}
                        {/* {<Levels value={totallevelOfConfidences} translate={this.props.translate} />} */}
                        


                    </div>
                }
            </>
        );
    }
    setFilters = (filter) => {
        //console.log(filter);
        if (filter.twitterAppId == null)
            filter.twitterAppId = '';
        if (filter.dictionaryid == null)
            filter.dictionaryid = '';
        this.fetchData(filter)
    };
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    translate,
    withDataProvider
)(Dashboard);
