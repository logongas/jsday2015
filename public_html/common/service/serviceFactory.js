
Service.$inject = ['repositoryFactory', 'entityName'];
function Service(repositoryFactory, entityName) {

    this.entityName = entityName;
    this.repository = repositoryFactory.getRepository(this.entityName);


    this.find = function () {

        var promise = this.repository.find();

        return promise;

    };

    this.get = function (id) {

        var promise = this.repository.get(id);

        return promise;

    };

}


ServiceFactory.$inject = ['$injector', 'extendService'];
function ServiceFactory($injector, extendService) {

    var services = {
    };

    this.getService = function (entityName) {
        if (!services[entityName]) {
            var locals = {
                entityName: entityName
            };
            services[entityName] = $injector.instantiate(Service, locals);
        }

        if (extendService[entityName]) {
            var locals = {
                service: services[entityName]
            };

            $injector.invoke(extendService[entityName], undefined, locals);
        }


        return services[entityName];
    };
}

ServiceFactoryProvider.$inject = ['$injector'];
function ServiceFactoryProvider() {
    var extendService = {
    };

    this.setExtendService = function (entityName, fn) {
        extendService[entityName] = fn;
    };

    this.$get = ['$injector', function ($injector) {
            var locals = {
                extendService: extendService
            };
            return $injector.instantiate(ServiceFactory, locals);
        }];

}


app.provider("serviceFactory", ServiceFactoryProvider);