import React from 'react';
import { AppBar, UserMenu, MenuItemLink, withTranslate } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from '@material-ui/core/styles';
import ResetMenuItem from './ResetMenuItem';

import Logo from './Logo';

const styles = {
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
};

const CustomUserMenu = (props) => {
    const {translate} = props;
    return <UserMenu {...props}>
        <MenuItemLink
            to="/configuration"
            primaryText={translate('resources.general.configuration')}
            leftIcon={<SettingsIcon />}
        />
        <ResetMenuItem {...props} />
    </UserMenu>
};

const CustomAppBar = (props) => {
    const {translate, classes } = props;
    return <AppBar {...props} 
        userMenu={<CustomUserMenu {...props} />}>
        <Typography
            variant="title"
            color="inherit"
            className={classes.title}
            // id="react-admin-title"
            >
                <a style={{color:'white',textDecoration:'none',fontSize: '16px'}} href='#/'>
                    {translate('resources.general.appname')}</a>
                </Typography>
        
        <Logo />
        <span className={classes.spacer} />
    </AppBar>;
};

export default withStyles(styles)(withTranslate(CustomAppBar));
