app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/usuario/list', {
            templateUrl: 'views/usuario/usuario.list.html'
        });

        $routeProvider.when('/usuario/detail/:id', {
            templateUrl: 'views/usuario/usuario.detail.html'
        });
    }]);
