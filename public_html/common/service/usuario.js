
extendUsuarioService.$inject=['service'];
function extendUsuarioService(service) {
    
    service.showAlert=function() {
        alert("Alert del servicio de usuario");
    };
    
}

app.config(['serviceFactoryProvider',function(serviceFactoryProvider){
        serviceFactoryProvider.setExtendService('usuario',extendUsuarioService);
}]);