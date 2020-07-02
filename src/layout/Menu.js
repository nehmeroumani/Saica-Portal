import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';
import ShortTextIcon from '@material-ui/icons/WrapText';
import LabelIcon from '@material-ui/icons/Label';
import { withRouter } from 'react-router-dom';
import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
    WithPermissions
} from 'react-admin';

//import FacebookIcon from '@material-ui/icons/Facebook';

import users from '../users';
import dimensions from '../dimension';
import categorys from '../category';
import twitter from '../twitter';
import statistics from '../statistics';
import annotations from "../annotation/annotation"
import SubMenu from './SubMenu';

class Menu extends Component {
    state = {
        menuTwitter: false,
        menuSettings: false,
        menuWebsites: false,
        menuFactTypes: false
    };

    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    handleToggle = menu => {
        this.setState(state => ({ [menu]: !state[menu] }));
    };

    render() {
        const { onMenuClick, open, logout, translate, permissions } = this.props;
        return (
            <div>
                {' '}
                
                {/* <WithPermissions
                    render={({ permissions }) => (
                        permissions === 'admin'
                            ? (<> 
                            <DashboardMenuItem onClick={onMenuClick} />
                <MenuItemLink
                    to={`/annotationTaskUserTweet`}
                    primaryText={translate('resources.annotations.name')}
                    leftIcon={<annotations.icon />}
                    onClick={onMenuClick}
                />
                                <MenuItemLink
                                    to={`/statistics`}
                                    primaryText={translate('resources.reporting.name')}
                                    leftIcon={<statistics.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/annotationtask`}
                                    primaryText={translate('resources.annotations.annotationtask')}
                                    leftIcon={<statistics.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/tweet`}
                                    primaryText={translate('resources.twitter.name')}
                                    leftIcon={<twitter.icon />}
                                    onClick={onMenuClick}
                                />

                                <MenuItemLink
                                    to={`/dimension`}
                                    primaryText={translate('resources.dimension.name')}
                                    leftIcon={<dimensions.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/category`}
                                    primaryText={translate('resources.category.name')}
                                    leftIcon={<categorys.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                to={`/users`}
                                primaryText={translate('resources.users.name')}
                                leftIcon={<users.icon />}
                                onClick={onMenuClick}
                            />
                                </>)

                            : null
                    )}
                />              

                <Responsive
                    small={logout}
                    medium={null} // Pass null to render nothing on larger devices
                />  */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {}
    ),
    translate
);

export default enhance(Menu);
