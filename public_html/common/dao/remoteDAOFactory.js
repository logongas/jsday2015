
RemoteDAO.$inject=['$http','entityName'];
function RemoteDAO($http,entityName) {
    
    this.entityName=entityName;
    
    this.find=function() {
        
        var config = {
          method: "GET",
          url: "api/" + this.entityName + "/all.json"
        };

        var promise = $http(config);

        return promise;
        
    };
    
    this.get=function(id) {
        
        var config = {
          method: "GET",
          url: "api/" + this.entityName + "/" + id + ".json" 
        };

        var promise = $http(config);

        return promise;
        
    };    
    
}


RemoteDAOFactory.$inject = ['$injector'];
function RemoteDAOFactory($injector) {

   var remoteDAOs = {
   };

   this.getRemoteDAO = function (entityName) {
      if (!remoteDAOs[entityName]) {
         var locals = {
            entityName: entityName
         };
         remoteDAOs[entityName] = $injector.instantiate(RemoteDAO,locals);
      }


      return remoteDAOs[entityName];
   };
}

app.service("remoteDAOFactory",RemoteDAOFactory);