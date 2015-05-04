
UsuarioListController.$inject=['$scope','usuarioService'];
function UsuarioListController($scope,usuarioService) {
    
    $scope.find=function() {
        var promise=usuarioService.find();
        promise.then(function(response){
            $scope.usuarios=response.data;
        },function(response) {
            alert("Fallo la petición:" + response.status);
        });
    };

    
    $scope.find();
    
}

app.controller("UsuarioListController",UsuarioListController);
