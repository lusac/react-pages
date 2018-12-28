import { stringify } from 'query-string';
import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  GET_MANY,
  UPDATE_MANY,
  DELETE_MANY,
  GET_MANY_REFERENCE,
} from 'react-admin';

const apiUrl = '//localhost:3001';
let query, headers;

/**
 * Maps react-admin queries to my REST API
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a data response
 */
export default (type, resource, params) => {
  let url = '';
  const options = {
    headers : new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
  };
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([
          (page - 1) * perPage,
          page * perPage - 1,
        ]),
        filter: JSON.stringify(params.filter),
      };
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      break;
    }
    case GET_ONE:
      url = `${apiUrl}/${resource}/${params.id}`;
      break;
    case CREATE:
      url = `${apiUrl}/${resource}`;
      options.method = 'POST';
      options.body = JSON.stringify(params.data);
      break;
    case UPDATE:
      url = `${apiUrl}/${resource}/${params.id}`;
      options.method = 'PUT';
      options.body = JSON.stringify(params.data);
      break;
    case UPDATE_MANY:
      query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      options.method = 'PATCH';
      options.body = JSON.stringify(params.data);
      break;
    case DELETE:
      url = `${apiUrl}/${resource}/${params.id}`;
      options.method = 'DELETE';
      break;
    case DELETE_MANY:
      query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      options.method = 'DELETE';
      break;
    case GET_MANY: {
      query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      break;
    }
    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([
          (page - 1) * perPage,
          page * perPage - 1,
        ]),
        filter: JSON.stringify({
          ...params.filter,
          [params.target]: params.id,
        }),
      };
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      break;
    }
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }

  return fetch(url, options)
    .then(res => {
      headers = res.headers;
      return res.json();
    })
    .then(json => {
      switch (type) {
        case GET_LIST:
          return {
            total: json.length,
            data: json.map(p => { return { ...p, id: p._id  } })
          }
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
            ),
          };
        default:
          return { data: { ...json, id: json._id } };
      }
    });
};
