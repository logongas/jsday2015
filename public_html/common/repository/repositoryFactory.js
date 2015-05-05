
Repository.$inject = ['$q', 'remoteDAOFactory', 'richModel', 'entityName'];
function Repository($q, remoteDAOFactory, richModel, entityName) {
    this.entityName = entityName;
    this.remoteDAO = remoteDAOFactory.getRemoteDAO(this.entityName);


    this.find = function () {

        var deferred = $q.defer();

        this.remoteDAO.find().then(function (data) {
            richModel.extend(data);
            deferred.resolve(data);
        }, function (data) {
            richModel.extend(data);
            deferred.reject(data);
        });

        return deferred.promise;

    };

    this.get = function (id) {
        var deferred = $q.defer();

        this.remoteDAO.get(id).then(function (data) {
            richModel.extend(data);
            deferred.resolve(data);
        }, function (data) {
            richModel.extend(data);
            deferred.reject(data);
        });

        return deferred.promise;
    };

}


RepositoryFactory.$inject = ['$injector', 'extendRepository'];
function RepositoryFactory($injector, extendRepository) {

    var repositories = {
    };

    this.getRepository = function (entityName) {
        if (!repositories[entityName]) {
            var locals = {
                entityName: entityName
            };
            repositories[entityName] = $injector.instantiate(Repository, locals);
        }

        if (extendRepository[entityName]) {
            var locals = {
                repository: repositories[entityName]
            };

            $injector.invoke(extendRepository[entityName], undefined, locals);
        }


        return repositories[entityName];
    };
}

RepositoryFactoryProvider.$inject = ['$injector'];
function RepositoryFactoryProvider() {
    var extendRepository = {
    };

    this.setExtendRepository = function (entityName, fn) {
        extendRepository[entityName] = fn;
    };

    this.$get = ['$injector', function ($injector) {
            var locals = {
                extendRepository: extendRepository
            };
            return $injector.instantiate(RepositoryFactory, locals);
        }];

}


app.provider("repositoryFactory", RepositoryFactoryProvider);