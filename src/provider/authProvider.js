import { AUTH_LOGIN, AUTH_ERROR, AUTH_LOGOUT, AUTH_CHECK,AUTH_GET_PERMISSIONS } from 'react-admin';
import {Config}  from '../config'
// import decodeJwt from 'jwt-decode';
export default (type, params) => {
    // function make_base_auth(user, password) {
    //     var tok = user + ':' + password;
    //     var hash = btoa(tok);
    //     return "Basic " + hash;
    //   }
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        //let token=make_base_auth(username, password);
        const request = new Request(Config.apiUrl + '/account/authenticate', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(user => {
                // login successful if there's a jwt token in the response
                if (user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('role', user.role);
                    if(user.nextAnnotationId && user.nextAnnotationId > 0){
                        localStorage.setItem('nextAnnotationId', JSON.stringify(user.nextAnnotationId));
                    }
                }

                return user;
            });
    }
    else if (type === AUTH_ERROR) {
        const status = params.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('user');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    else if (type === AUTH_LOGOUT) {
        localStorage.removeItem('user');
        localStorage.removeItem('role');

        return Promise.resolve();
    }

    else if (type === AUTH_CHECK) {
        return localStorage.getItem('user')
            ? Promise.resolve()
            : Promise.reject();
    }
    else if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');        
        return role ? Promise.resolve(role) : Promise.reject();
    }
    return Promise.resolve();
}