import ReactGA from 'react-ga';

class analytics {

    static logEvent(category, action) {
        ReactGA.event({
            category: category,
            action: action,
            label:JSON.parse(localStorage.user).username
        });
    }

    static logPageView(title) {
        ReactGA.pageview(title, null, JSON.parse(localStorage.user).username);
    }
}

export default analytics;