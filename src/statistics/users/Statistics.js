import React from 'react';
import Card from '@material-ui/core/Card';
import { translate } from 'react-admin';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    main: {paddingLeft: 10, paddingRight: 10},
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
    state = {data : this.props.data}

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({data: this.props.data});
        }
    }

    renderStatistics (data) {
        //@todo translate the titles below 
        // const { translate} = this.props;

        return (
            <div className={"instructions"}>
                <div className={'sp-align-content-center'}>

                    <div style={styles.item} className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{data.completedTasks}</div>
                        <div className={'sp-stat-title'}>مهمة منجزة</div>
                    </div>

                    <div style={styles.item} className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{data.pendingTasks}</div>
                        <div className={'sp-stat-title'}>مهمة متبقية</div>
                    </div>

                    <div style={styles.item} className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{data.percentCompleted}%</div>
                        <div className={'sp-stat-title'}>النسبة المنجزة</div>
                    </div>

                    <div style={styles.item} className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{data.timeSpent} دقيقة</div>
                        <div className={'sp-stat-title'}>دقيقة مصروفة</div>
                    </div>

                    <div style={styles.item} className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{data.chosenWords}</div>
                        <div className={'sp-stat-title'}>كلمة مختارة  </div>
                    </div>

                    <div style={styles.item} className={'sp-stat-container'}>
                        <div className={'sp-stat-value'}>{data.precision}%</div>
                        <div className={'sp-stat-title'}> مستوى الدقة  </div>
                    </div>

                </div>
            </div>

        );
    }

    render () {
        const { data } = this.state;
        return (
            <div style={styles.main}>
                <Card style={styles.card}>
                    {data? this.renderStatistics(data) :  <CircularProgress />}
                </Card>
            </div>
        );
    }
}

export default Statistics;
