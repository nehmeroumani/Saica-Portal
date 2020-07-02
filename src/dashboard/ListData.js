import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';

const style = theme => ({
    root: {
        flex: 1, marginRight: '20px',
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
    cost: {
        marginRight: '1em',
        color: theme.palette.text.primary,
    },
});

const ListData = ({ orders = [], customers = {}, translate, classes }) => (
    <Card className={classes.root}>
        <CardHeader title={'Latest Annotations'} />
        <List dense={true}   > 
            {orders.map(record => (
                <ListItem
                    key={record.id}
                    button
                    component={Link}
                    to={`/tweet/${record.id}`}
                >
                        <Avatar
                            className={classes.avatar}
                            src={record.userProfileImageUrl}
                        />
                   
                    
                    <ListItemText className="arabic"
                       secondary ={record.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')}
                        primary    ={customers[record.twitterAppId] ?customers[record.twitterAppId].userScreenName:""}
                    />
                    {/* <ListItemSecondaryAction>
                        <span className={classes.cost}>{new Date(record.tweetCreationDate).toLocaleDateString()}</span>
                    </ListItemSecondaryAction> */}
                </ListItem>
            ))}
        </List>
    </Card>
);

const enhance = compose(
    withStyles(style),
    translate
);

export default enhance(ListData);
