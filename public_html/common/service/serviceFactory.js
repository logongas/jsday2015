
Service.$inject=['remoteDAOFactory','entityName'];
function Service(remoteDAOFactory,entityName) {
    
    this.entityName=entityName;
    this.remoteDAO=remoteDAOFactory.getRemoteDAO(this.entityName);
    
    
    this.find=function() {

        var promise = this.remoteDAO.find();

        return promise;
        
    };
    
    this.get=function(id) {
        
        var promise = this.remoteDAO.get(id);

        return promise;
        
    };    
    
}


ServiceFactory.$inject = ['$injector'];
function ServiceFactory($injector) {

   var services = {
   };

   this.getService = function (entityName) {
      if (!services[entityName]) {
         var locals = {
            entityName: entityName
         };
         services[entityName] = $injector.instantiate(Service,locals);
      }


      return services[entityName];
   };
}

app.service("serviceFactory",ServiceFactory);