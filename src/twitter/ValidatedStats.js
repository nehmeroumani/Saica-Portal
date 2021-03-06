import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import ShoppingCartIcon from '@material-ui/icons/Public';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';

import CardIcon from './CardIcon';

const styles = {
    main: {
        flex: '1',
        marginLeft: '1em',
        marginTop: 20,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};

const Articles = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={ShoppingCartIcon} bgColor="#38a169" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {"Labeled"}
            </Typography>
            <Typography variant="headline" component="h2">
                {value}
            </Typography>
        </Card>
    </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(Articles);
