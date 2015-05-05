
Service.$inject=['remoteDAOFactory','entityName'];
function Service(remoteDAOFactory,entityName) {
    var that=this;
    
    that.entityName=entityName;
    that.remoteDAO=remoteDAOFactory.getRemoteDAO(that.entityName);
    
    
    that.find=function() {

        var promise = that.remoteDAO.find();

        return promise;
        
    };
    
    that.get=function(id) {
        
        var promise = that.remoteDAO.get(id);

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