angular.module('helloWorldApp' )
.controller('ContributeCtrl', [
    '$scope','homeServices','$sce','$window' ,
    function($scope, homeServices, $sce, $window) {
        $scope.question = "";
        $scope.answer = "";
        $scope.answer_html = "";
        $scope.qnaPairs = [{
            answer: '',
            question: ''
        }];
        $scope.buttonName = "Contribute"

        $scope.contribute = function () {
            $scope.buttonName = "Contributing ...";
            $scope.qnaPairs[0].answer = $scope.answer;
            $scope.qnaPairs[0].question = $scope.question;
            var add = {
                "qnaPairs": $scope.qnaPairs
            };
            homeServices.createNewPair({"add": add}).then(function(response){
            $scope.buttonName = "Done !";
            }, function(error){
                return false;
            });
        };
        $scope.publish = function(){
            homeServices.publish().then(function(response){
             $scope.buttonName = "Done !";
             }, function(error){
                 return false;
             });
        };
        $scope.convertHTML = function () {
            $scope.answer_html = $scope.answer.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            $scope.toTrustedHTML = function( html ){
                return $sce.trustAsHtml( html );
        };

      
    }
}
]);
