
RemoteDAO.$inject = ['$http', '$q', 'entityName'];
function RemoteDAO($http, $q, entityName) {

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
    this.update = function (id, entity) {
        alert("Guardando datos\nRealmente no se guardan porque esto es un ejemplo sin API en el servidor");
        return $q.when(entity);
    };
}


RemoteDAOFactory.$inject = ['$injector','extendRemoteDAO'];
function RemoteDAOFactory($injector,extendRemoteDAO) {

    var remoteDAOs = {
    };

    this.getRemoteDAO = function (entityName) {
        if (!remoteDAOs[entityName]) {
            var locals = {
                entityName: entityName
            };
         remoteDAOs[entityName] = $injector.instantiate(RemoteDAO,locals);

            if (extendRemoteDAO[entityName]) {
                var locals = {
                    remoteDAO: remoteDAOs[entityName]
                };

                $injector.invoke(extendRemoteDAO[entityName], undefined, locals);
            }

        }


        return remoteDAOs[entityName];
    };
}

RemoteDAOFactoryProvider.$inject = ['$injector'];
function RemoteDAOFactoryProvider() {
    var extendRemoteDAO = {
    };

    this.setExtendRemoteDAO = function (entityName, fn) {
        extendRemoteDAO[entityName] = fn;
    };

    this.$get = ['$injector', function ($injector) {
            var locals = {
                extendRemoteDAO: extendRemoteDAO
            };
            return $injector.instantiate(RemoteDAOFactory, locals);
        }];

}


app.provider("remoteDAOFactory",RemoteDAOFactoryProvider);
