import React, { Component } from 'react';
import compose from 'recompose/compose';
import { GET_LIST, GET_MANY, Responsive, withDataProvider } from 'react-admin';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import { Redirect } from 'react-router';
import Overview from './overview';
import PageDrawer from '../../components/pageDrawer';
import FilterListIcon from '@material-ui/icons/FilterList';
import Filter from '../filter';

class Reports extends Component {
    defaultTab = 'overview';

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
        return <Overview />;
    }

    filterChange = (filters) => {
        console.log('Filters change');
        console.log(filters);
    }

    renderPageFilter = () => {
        return (
            <PageDrawer 
                title={"فلتر"}
                icon={<FilterListIcon/>}
                outerBtnClassName={'sp-report-filter-outerbtn'}
                pagedrawerClassName={'sp-report-filter-innercontent'}
            >
                <Filter filterChange={this.filterChange}/>
            </PageDrawer>
        );
    }

    renderPageContent = ()=> {
        return (
            <>
                <div style={{ marginBottom: '20px', marginTop: '10px' }}>
                    {this.renderTabs()}
                    {this.renderTabContent()}
                </div>
                {this.renderPageFilter()}
            </>
        );
    }

    render() {
        const {selectedRoute} = this.state;
        return (
            <div className="d-flex position-relative">
                {selectedRoute? <Redirect to={selectedRoute} /> : this.renderPageContent()}
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
