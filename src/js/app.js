angular.module('helloWorldApp', [
    'ngRoute','apiHelper'
])
.config([
    '$routeProvider',
    function($routeProvider, apiHelper) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/contribute', {
                templateUrl: 'views/contribute.html',
                controller: 'ContributeCtrl',
            })
            .when('/questions',{
                templateUrl: 'views/questions.html',
                controller: 'ContributeCtrl',
            });
    }
])
.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});

