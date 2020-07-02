import React, { Fragment, Component } from 'react';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { GET_LIST, GET_MANY, Responsive, withDataProvider } from 'react-admin';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
// import ReviewEdit from './ReviewEdit';
// import AccountReferenceField from './account/AccountReferenceField';
import Typography from '@material-ui/core/Typography';
import TweetsCard from "./TweetsCard";
import { createStyles, withStyles } from '@material-ui/core/styles';
// import Tweets from './TweetStats';
// import PendingStats from './PendingStats';
// import ValidatedStats from './ValidatedStats';
// import TopStats from './TopStats';
import ItemDrawer from './drawer/ItemDrawer'

import { DateInput, AutocompleteInput, ReferenceArrayInput, SelectArrayInput, ReferenceArrayField, SingleFieldList, ChipField, ReferenceInput, ReferenceField, SelectInput, List, Datagrid, TextField, Filter, TextInput, BooleanField, BooleanInput } from 'react-admin';
const UserFilter = (props) => (
    <Filter {...props}>

        <ReferenceInput source="tweetAccountId" label="Account" alwaysOn
            // sort={{ field: 'tweetsThemeCount', order: 'DESC' }}
            reference="tweetAccount" filterToQuery={q => ({ displayName: q })} >
            <AutocompleteInput optionText="displayName" />
        </ReferenceInput>

        <TextInput label="Search" source="text" />

    </Filter>
);


const styles = theme =>
    createStyles({
        // root: {
        //     display: 'flex',
        // },
        list: {
            flexGrow: 1,
            transition: theme.transitions.create(['all'], {
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        },
        listWithDrawer: {
            // marginRight: 400,
        }, headerRow: {
            borderLeftColor: 'white',
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        }   
    });


class TweetsList extends Component {
    state = {};
    // async fetchData(filter) {
    //     this.fetchTweetsCount();
    //     this.fetchTopTheme();
    //     this.fetchFactPending();
    //     this.fetchFactValidated();
    // }

    // async fetchTweetsCount(filter) {
    //     const { dataProvider } = this.props;
    //     const { total: totalTweets } = await dataProvider(GET_LIST, 'tweet',
    //         { filter: { count: 'count' }, sort: { field: 'tweetCreationDate', order: 'DESC' }, pagination: { page: 1, perPage: 1 } });
    //     this.setState({ totalTweets });
    // }

   
    componentDidMount() {
       // this.fetchData({});
    }

    componentDidUpdate(prevProps) {
        // handle refresh
        // if (this.props.version !== prevProps.version) {
        //     this.fetchData({});
        // }
    }

    render() {
        const { classes, ...props } = this.props;
        //const nbTweets = this.state.totalTweets;
        const { pendingTweets: pendingTweets, totalTweets: nbTweets, validatedTweets: validatedTweets, themes: themes }

            = this.state
        return (
            <div className={classes.root}>
                <Route path="/tweet/:id">
                    {({ match }) => {
                        const isMatch = !!(
                            match &&
                            match.params &&
                            match.params.id !== 'create'
                        );

                        return (
                            <div>

                                {/* 
                                <div style={styless.flex}>
                                    <Tweets value={nbTweets} />
                                    <PendingStats value={pendingTweets} />
                                    <ValidatedStats value={validatedTweets} />
                                    <TopStats value={themes} />

                                </div>

                                <br></br> */}
                                <Fragment>
                                    <List {...props} perPage={16} sort={{ field: 'id', order: 'ASC' }}
                                        className={classnames(classes.list, {
                                            [classes.listWithDrawer]: isMatch,
                                        })}
                                        filters={<UserFilter />}>

                                        <TweetsCard />
                                    </List>
                                    <Drawer
                                        variant="persistent"
                                        open={isMatch}
                                        anchor="right"
                                        onClose={this.handleClose}
                                        classes={{
                                            paper: classes.drawerPaper,
                                        }}
                                    >
                                        {/* To avoid any errors if the route does not match, we don't render at all the component in this case */}
                                        {isMatch ? (
                                            <>   <ItemDrawer
                                                id={match.params.id}
                                                onCancel={this.handleClose}
                                                onMouseUp={this.handleMouseUp}
                                                {...props}
                                            />

                                            </>
                                        ) : null}
                                    </Drawer>
                                </Fragment>
                            </div>
                        );
                    }}
                </Route>
            </div>
        );
    }

    handleClose = () => {
        this.props.push('/tweet');
    };
}

// export default compose(
//     connect(
//         undefined,
//         { push }
//     ),
//     withStyles(styles)
// )(TweetsList);


const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps, { push }),
    withStyles(styles),
    withDataProvider
)(TweetsList);
