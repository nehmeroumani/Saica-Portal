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
        flex: 1,
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
        <CardHeader title={'Latest Articles'} />
        <List dense={true}   >
            {
                orders.map(record => (
                    customers[record.websiteId] && <ListItem
                        key={record.id}
                        button
                        component={Link}
                        to={`/websiteArticle/${record.id}`}
                    >
                        {customers[record.websiteId] ? (
                            <Avatar
                                className={classes.avatar}
                                src={customers[record.websiteId].photo}
                            />
                        ) : ''
                        }
                        <ListItemText className="arabic"
                            secondary={record.title}
                            primary={customers[record.websiteId] ? customers[record.websiteId].domain : ""}
                        />
                        {/* <ListItemSecondaryAction>
                    <span className={classes.cost}>{new Date(record.createdTime).toLocaleDateString()}</span>
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
