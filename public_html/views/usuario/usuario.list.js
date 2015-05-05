
UsuarioListController.$inject=['$scope','serviceFactory'];
function UsuarioListController($scope,serviceFactory) {
    
    $scope.find=function() {
        var promise=serviceFactory.getService("usuario").find();
        promise.then(function(response){
            $scope.usuarios=response.data;
        },function(response) {
            alert("Fallo la petición:" + response.status);
        });
    };

    
    $scope.btnShowAlert=function() {
        serviceFactory.getService("usuario").showAlert();
    }
    
    $scope.find();
    
}

app.controller("UsuarioListController",UsuarioListController);
