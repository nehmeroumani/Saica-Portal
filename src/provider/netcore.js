//import { stringify } from 'query-string';
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';

/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {

    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    function stringify(s) {
        return s;
    }
    const convertFilters = (filters) => {

        let rest = [];
        if (filters && Object.keys(filters).length > 0)
            Object.keys(filters).map(function (key) {
                switch (typeof filters[key]) {
                    case 'string':
                        rest.push('filter=' + key + ',cs,' + filters[key].replace(/:/, ''));
                        break;

                    case 'boolean':
                        rest.push('filter=' + key + ',eq,' + (filters[key] ? 1 : 0));
                        break;

                    case 'undefined':
                        //rest.push('filter=' + key + ',eq,');
                        break;

                    case 'number':
                        rest.push('filter=' + key + ',eq,' + filters[key]);
                        break;

                    case 'object':

                        if (filters[key].constructor === Array) {
                            rest.push('filter=' + key + ',eq,' + filters[key].toString().replace(/:/, ''));
                            //rest[key]='cs.{' + filters[key].toString().replace(/:/,'') + '}';
                        } else {
                            Object.keys(filters[key]).map((val) => (
                                rest.push('filter=' + key + ',eq,' + filters[key][val])
                                //rest[`${key}->>${val}`]=`ilike.*${filters[key][val]}*`
                            ));
                        }

                        // if (filters[key].constructor === Array) {
                        //   rest[key]='cs.{' + filters[key].toString().replace(/:/,'') + '}';
                        // } else {
                        //   Object.keys(filters[key]).map( (val) => (
                        //     rest[`${key}->>${val}`]=`ilike.*${filters[key][val]}*`
                        //   ));
                        // }
                        break;

                    default:
                        rest.push('filter=' + key + ',cs,' + filters[key].replace(/:/, ''));
                        //rest['filter']=key + ',cs,' + filters[key].toString().replace(/:/,'');
                        break;
                }
            });
        return rest;
    }
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
            case GET_LIST: {

                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                var f = convertFilters(params.filter).join('&');

                let query = 'page=' + page + '&size=' + perPage + '&order=' + field + '&sort=' + order.toLowerCase();
                if (f)
                    query += '&' + f;
                url = `${apiUrl}/${resource}?${query}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            // case GET_MANY: {
            //     const query = {
            //         filter: JSON.stringify({ id: params.ids }),
            //     };
            //     url = `${apiUrl}/${resource}?${stringify(query)}`;
            //     break;
            // }

            case GET_MANY: {
                url = `${apiUrl}/${resource}?id=${params.ids.join(',')}`;
                break;
            }
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                let fl = convertFilters(params.filter);
                fl.push('filter=' + params.target + ',eq,' + params.id);
                const f = fl.join('&');


                let query = 'page=' + page + '&size=' + perPage + '&order=' + field + '&sort=' + order.toLowerCase();
                if (f)
                    query += '&' + f;
                url = `${apiUrl}/${resource}?${query}`;
                break;

                // const { page, perPage } = params.pagination;
                // const { field, order } = params.sort;
                // const query = {
                //     sort: JSON.stringify([field, order]),
                //     range: JSON.stringify([
                //         (page - 1) * perPage,
                //         page * perPage - 1,
                //     ]),
                //     filter: JSON.stringify({
                //         ...params.filter,
                //         [params.target]: params.id,
                //     }),
                // };
                // url = `${apiUrl}/${resource}?${stringify(query)}`;
                // break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                if('categoryId' in params.data)
                params.data['categoryId'] = parseInt(params.data['categoryId'] );
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                if(params.userId)
                url = url + "?userId=" +params.userId;
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const { headers, json } = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                if (!headers.has('content-range')) {
                    throw new Error(
                        'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                    );
                }

                return {
                    data: json,
                    total: parseInt(
                        headers
                            .get('content-range')
                            .split('/')
                            .pop(),
                        10
                    )
                };
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            default:
                return { data: json };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE',
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }

        const { url, options } = convertDataRequestToHTTP(
            type,
            resource,
            params
        );
        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        );
    };
};
