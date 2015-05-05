
Repository.$inject=['remoteDAOFactory','entityName'];
function Repository(remoteDAOFactory,entityName) {
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