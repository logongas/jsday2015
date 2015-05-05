
UsuarioDAO.$inject=['$http'];
function UsuarioDAO($http) {
    
    
    this.find=function() {
        
        var config = {
          method: "GET",
          url: "api/usuario/all.json"
        };

        var promise = $http(config);

        return promise;
        
    };
    
    this.get=function(number) {
        
        var config = {
          method: "GET",
          url: "api/usuario/" + number + ".json" 
        };

        var promise = $http(config);

        return promise;
        
    };    
    
}

app.service("usuarioDAO",UsuarioDAO);