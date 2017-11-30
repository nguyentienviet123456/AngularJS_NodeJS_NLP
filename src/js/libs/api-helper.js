var apiHelper = angular.module('apiHelper', []);

apiHelper.factory("apiHelper",['$http', '$q', '$window', function($http, $q, $window){
    var apiHelperFactory = {};
// get
    var _get = function( url, dataJson, headers){

        var options = {
            url: url,
            method: 'GET',
            data: dataJson === null || dataJson === undefined ? null : JSON.stringify(dataJson),
        };

        if( headers !== null && headers !== undefined){
            options = {
                url: url,
                method: 'GET',
                data: dataJson === null || dataJson === undefined ? null : JSON.stringify(dataJson),
                headers: headers
            };
        }

        var deferred = $q.defer();

        $http(options).then(function (response) {
            if (response !== null && response !== undefined && response.data !== null && response.data.statusCode !== null && response.data.statusCode === 201) {
                deferred.resolve(response);
            }
            else {
                if (response !== null && response !== undefined && response.data !== null && response.data !== undefined && (response.data.statusCode === null || response.data.statusCode === undefined)) {
                    deferred.resolve(response);
                }
                else {
                    deferred.reject({ status: false, message: '' });
                }
            }
        }, function (error) {
            if (error.data !== null && error.data.statusCode === 190) {
               return false;
            }
            else {
                deferred.reject(_getError(error));
            }
        });

        return deferred.promise;
    };
// post
var _post = function (url, dataJson, headers) {
    
            var options = {
                url: url,
                method: 'POST',
                data: dataJson === null || dataJson === undefined ? null : JSON.stringify(dataJson),
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            };
    
            if (headers !== null && headers !== undefined) {
                options = {
                    url: url,
                    method: 'POST',
                    data: dataJson === null || dataJson === undefined ? null : JSON.stringify(dataJson),
                    headers: headers
                };
            }
    
            var deferred = $q.defer();
    
            $http(options).then(function (response) {
                if (response !== null && response !== undefined && response.data.statusCode !== null && response.data.statusCode !== undefined && response.data.statusCode === 201) {
                    deferred.resolve(response);
                }
                else {
                    if (response !== null && response !== undefined && (response.data.statusCode === null || response.data.statusCode === undefined)) {
                        deferred.resolve(response);
                    }
                    else {
                        deferred.reject({ status: false, message: response.data.message });
                    }
                }
            }, function (error) {
                if (error.data !== null && error.data.statusCode === 190) {
                    return false;
                 }
                 else {
                     deferred.reject(_getError(error));
                 }
            });
    
            return deferred.promise;
        };

/// post from qnamaker.ai
var _postQnA = function (url, dataJson, headers){
            var options = {
                url: url,
                method: 'POST',
                data: dataJson === null || dataJson === undefined ? null: JSON.stringify(dataJson),
                headers: {
                    'Content-type': 'application/json; charset= urf-8',
                    'Ocp-Apim-Subscription-Key': '16ae95a25ba448bb87d5c5b09196b3d8'
                }
            };

          
            var deferred = $q.defer();
            
                    $http(options).then(function (response) {
                        if (response !== null && response !== undefined && response.data.statusCode !== null && response.data.statusCode !== undefined && response.data.statusCode === 201) {
                            deferred.resolve(response);
                        }
                        else {
                            if (response !== null && response !== undefined && (response.data.statusCode === null || response.data.statusCode === undefined)) {
                                deferred.resolve(response);
                            }
                            else {
                                deferred.reject({ status: false, message: response.data.message });
                            }
                        }
                    }, function (error) {
                        if (error.data !== null && error.data.statusCode === 190) {
                            return false;
                         }
                         else {
                             deferred.reject(_getError(error));
                         }
                    });
            
                    return deferred.promise;
};
// pathch
var _patch = function (url, dataJson, headers){
    var options = {
        url: url,
        method: 'PATCH',
        data: dataJson === null || dataJson === undefined ? null: JSON.stringify(dataJson),
        headers: {
            'Content-type': 'application/json; charset= urf-8',
            'Ocp-Apim-Subscription-Key': '16ae95a25ba448bb87d5c5b09196b3d8'
        }
    };

  
    var deferred = $q.defer();
    
            $http(options).then(function (response) {
                if (response !== null && response !== undefined && response.data.statusCode !== null && response.data.statusCode !== undefined && response.data.statusCode === 201) {
                    deferred.resolve(response);
                }
                else {
                    if (response !== null && response !== undefined && (response.data.statusCode === null || response.data.statusCode === undefined)) {
                        deferred.resolve(response);
                    }
                    else {
                        deferred.reject({ status: false, message: response.data.message });
                    }
                }
            }, function (error) {
                if (error.data !== null && error.data.statusCode === 190) {
                    return false;
                 }
                 else {
                     deferred.reject(_getError(error));
                 }
            });
    
            return deferred.promise;
};
// put
var _put = function (url, dataJson, headers) {
    
            var options = {
                url: url,
                method: 'PUT',
                data: dataJson === null || dataJson === undefined ? null : JSON.stringify(dataJson),
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'Ocp-Apim-Subscription-Key': '16ae95a25ba448bb87d5c5b09196b3d8'
                }
            };
    
            if (headers !== null && headers !== undefined) {
                options = {
                    url: url,
                    method: 'PUT',
                    data: dataJson === null || dataJson === undefined ? null : JSON.stringify(dataJson),
                    headers: headers
                };
            }
    
            var deferred = $q.defer();
    
            $http(options).then(function (response) {
                if (response !== null && response !== undefined && response.data.statusCode !== null && response.data.statusCode !== undefined && response.data.statusCode === 201) {
                    deferred.resolve(response);
                }
                else {
                    if (response !== null && response !== undefined && (response.data.statusCode === null || response.data.statusCode === undefined)) {
                        deferred.resolve(response);
                    }
                    else {
                        deferred.reject({ status: false, message: response.data.message });
                    }
                }
            }, function (error) {
                if (error.data !== null && error.data.statusCode === 190) {
                    return false;
                 }
                 else {
                     deferred.reject(_getError(error));
                 }
            });
    
            return deferred.promise;
        };
// delete
var _delete = function (url, dataJson, headers) {
    
            var options = {
                url: url,
                method: 'DELETE',
                data: dataJson === null || dataJson === undefined ? null : JSON.stringify(dataJson),
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            };
    
            if (headers !== null && headers !== undefined) {
                options = {
                    url: url,
                    method: 'DELETE',
                    data: dataJson === null || dataJson === undefined ? null : JSON.stringify(dataJson),
                    headers: headers
                };
            }
    
            var deferred = $q.defer();
    
            $http(options).then(function (response) {
                if (response !== null && response !== undefined && response.data.statusCode !== null && response.data.statusCode !== undefined && response.data.statusCode === 201) {
                    deferred.resolve(response);
                }
                else {
                    if (response !== null && response !== undefined && (response.data.statusCode === null || response.data.statusCode === undefined)) {
                        deferred.resolve(response);
                    }
                    else {
                        deferred.reject({ status: false, message: response.data.message });
                    }
                }
            }, function (error) {
                if (error.data !== null && error.data.statusCode === 190) {
                    return false;
                 }
                 else {
                     deferred.reject(_getError(error));
                 }
            });
    
            return deferred.promise;
        };
// get errror function
var _getError = function (error) {
    
            var status = error.status;
    
            if (error.data !== null && error.data.statusCode !== null && error.data.statusCode !== undefined) {
                return { status: false, statusCode: error.data.statusCode, message: error.data.message };
            }
    
            if (error.data !== null && error.data.errorCode !== null && error.data.errorCode !== undefined) {
                return { status: false, statusCode: error.data.statusCode, message: error.data.errorMessage };
            }
    
            switch (status) {
                default:
                    return { status: false, statusCode: -1, message: constants.messages.networkError };
            }
        };
// return
            apiHelperFactory.get = _get;
            apiHelperFactory.post = _post;
            apiHelperFactory.postQnA =  _postQnA;
            apiHelperFactory.delete = _delete;
            apiHelperFactory.put = _put;
            apiHelperFactory.patch =  _patch;

            return apiHelperFactory;
}]);