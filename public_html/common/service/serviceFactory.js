
Service.$inject=['repositoryFactory','entityName'];
function Service(repositoryFactory,entityName) {
    
    this.entityName=entityName;
    this.repository=repositoryFactory.getRepository(this.entityName);
    
    
    this.find=function() {

        var promise = this.repository.find();

        return promise;
        
    };
    
    this.get=function(id) {
        
        var promise = this.repository.get(id);

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