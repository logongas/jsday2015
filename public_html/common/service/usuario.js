
UsuarioService.$inject=['$http'];
function UsuarioService($http) {
    
    
    this.find=function() {
        
        var config = {
          method: "GET",
          url: "/jsday2015/datos/usuarios.json"
        };

        var promise = $http(config);

        return promise;
        
    };
    
    this.get=function(number) {
        
        var config = {
          method: "GET",
          url: "/jsday2015/datos/usuario" + number + ".json" 
        };

        var promise = $http(config);

        return promise;
        
    };    
    
}

app.service("usuarioService",UsuarioService);