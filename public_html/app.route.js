app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({
                  redirectTo: '/usuario/list'
        });
    }]);