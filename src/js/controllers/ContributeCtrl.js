angular.module('helloWorldApp')
    .controller('ContributeCtrl', [
        '$scope', 'homeServices', '$sce', '$window', '$filter',
        function ($scope, homeServices, $sce, $window, $filter) {
            $scope.question = "";
            $scope.answer = "";
            $scope.answer_html = "";
            $scope.qnaPairs = [{
                answer: '',
                question: ''
            }];
            $scope.buttonName = "Contribute"

            var getAllQuestions = function () {
                console.log("get list questions");
                homeServices.getAllQuestions().then(function (response) {
                    var _listQuestions = [];
                    _listQuestions = response.data.result;
                    $scope.listQuestions = angular.copy(_listQuestions);
                }, function (err) {

                });
            }

            getAllQuestions();

            $scope.contribute = function () {
                $scope.buttonName = "Contributing ...";
                $scope.qnaPairs[0].answer = $scope.answer;
                $scope.qnaPairs[0].question = $scope.question;
                var add = {
                    "qnaPairs": $scope.qnaPairs
                };
                homeServices.createNewPair({ "add": add }).then(function (response) {
                    $scope.buttonName = "Done !";
                }, function (error) {
                    return false;
                });
            };
            $scope.publish = function () {
                homeServices.publish().then(function (response) {
                    $scope.buttonName = "Done !";
                }, function (error) {
                    return false;
                });
            };
            $scope.convertHTML = function () {
                $scope.answer_html = $scope.answer.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                $scope.toTrustedHTML = function (html) {
                    return $sce.trustAsHtml(html);
                };
            }   
                
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.data = [];
            $scope.q = '';
            
            $scope.getData = function () {
            return $filter('filter')($scope.listQuestions, $scope.q)
            }
            
            $scope.numberOfPages=function(){
                return Math.ceil($scope.listQuestions.length/$scope.pageSize);                
            }
            
            
}]);
