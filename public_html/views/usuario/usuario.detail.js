
UsuarioDetailController.$inject=['$scope','$routeParams','serviceFactory'];
function UsuarioDetailController($scope,$routeParams,serviceFactory) {
    
    $scope.id=$routeParams.id;
    
    $scope.get=function(id) {
        
        var promise=serviceFactory.getService("usuario").get(id);
        
        promise.then(function(response){
            $scope.usuario=response.data;
            //$scope.usuario.fechaNacimiento=new Date($scope.usuario.fechaNacimiento);            
        },function(response) {
            alert("Fallo la petición:" + response.status);
        });
        
    };
    
    $scope.get($scope.id);
    
}

app.controller("UsuarioDetailController",UsuarioDetailController);
