var APPLICATION_JSON = 'application/json';
var CONTENT_TYPE_APPLICATION_JSON = {
  'Content-Type': APPLICATION_JSON + ';charset=utf-8'
};
var JSON_START = /^\[|^\{(?!\{)/;
var JSON_ENDS = {
  '[': /]$/,
  '{': /}$/
};
var JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/;
var $httpMinErr = minErr('$http');
var $httpMinErrLegacyFn = function(method) {
  return function() {
    throw $httpMinErr('legacy', 'The method `{0}` on the promise returned from `$http` has been disabled.', method);
  };
};

function serializeValue(v) {
  if (isObject(v)) {
    return isDate(v) ? v.toISOString() : toJson(v);
  }
  return v;
}


/** @this */
function $HttpParamSerializerProvider() {
  /**
   * @ngdoc service
   * @name $httpParamSerializer
   * @description
   *
   * Default {@link $http `$http`} params serializer that converts objects to strings
   * according to the following rules:
   *
   * * `{'foo': 'bar'}` results in `foo=bar`
   * * `{'foo': Date.now()}` results in `foo=2015-04-01T09%3A50%3A49.262Z` (`toISOString()` and encoded representation of a Date object)
   * * `{'foo': ['bar', 'baz']}` results in `foo=bar&foo=baz` (repeated key for each array element)
   * * `{'foo': {'bar':'baz'}}` results in `foo=%7B%22bar%22%3A%22baz%22%7D` (stringified and encoded representation of an object)
   *
   * Note that serializer will sort the request parameters alphabetically.
   * */

  this.$get = function() {
    return function ngParamSerializer(params) {
      if (!params) return '';
      var parts = [];
      forEachSorted(params, function(value, key) {
        if (value === null || isUndefined(value)) return;
        if (isArray(value)) {
          forEach(value, function(v) {
            parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(serializeValue(v)));
          });
        } else {
          parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(serializeValue(value)));
        }
      });

      return parts.join('&');
    };
  };
}

/** @this */
function $HttpParamSerializerJQLikeProvider() {
  /**
   * @ngdoc service
   * @name $httpParamSerializerJQLike
   *
   * @description
   *
   * Alternative {@link $http `$http`} params serializer that follows
   * jQuery's [`param()`](http://api.jquery.com/jquery.param/) method logic.
   * The serializer will also sort the params alphabetically.
   *
   * To use it for serializing `$http` request parameters, set it as the `paramSerializer` property:
   *
   * ```js
   * $http({
   *   url: myUrl,
   *   method: 'GET',
   *   params: myParams,
   *   paramSerializer: '$httpParamSerializerJQLike'
   * });
   * ```
   *
   * It is also possible to set it as the default `paramSerializer` in the
   * {@link $httpProvider#defaults `$httpProvider`}.
   *
   * Additionally, you can inject the serializer and use it explicitly, for example to serialize
   * form data for submission:
   *
   * ```js
   * .controller(function($http, $httpParamSerializerJQLike) {
   *   //...
   *
   *   $http({
   *     url: myUrl,
   *     method: 'POST',
   *     data: $httpParamSerializerJQLike(myData),
   *     headers: {
   *       'Content-Type': 'application/x-www-form-urlencoded'
   *     }
   *   });
   *
   * });
   * ```
   *
   * */
  this.$get = function() {
    return function jQueryLikeParamSerializer(params) {
      if (!params) return '';
      var parts = [];
      serialize(params, '', true);
      return parts.join('&');

      function serialize(toSerialize, prefix, topLevel) {
        if (toSerialize === null || isUndefined(toSerialize)) return;
        if (isArray(toSerialize)) {
          forEach(toSerialize, function(value, index) {
            serialize(value, prefix + '[' + (isObject(value) ? index : '') + ']');
          });
        } else if (isObject(toSerialize) && !isDate(toSerialize)) {
          forEachSorted(toSerialize, function(value, key) {
            serialize(value, prefix +
              (topLevel ? '' : '[') +
              key +
              (topLevel ? '' : ']'));
          });
        } else {
          parts.push(encodeUriQuery(prefix) + '=' + encodeUriQuery(serializeValue(toSerialize)));
        }
      }
    };
  };
}

