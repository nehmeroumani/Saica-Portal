import React, { Component } from 'react';
import compose from 'recompose/compose';
import { GET_LIST, GET_MANY, Responsive, withDataProvider } from 'react-admin';
import { connect } from 'react-redux';
// import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import { Redirect } from 'react-router';

class Reports extends Component {
    defaultTab = 'tweets';

    state = {
        selectedRoute: null
    };

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    handleTabChange = (event, value) =>{
        // route between tabs
        if(this.defaultTab != value) 
            this.setState({selectedRoute: `/statistics/${value}`});
    }

    renderTabs = () => {

        const {selectedTab} = this.state;
        const tabs = [
            { id: 'overview', name: 'نظرة عامة' },
            { id: 'users', name: 'الافراد' },
            { id: 'tweets', name: 'التويت' },
        ];

        return (
            <>
                <Tabs
                    fullWidth
                    centered
                    value={this.defaultTab}
                    indicatorColor="primary"
                    onChange={this.handleTabChange}
                >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={choice.name}
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider/>
        </>
        );
    }

    renderTabContent = () => {
        // return <Tweets />;
        return '<Tweets />';
    }

    render() {
        const {selectedRoute} = this.state;
        return (
            <div>
                {selectedRoute? <Redirect to={selectedRoute} /> : 
                <div style={{ marginBottom: '20px', marginTop: '10px' }}>
                    {this.renderTabs()}
                    {this.renderTabContent()}
                    {/* <Grid container spacing={3}>

                        <Grid item xs={12} sm={6}>
                            njbggu
                        </Grid>
                    </Grid> */}
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withDataProvider
)(Reports);
