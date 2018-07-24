require('es6-promise').polyfill();
import 'isomorphic-fetch';
import _ from 'lodash';

import { getToken } from 'utils/storage'

class FetchApi {
  constructor(url) {
    this.service = url;
  }

  mergeEndpoint(endpoint) {
    return `${this.service}${encodeURI(endpoint)}`
  }

  mapToApi(endpoints) {
    let api = {}
    Object.keys(endpoints).map(key => {
      let endpoint_schema = endpoints[key]
      api[key] = (...args) => {
        return this.makeRequest(endpoint_schema(...args))
      }
    })
    return api;
  }

  checkStatus(response) {
    if (response.ok) {
      return response;
    }

    throw new Error(response.statusCode)
  }

  getDefaultOptions() {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      timeout: 10000,
      mode: 'cors',
    }
  }

  resolveResponse(response) {
    const contentType = response.headers.get('content-type')
    if (!contentType) return response;

    if (contentType.indexOf("application/json") !== -1) {
      return response.json()
    } else if (contentType.indexOf("application/text") !== -1) {
      return response.text()
    }

    return response
  }

  attachToken() {
    const token = getToken()
    if (token) {
      return {
        headers: {
          'x-authorization': token
        }
      }
    }
    return {}
    // throw new Error('No token available')
  }

  makeRequest(options) {
    let merged_options = _.merge(this.getDefaultOptions(), options.request || {})
    if (options.authorization) {
      merged_options = _.merge(merged_options, this.attachToken())
    }
    const merged_uri = this.mergeEndpoint(options.endpoint)
    if (merged_options.body) merged_options.body = JSON.stringify(merged_options.body);
    return fetch(merged_uri, merged_options)
      .then(this.checkStatus)
      .then(this.resolveResponse)
  }

}
export default FetchApi;