function defaultHttpResponseTransform(data, headers) {
  if (isString(data)) {
    // Strip json vulnerability protection prefix and trim whitespace
    var tempData = data.replace(JSON_PROTECTION_PREFIX, '').trim();

    if (tempData) {
      var contentType = headers('Content-Type');
      if ((contentType && (contentType.indexOf(APPLICATION_JSON) === 0)) || isJsonLike(tempData)) {
        data = fromJson(tempData);
      }
    }
  }

  return data;
}

function isJsonLike(str) {
  var jsonStart = str.match(JSON_START);
  return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
}

/**
 * Parse headers into key value object
 *
 * @param {string} headers Raw headers as a string
 * @returns {Object} Parsed headers as key value object
 */
function parseHeaders(headers) {
  var parsed = createMap(),
    i;

  function fillInParsed(key, val) {
    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  }

  if (isString(headers)) {
    forEach(headers.split('\n'), function(line) {
      i = line.indexOf(':');
      fillInParsed(lowercase(trim(line.substr(0, i))), trim(line.substr(i + 1)));
    });
  } else if (isObject(headers)) {
    forEach(headers, function(headerVal, headerKey) {
      fillInParsed(lowercase(headerKey), trim(headerVal));
    });
  }

  return parsed;
}


/**
 * Returns a function that provides access to parsed headers.
 *
 * Headers are lazy parsed when first requested.
 * @see parseHeaders
 *
 * @param {(string|Object)} headers Headers to provide access to.
 * @returns {function(string=)} Returns a getter function which if called with:
 *
 *   - if called with single an argument returns a single header value or null
 *   - if called with no arguments returns an object containing all headers.
 */
function headersGetter(headers) {
  var headersObj;

  return function(name) {
    if (!headersObj) headersObj = parseHeaders(headers);

    if (name) {
      var value = headersObj[lowercase(name)];
      if (value === undefined) {
        value = null;
      }
      return value;
    }

    return headersObj;
  };
}


/**
 * Chain all given functions
 *
 * This function is used for both request and response transforming
 *
 * @param {*} data Data to transform.
 * @param {function(string=)} headers HTTP headers getter fn.
 * @param {number} status HTTP status code of the response.
 * @param {(Function|Array.<Function>)} fns Function or an array of functions.
 * @returns {*} Transformed data.
 */
function transformData(data, headers, status, fns) {
  if (isFunction(fns)) {
    return fns(data, headers, status);
  }

  forEach(fns, function(fn) {
    data = fn(data, headers, status);
  });

  return data;
}


function isSuccess(status) {
  return 200 <= status && status < 300;
}


/**
 * @ngdoc provider
 * @name $httpProvider
 * @this
 *
 * @description
 * Use `$httpProvider` to change the default behavior of the {@link ng.$http $http} service.
 * */
