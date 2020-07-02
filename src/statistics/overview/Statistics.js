import React from 'react';
import Card from '@material-ui/core/Card';
import { GET_LIST, GET_MANY, Responsive, withDataProvider } from 'react-admin';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { translate } from 'react-admin';

const styles = {
    main: { paddingLeft: 10, paddingRight: 10 },
    card: {
        padding: '10px',
        marginTop: '20px'
    },
    item: {
        marginLeft: '25px',
        marginRight: '25px'
    }
};

class Statistics extends React.Component {
    state = {
        userId: this.props.userId,
        status_agregates:[],
        data: {
            completedTasks: 1500,
            pendingTasks: 100,
            percentCompleted: 93.75,
            timeSpent: 16,
            chosenWords: 150,
            precision: 50
        }
    }
    componentDidMount() {
             this.fetchData(this.props.userId);
        
    }
    componentDidUpdate(prevProps) {
        if (this.props.userId !== prevProps.userId) {
             this.fetchData(this.props.userId);
        }
    }

    async fetchData(userId) {
        const { dataProvider } = this.props;
        const { data: status_agregates } = await dataProvider(GET_LIST, 'annotationTaskUserTweet',
            {
                filter: { 'UserId': userId, 'statistics-status': 'statistics-status' },
                sort: { field: 'Status', order: 'ASC' },
                pagination: { page: 1, perPage: 30 },
            });
        this.setState({ status_agregates,userId:userId });
    }

    renderStatistics(data) {
        let doneTasks = 0;
        let remainingTasks = 0;
        let donePercentageTasks = 0;
        let duration = 0;
        let averagePerTweet = 0;
        let avgLevelOfConfidence = 0;
        const status_agregates = this.state.status_agregates;
        if (status_agregates) {
            let doneRecord = status_agregates.filter(x => x.status == 30)[0]
            if (doneRecord) {
                doneTasks = doneRecord.totalTasks;
                avgLevelOfConfidence =  doneRecord.avgLevelOfConfidence;
                averagePerTweet =  (doneRecord.avgTaskDuration/ 60).toFixed(2);
                let allTasks = 0;

                for (let i = 0; i < status_agregates.length; i++) {
                    allTasks += status_agregates[i].totalTasks;
                }
                remainingTasks = allTasks - doneTasks;
                duration = (doneRecord.totalTaskDuration / 60).toFixed(2);
                donePercentageTasks = doneRecord.percentage.toFixed(2);
            }
        };

        return (
            <div className={"instructions"}>
                <div className={'sp-align-content-center'}>
                    <div className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{doneTasks}
                        </div>
                        <div className={'sp-stat-title'}> {this.props.translate('resources.statistics.tweetDone')}</div>
                    </div>

                    <div className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{remainingTasks}</div>
                        <div className={'sp-stat-title'}>{this.props.translate('resources.statistics.tweetRemaining')}</div>
                    </div>

                    <div className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{donePercentageTasks}%</div>
                        <div className={'sp-stat-title'}>{this.props.translate('resources.statistics.donePercentage')}                          
                            </div>
                    </div>

                    <div className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{duration}</div>
                        <div className={'sp-stat-title'}>{this.props.translate('resources.statistics.workMinutes')}  
                            </div>
                    </div>

                    <div className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{averagePerTweet}</div>
                        <div className={'sp-stat-title'}>{this.props.translate('resources.statistics.averagePerTweet')}  
                            </div>
                    </div>
                    <div className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{avgLevelOfConfidence}</div>
                        <div className={'sp-stat-title'}>{this.props.translate('resources.statistics.avgLevelOfConfidence')}  
                            </div>
                    </div>
                </div>
            </div>

        );
    }

    render() {
        const { data } = this.state;
        return (
            <div style={styles.main}>
                <Card style={styles.card}>
                    {data ? this.renderStatistics(data) : <CircularProgress />}
                </Card>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});
export default compose(
    connect(mapStateToProps),
    translate,
    withDataProvider
)(Statistics);

