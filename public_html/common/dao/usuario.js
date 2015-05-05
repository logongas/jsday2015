
UsuarioRemoteDAO.$inject=['$http'];
function UsuarioRemoteDAO($http) {
    
    
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

app.service("usuarioRemoteDAO",UsuarioRemoteDAO);