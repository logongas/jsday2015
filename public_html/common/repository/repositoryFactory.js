
Repository.$inject=['remoteDAOFactory','entityName'];
function Repository(remoteDAOFactory,entityName) {   
    this.entityName=entityName;
    this.remoteDAO=remoteDAOFactory.getRemoteDAO(that.entityName);
    
    
    this.find=function() {

        var promise = this.remoteDAO.find();

        return promise;
        
    };
    
    this.get=function(id) {
        
        var promise = this.remoteDAO.get(id);

        return promise;
        
    };    
    
}


RepositoryFactory.$inject = ['$injector'];
function RepositoryFactory($injector) {

   var repositories = {
   };

   this.getRepository = function (entityName) {
      if (!repositories[entityName]) {
         var locals = {
            entityName: entityName
         };
         repositories[entityName] = $injector.instantiate(Repository,locals);
      }


      return repositories[entityName];
   };
}

app.service("repositoryFactory",RepositoryFactory);