import { authHeader } from '../auth/authHeader';
import { fetchUtils } from 'react-admin';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json', ...authHeader() });
    }
    //const token = localStorage.getItem('token');
    //options.headers.set('Authorization', `${token}`);
    return fetchUtils.fetchJson(url, options);
}

export default httpClient;