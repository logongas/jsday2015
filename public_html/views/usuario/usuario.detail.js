
UsuarioDetailController.$inject=['$scope','$routeParams','usuarioService'];
function UsuarioDetailController($scope,$routeParams,usuarioService) {
    
    $scope.id=$routeParams.id;
    
    $scope.get=function(id) {
        
        var promise=usuarioService.get(id);
        
        promise.then(function(response){
            $scope.usuario=response.data;
            $scope.usuario.fechaNacimiento=new Date($scope.usuario.fechaNacimiento);            
        },function(response) {
            alert("Fallo la petición:" + response.status);
        });
        
    };
    
    $scope.get($scope.id);
    
}

app.controller("UsuarioDetailController",UsuarioDetailController);
