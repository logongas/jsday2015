
UsuarioService.$inject=['$http'];
function UsuarioService($http) {
    
    
    this.find=function() {
        
        var config = {
          method: "GET",
          url: "api/usuario/all.json"
        };

        var promise = $http(config);

        return promise;
        
    };
    
    this.get=function(id) {
        
        var config = {
          method: "GET",
          url: "api/usuario/" + id + ".json" 
        };

        var promise = $http(config);

        return promise;
        
    };    
    
}

app.service("usuarioService",UsuarioService);