function $HttpProvider() {
  /**
   * @ngdoc property
   * @name $httpProvider#defaults
   * @description
   *
   * Object containing default values for all {@link ng.$http $http} requests.
   *
   * - **`defaults.cache`** - {boolean|Object} - A boolean value or object created with
   * {@link ng.$cacheFactory `$cacheFactory`} to enable or disable caching of HTTP responses
   * by default. See {@link $http#caching $http Caching} for more information.
   *
   * - **`defaults.xsrfCookieName`** - {string} - Name of cookie containing the XSRF token.
   * Defaults value is `'XSRF-TOKEN'`.
   *
   * - **`defaults.xsrfHeaderName`** - {string} - Name of HTTP header to populate with the
   * XSRF token. Defaults value is `'X-XSRF-TOKEN'`.
   *
   * - **`defaults.headers`** - {Object} - Default headers for all $http requests.
   * Refer to {@link ng.$http#setting-http-headers $http} for documentation on
   * setting default headers.
   *     - **`defaults.headers.common`**
   *     - **`defaults.headers.post`**
   *     - **`defaults.headers.put`**
   *     - **`defaults.headers.patch`**
   *
   *
   * - **`defaults.paramSerializer`** - `{string|function(Object<string,string>):string}` - A function
   *  used to the prepare string representation of request parameters (specified as an object).
   *  If specified as string, it is interpreted as a function registered with the {@link auto.$injector $injector}.
   *  Defaults to {@link ng.$httpParamSerializer $httpParamSerializer}.
   *
   **/
  var defaults = this.defaults = {
    // transform incoming response data
    transformResponse: [defaultHttpResponseTransform],

    // transform outgoing request data
    transformRequest: [function(d) {
      return isObject(d) && !isFile(d) && !isBlob(d) && !isFormData(d) ? toJson(d) : d;
    }],

    // default headers
    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*'
      },
      post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
      put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
      patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
    },

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    paramSerializer: '$httpParamSerializer'
  };

  var useApplyAsync = false;
  /**
   * @ngdoc method
   * @name $httpProvider#useApplyAsync
   * @description
   *
   * Configure $http service to combine processing of multiple http responses received at around
   * the same time via {@link ng.$rootScope.Scope#$applyAsync $rootScope.$applyAsync}. This can result in
   * significant performance improvement for bigger applications that make many HTTP requests
   * concurrently (common during application bootstrap).
   *
   * Defaults to false. If no value is specified, returns the current configured value.
   *
   * @param {boolean=} value If true, when requests are loaded, they will schedule a deferred
   *    "apply" on the next tick, giving time for subsequent requests in a roughly ~10ms window
   *    to load and share the same digest cycle.
   *
   * @returns {boolean|Object} If a value is specified, returns the $httpProvider for chaining.
   *    otherwise, returns the current configured value.
   **/
  this.useApplyAsync = function(value) {
    if (isDefined(value)) {
      useApplyAsync = !!value;
      return this;
    }
    return useApplyAsync;
  };

  var useLegacyPromise = true;
  /**
   * @ngdoc method
   * @name $httpProvider#useLegacyPromiseExtensions
   * @description
   *
   * Configure `$http` service to return promises without the shorthand methods `success` and `error`.
   * This should be used to make sure that applications work without these methods.
   *
   * Defaults to true. If no value is specified, returns the current configured value.
   *
   * @param {boolean=} value If true, `$http` will return a promise with the deprecated legacy `success` and `error` methods.
   *
   * @returns {boolean|Object} If a value is specified, returns the $httpProvider for chaining.
   *    otherwise, returns the current configured value.
   **/
  this.useLegacyPromiseExtensions = function(value) {
    if (isDefined(value)) {
      useLegacyPromise = !!value;
      return this;
    }
    return useLegacyPromise;
  };

  /**
   * @ngdoc property
   * @name $httpProvider#interceptors
   * @description
   *
   * Array containing service factories for all synchronous or asynchronous {@link ng.$http $http}
   * pre-processing of request or postprocessing of responses.
   *
   * These service factories are ordered by request, i.e. they are applied in the same order as the
   * array, on request, but reverse order, on response.
   *
   * {@link ng.$http#interceptors Interceptors detailed info}
   **/
  var interceptorFactories = this.interceptors = [];

  this.$get = ['$browser', '$httpBackend', '$$cookieReader', '$cacheFactory', '$rootScope', '$q', '$injector',
    function($browser, $httpBackend, $$cookieReader, $cacheFactory, $rootScope, $q, $injector) {

      var defaultCache = $cacheFactory('$http');

      /**
       * Make sure that default param serializer is exposed as a function
       */
      defaults.paramSerializer = isString(defaults.paramSerializer) ?
        $injector.get(defaults.paramSerializer) : defaults.paramSerializer;

      /**
       * Interceptors stored in reverse order. Inner interceptors before outer interceptors.
       * The reversal is needed so that we can build up the interception chain around the
       * server request.
       */
      var reversedInterceptors = [];

      forEach(interceptorFactories, function(interceptorFactory) {
        reversedInterceptors.unshift(isString(interceptorFactory) ?
          $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory));
      });


      function $http(requestConfig) {

        if (!isObject(requestConfig)) {
          throw minErr('$http')('badreq', 'Http request configuration must be an object.  Received: {0}', requestConfig);
        }

        if (!isString(requestConfig.url)) {
          throw minErr('$http')('badreq', 'Http request configuration url must be a string.  Received: {0}', requestConfig.url);
        }

        var config = extend({
          method: 'get',
          transformRequest: defaults.transformRequest,
          transformResponse: defaults.transformResponse,
          paramSerializer: defaults.paramSerializer
        }, requestConfig);

        config.headers = mergeHeaders(requestConfig);
        config.method = uppercase(config.method);
        config.paramSerializer = isString(config.paramSerializer) ?
          $injector.get(config.paramSerializer) : config.paramSerializer;

        $browser.$$incOutstandingRequestCount();

        var requestInterceptors = [];
        var responseInterceptors = [];
        var promise = $q.when(config);

        // apply interceptors
        forEach(reversedInterceptors, function(interceptor) {
          if (interceptor.request || interceptor.requestError) {
            requestInterceptors.unshift(interceptor.request, interceptor.requestError);
          }
          if (interceptor.response || interceptor.responseError) {
            responseInterceptors.push(interceptor.response, interceptor.responseError);
          }
        });

        promise = chainInterceptors(promise, requestInterceptors);
        promise = promise.then(serverRequest);
        promise = chainInterceptors(promise, responseInterceptors);
        promise = promise.finally(completeOutstandingRequest);

        if (useLegacyPromise) {
          promise.success = function(fn) {
            assertArgFn(fn, 'fn');

            promise.then(function(response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };

          promise.error = function(fn) {
            assertArgFn(fn, 'fn');

            promise.then(null, function(response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
        } else {
          promise.success = $httpMinErrLegacyFn('success');
          promise.error = $httpMinErrLegacyFn('error');
        }

        return promise;


        function chainInterceptors(promise, interceptors) {
          for (var i = 0, ii = interceptors.length; i < ii;) {
            var thenFn = interceptors[i++];
            var rejectFn = interceptors[i++];

            promise = promise.then(thenFn, rejectFn);
          }

          interceptors.length = 0;

          return promise;
        }

        function completeOutstandingRequest() {
          $browser.$$completeOutstandingRequest(noop);
        }

        function executeHeaderFns(headers, config) {
          var headerContent, processedHeaders = {};

          forEach(headers, function(headerFn, header) {
            if (isFunction(headerFn)) {
              headerContent = headerFn(config);
              if (headerContent != null) {
                processedHeaders[header] = headerContent;
              }
            } else {
              processedHeaders[header] = headerFn;
            }
          });

          return processedHeaders;
        }

        function mergeHeaders(config) {
          var defHeaders = defaults.headers,
            reqHeaders = extend({}, config.headers),
            defHeaderName, lowercaseDefHeaderName, reqHeaderName;

          defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]);

          // using for-in instead of forEach to avoid unnecessary iteration after header has been found
          defaultHeadersIteration:
            for (defHeaderName in defHeaders) {
              lowercaseDefHeaderName = lowercase(defHeaderName);

              for (reqHeaderName in reqHeaders) {
                if (lowercase(reqHeaderName) === lowercaseDefHeaderName) {
                  continue defaultHeadersIteration;
                }
              }

              reqHeaders[defHeaderName] = defHeaders[defHeaderName];
            }

          // execute if header value is a function for merged headers
          return executeHeaderFns(reqHeaders, shallowCopy(config));
        }

        function serverRequest(config) {
          var headers = config.headers;
          var reqData = transformData(config.data, headersGetter(headers), undefined, config.transformRequest);

          // strip content-type if data is undefined
          if (isUndefined(reqData)) {
            forEach(headers, function(value, header) {
              if (lowercase(header) === 'content-type') {
                delete headers[header];
              }
            });
          }

          if (isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials)) {
            config.withCredentials = defaults.withCredentials;
          }

          // send request
          return sendReq(config, reqData).then(transformResponse, transformResponse);
        }

        function transformResponse(response) {
          // make a copy since the response must be cacheable
          var resp = extend({}, response);
          resp.data = transformData(response.data, response.headers, response.status,
            config.transformResponse);
          return (isSuccess(response.status)) ?
            resp :
            $q.reject(resp);
        }
      }

      $http.pendingRequests = [];

      /**
       * @ngdoc method
       * @name $http#get
       *
       * @description
       * Shortcut method to perform `GET` request.
       *
       * @param {string} url Relative or absolute URL specifying the destination of the request
       * @param {Object=} config Optional configuration object
       * @returns {HttpPromise} Future object
       */

      /**
       * @ngdoc method
       * @name $http#delete
       *
       * @description
       * Shortcut method to perform `DELETE` request.
       *
       * @param {string} url Relative or absolute URL specifying the destination of the request
       * @param {Object=} config Optional configuration object
       * @returns {HttpPromise} Future object
       */

      /**
       * @ngdoc method
       * @name $http#head
       *
       * @description
       * Shortcut method to perform `HEAD` request.
       *
       * @param {string} url Relative or absolute URL specifying the destination of the request
       * @param {Object=} config Optional configuration object
       * @returns {HttpPromise} Future object
       */

      /**
       * @ngdoc method
       * @name $http#jsonp
       *
       * @description
       * Shortcut method to perform `JSONP` request.
       * If you would like to customise where and how the callbacks are stored then try overriding
       * or decorating the {@link $jsonpCallbacks} service.
       *
       * @param {string} url Relative or absolute URL specifying the destination of the request.
       *                     The name of the callback should be the string `JSON_CALLBACK`.
       * @param {Object=} config Optional configuration object
       * @returns {HttpPromise} Future object
       */
      createShortMethods('get', 'delete', 'head', 'jsonp');

      /**
       * @ngdoc method
       * @name $http#post
       *
       * @description
       * Shortcut method to perform `POST` request.
       *
       * @param {string} url Relative or absolute URL specifying the destination of the request
       * @param {*} data Request content
       * @param {Object=} config Optional configuration object
       * @returns {HttpPromise} Future object
       */

      /**
       * @ngdoc method
       * @name $http#put
       *
       * @description
       * Shortcut method to perform `PUT` request.
       *
       * @param {string} url Relative or absolute URL specifying the destination of the request
       * @param {*} data Request content
       * @param {Object=} config Optional configuration object
       * @returns {HttpPromise} Future object
       */

      /**
       * @ngdoc method
       * @name $http#patch
       *
       * @description
       * Shortcut method to perform `PATCH` request.
       *
       * @param {string} url Relative or absolute URL specifying the destination of the request
       * @param {*} data Request content
       * @param {Object=} config Optional configuration object
       * @returns {HttpPromise} Future object
       */
      createShortMethodsWithData('post', 'put', 'patch');

      /**
       * @ngdoc property
       * @name $http#defaults
       *
       * @description
       * Runtime equivalent of the `$httpProvider.defaults` property. Allows configuration of
       * default headers, withCredentials as well as request and response transformations.
       *
       * See "Setting HTTP Headers" and "Transforming Requests and Responses" sections above.
       */
      $http.defaults = defaults;


      return $http;


      function createShortMethods(names) {
        forEach(arguments, function(name) {
          $http[name] = function(url, config) {
            return $http(extend({}, config || {}, {
              method: name,
              url: url
            }));
          };
        });
      }


      function createShortMethodsWithData(name) {
        forEach(arguments, function(name) {
          $http[name] = function(url, data, config) {
            return $http(extend({}, config || {}, {
              method: name,
              url: url,
              data: data
            }));
          };
        });
      }


      /**
       * Makes the request.
       *
       * !!! ACCESSES CLOSURE VARS:
       * $httpBackend, defaults, $log, $rootScope, defaultCache, $http.pendingRequests
       */
      function sendReq(config, reqData) {
        var deferred = $q.defer(),
          promise = deferred.promise,
          cache,
          cachedResp,
          reqHeaders = config.headers,
          url = buildUrl(config.url, config.paramSerializer(config.params));

        $http.pendingRequests.push(config);
        promise.then(removePendingReq, removePendingReq);


        if ((config.cache || defaults.cache) && config.cache !== false &&
          (config.method === 'GET' || config.method === 'JSONP')) {
          cache = isObject(config.cache) ? config.cache :
            isObject(defaults.cache) ? defaults.cache :
            defaultCache;
        }

        if (cache) {
          cachedResp = cache.get(url);
          if (isDefined(cachedResp)) {
            if (isPromiseLike(cachedResp)) {
              // cached request has already been sent, but there is no response yet
              cachedResp.then(resolvePromiseWithResult, resolvePromiseWithResult);
            } else {
              // serving from cache
              if (isArray(cachedResp)) {
                resolvePromise(cachedResp[1], cachedResp[0], shallowCopy(cachedResp[2]), cachedResp[3]);
              } else {
                resolvePromise(cachedResp, 200, {}, 'OK');
              }
            }
          } else {
            // put the promise for the non-transformed response into cache as a placeholder
            cache.put(url, promise);
          }
        }


        // if we won't have the response in cache, set the xsrf headers and
        // send the request to the backend
        if (isUndefined(cachedResp)) {
          var xsrfValue = urlIsSameOrigin(config.url) ?
            $$cookieReader()[config.xsrfCookieName || defaults.xsrfCookieName] :
            undefined;
          if (xsrfValue) {
            reqHeaders[(config.xsrfHeaderName || defaults.xsrfHeaderName)] = xsrfValue;
          }

          $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout,
            config.withCredentials, config.responseType,
            createApplyHandlers(config.eventHandlers),
            createApplyHandlers(config.uploadEventHandlers));
        }

        return promise;

        function createApplyHandlers(eventHandlers) {
          if (eventHandlers) {
            var applyHandlers = {};
            forEach(eventHandlers, function(eventHandler, key) {
              applyHandlers[key] = function(event) {
                if (useApplyAsync) {
                  $rootScope.$applyAsync(callEventHandler);
                } else if ($rootScope.$$phase) {
                  callEventHandler();
                } else {
                  $rootScope.$apply(callEventHandler);
                }

                function callEventHandler() {
                  eventHandler(event);
                }
              };
            });
            return applyHandlers;
          }
        }


        /**
         * Callback registered to $httpBackend():
         *  - caches the response if desired
         *  - resolves the raw $http promise
         *  - calls $apply
         */
        function done(status, response, headersString, statusText) {
          if (cache) {
            if (isSuccess(status)) {
              cache.put(url, [status, response, parseHeaders(headersString), statusText]);
            } else {
              // remove promise from the cache
              cache.remove(url);
            }
          }

          function resolveHttpPromise() {
            resolvePromise(response, status, headersString, statusText);
          }

          if (useApplyAsync) {
            $rootScope.$applyAsync(resolveHttpPromise);
          } else {
            resolveHttpPromise();
            if (!$rootScope.$$phase) $rootScope.$apply();
          }
        }


        /**
         * Resolves the raw $http promise.
         */
        function resolvePromise(response, status, headers, statusText) {
          //status: HTTP response status code, 0, -1 (aborted by timeout / promise)
          status = status >= -1 ? status : 0;

          (isSuccess(status) ? deferred.resolve : deferred.reject)({
            data: response,
            status: status,
            headers: headersGetter(headers),
            config: config,
            statusText: statusText
          });
        }

        function resolvePromiseWithResult(result) {
          resolvePromise(result.data, result.status, shallowCopy(result.headers()), result.statusText);
        }

        function removePendingReq() {
          var idx = $http.pendingRequests.indexOf(config);
          if (idx !== -1) $http.pendingRequests.splice(idx, 1);
        }
      }


      function buildUrl(url, serializedParams) {
        if (serializedParams.length > 0) {
          url += ((url.indexOf('?') === -1) ? '?' : '&') + serializedParams;
        }
        return url;
      }
    }
  ];
}
