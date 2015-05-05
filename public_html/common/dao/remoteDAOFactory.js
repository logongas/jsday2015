
RemoteDAO.$inject=['$http','entityName'];
function RemoteDAO($http,entityName) {
    var that=this;
    
    that.entityName=entityName;
    
    that.find=function() {
        
        var config = {
          method: "GET",
          url: "api/" + that.entityName + "/all.json"
        };

        var promise = $http(config);

        return promise;
        
    };
    
    that.get=function(id) {
        
        var config = {
          method: "GET",
          url: "api/" + that.entityName + "/" + id + ".json" 
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