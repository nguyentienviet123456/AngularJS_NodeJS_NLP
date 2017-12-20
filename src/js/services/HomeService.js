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


        var _segmentation = function(data){
            var deferred = $q.defer();
            
                        var url = "http://localhost:3000/api/classification2";
            
                        apiHelper.post(url, data).then(function(response){
                            deferred.resolve({status: true, data: response.data.result, statusCode: response.data.statusCode});
                        }, function(error){
                            deferred.reject(error);
                        });
            
                        return deferred.promise; 
        };

        var _getAnswer = function(data){
            var deferred = $q.defer();
                var url = "https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/e46248d7-84f4-47bd-9aef-727189c30707/generateAnswer";

                apiHelper.postQnA(url, data). then(function(response){
                    deferred.resolve({status: true, data: response.data, statusCode: response.data.statusCode});
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;
        };

        var _createNewPair = function(data){
            var deferred = $q.defer();
                var url = "https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/e46248d7-84f4-47bd-9aef-727189c30707";

                apiHelper.patch(url, data). then(function(response){
                    deferred.resolve({status: true, data: response.data, statusCode: response.data.statusCode});
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;

        } 

        var _publish = function(){
            var deferred = $q.defer();
            var url = "https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/e46248d7-84f4-47bd-9aef-727189c30707";

            apiHelper.put(url).then(function(response){
                deferred.resolve({status: true, data: response.data, statusCode: response.data.statusCode});
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;

        }

        var _addQuestion = function(data){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/addQuestion";

            apiHelper.post(url, data).then(function(response){
                    deferred.resolve({status: true, data: response.data, statusCode: response.data.statusCode});
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;
        }
        var _getAllQuestions = function(){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/questions"
            apiHelper.get(url).then(function(response){
                    deferred.resolve({status: true, data: response.data, statusCode: response.data.statusCode});
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;
        }
        homeServicesFactory.classification = _classification;
        homeServicesFactory.segmentation = _segmentation;
        homeServicesFactory.getAnswer = _getAnswer;
        homeServicesFactory.createNewPair = _createNewPair;
        homeServicesFactory.publish = _publish;
        homeServicesFactory.addQuestion = _addQuestion;
        homeServicesFactory.getAllQuestions = _getAllQuestions;
        return homeServicesFactory;
    }])