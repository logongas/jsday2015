
UsuarioDetailController.$inject=['$scope','$routeParams','serviceFactory'];
function UsuarioDetailController($scope,$routeParams,serviceFactory) {
    
    $scope.id=$routeParams.id;
    
    $scope.get=function(id) {
        
        var promise=serviceFactory.getService("usuario").get(id);
        
        promise.then(function(response){
            $scope.usuario=response.data;          
        },function(response) {
            alert("Fallo la petición:" + response.status);
        });
        
    };
    $scope.btnUpdate=function() {
        $scope.businessMessages=[];
        serviceFactory.getService("usuario").update($scope.id,$scope.usuario).then(function(usuario) {
            alert("El usuario:" + usuario.getNombreCompleto() + " ha sido guardado");
        },function(businessMessages) {
            $scope.businessMessages=businessMessages;
        });
    }    
    
    $scope.get($scope.id);
      
}

app.controller("UsuarioDetailController",UsuarioDetailController);
