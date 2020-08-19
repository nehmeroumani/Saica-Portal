import React from 'react';
import { connect } from 'react-redux';
import { Layout, Sidebar, WithPermissions } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';
import { ArabiclightTheme, englishLightTheme } from './themes';
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

const CustomSidebar = props =>
    <WithPermissions
        render={({ permissions }) => (
            permissions === 'admin'
                ?
                <Sidebar {...props} size={10} /> :
                <Sidebar {...props} size={10} />)}
    />
const CustomLayout = props => (
    <JssProvider jss={jss} generateClassName={generateClassName}>
        <Layout {...props} appBar={AppBar} sidebar={CustomSidebar} menu={Menu} />
    </JssProvider>)

export default connect(
    state => ({
        theme: localStorage.getItem('lang') === 'en' ? englishLightTheme : ArabiclightTheme,
    }),
    {}
)(CustomLayout);
