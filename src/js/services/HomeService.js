angular.module('helloWorldApp')
    .factory('homeServices',['apiHelper','$q', function(apiHelper, $q){
        var homeServicesFactory = {};

        var _classification = function(data){
            var deferred = $q.defer();

            var url = "http://localhost:3000/api/classification";

            apiHelper.post(url, data).then(function(response){
                deferred.resolve({status: true, data: response.data.result, statusCode: response.data.statusCode});
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        homeServicesFactory.classification = _classification;

        return homeServicesFactory;
    }])