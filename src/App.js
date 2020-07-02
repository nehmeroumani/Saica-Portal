import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import logo from './logo.svg';
import './App.css';

import dataProvider from './provider/dataProvider';
import authProvider from './provider/authProvider';
import arabicMessages from './i18n/ar';
import englishMessages from './i18n/en';
import { Dashboard } from './dashboard';
import users from './users';
import levelOfConfidence from './levelOfConfidence';
import annotationtasks from './annotation/annotationTask';
import annotations from './annotation/annotation';



import categorys from './category';
import dimensions from './dimension';
import twitter from './twitter';
import twitterApp from './twitter/account';
import themeReducer from './themeReducer';
import { Login, newLayout } from './layout';
import statisticsOverview from './statistics/overview';
import statisticsUsers from './statistics/users';
import statisticsTweets from './statistics/tweets';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import customRoutes from './routes';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-163757365-1');

// const themeUI = createMuiTheme({
//     direction: 'rtl', // Both here and <body dir="rtl">,
//     palette: {
//         type: 'dark', // Switching the dark mode on is a single property value change.
//       }
//   });


const i18nProvider = locale => {
    if (locale == 'en') {
        return englishMessages;
    }

    // Always fallback on arabic
    return arabicMessages;
};
class App extends Component {
    state = { dataProvider: null };

    async componentWillMount() {
        this.setState({ dataProvider: dataProvider });

        if (localStorage.getItem('lang') == 'en') {
            document.getElementById("body").style.direction = "ltr";
            document.getElementById("body").classList.add('en-lang');
        } else {
            document.getElementById("body").classList.remove('en-lang');
            document.getElementById("body").style.direction = "rtl";
        }

    }

    componentWillUnmount() {
        this.restoreFetch();
    }
    render() {
        const { dataProvider } = this.state;

        let lang = 'ar';

        if (localStorage.getItem('lang') === 'en') lang = 'en';
        if (!dataProvider) {
            return (
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
            );
        }

        return (
            <Admin
                title="Saica Admin"
                dataProvider={dataProvider}
                authProvider={authProvider}
                locale={lang}
                customReducers={{ theme: themeReducer }}
                i18nProvider={i18nProvider}
                dashboard={Dashboard}
                loginPage={Login}
                customRoutes={customRoutes}
                appLayout={newLayout}
            >


                {permissions => [
                    // Only include the categories resource for admin users  
                    <Resource name="annotationTaskUserTweet"  {...annotations} />,   
                    permissions === 'admin'  ? <Resource name="tweet"  {...twitter} options={{ label: 'Twitter' }} /> : <Resource name="tweet" />,
                    permissions === 'admin'  ? <Resource name="tweetAccount"  {...twitterApp} options={{ label: 'Accounts' }} /> : <Resource name="tweetAccount" />,
                    permissions === 'admin'  ? <Resource name="dimension"  {...dimensions} /> : <Resource name="dimension" />,
                    permissions === 'admin'  ? <Resource name="category"  {...categorys} /> : <Resource name="category" />,
                    permissions === 'admin'  ? <Resource name="role" /> : <Resource name="role" />,
                    permissions === 'admin'  ? <Resource name="statistics/overview"   {...statisticsOverview} /> : null,
                    permissions === 'admin'  ? <Resource name="statistics/users"   {...statisticsUsers} /> : null,
                    permissions === 'admin'  ? <Resource name="statistics/tweets"   {...statisticsTweets} /> : null,
                    permissions === 'admin'  ? <Resource name="annotationtask"  {...annotationtasks} /> : <Resource name="annotationtask"  />,
                    permissions === 'admin'  ? <Resource name="annotation" /> : <Resource name="annotation" />,
                    permissions === 'admin'  ? <Resource name="word" /> : <Resource name="word" />,
                    permissions === 'admin'  ? <Resource name="users"  {...users} /> : <Resource name="users" />,
                    permissions === 'admin'  ? <Resource name="levelOfConfidence"  /> : <Resource name="levelOfConfidence" />
                    
                ]}



            </Admin>

        );
    }
}

export default App;