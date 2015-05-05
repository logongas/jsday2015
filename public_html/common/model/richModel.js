
RichModel.$inject = ['transformers'];
function RichModel(transformers) {

    this.transform = function (object) {
        applyTransforms(object, transformers);
    };


    function applyTransforms(object, transformers) {
        if (angular.isArray(object)) {
            for (var i = 0; i < object.length; i++) {
                applyTransforms(object[i], transformers);
            }

        } else if ((typeof (object) === "object") && (object !== null)) {

            for (var key in object) {
                if (!object.hasOwnProperty(key)) {
                    continue;
                }
                var value = object[key];
                if (typeof (value) === "object") {
                    applyTransforms(value, transformers);
                }
            }
            objectTransforms(object, transformers);
        }

    }

    function objectTransforms(object, transformers, propertyPath) {
        var className = object['$className'];

        //aplicamos los transformadores globales
        for (var i = 0; i < transformers.global.length; i++) {
            transformers.global[i](object, propertyPath);
        }

        if (className) {
            var entityTransformers = transformers.entity[className];
            if (entityTransformers) {
                for (var i = 0; i < transformers.entity[className].length; i++) {
                    transformers.entity[className][i](object, propertyPath);
                }
            }
        }
    }


}


RichModelProvider.$inject = [];
function RichModelProvider() {

    var transformers = {
        entity: {},
        global: []
    };

    this.addEntityTransformer = function (entityName, transformer) {
        if (!transformers.entity[entityName]) {
            transformers.entity[entityName] = [];
        }

        transformers.entity[entityName].push(transformer);
    };

    this.addGlobalTransformer = function (transformer) {
        transformers.global.push(transformer);
    };

    this.$get = ['$injector', function ($injector) {

            //Ahora hacemos la llamada para generar las funciones reales , estas primeras llamadas solo se hacen una vez
            var realTransformers = {
                entity: {},
                global: []
            };

            for (var i = 0; i < transformers.global.length; i++) {
                var realFn = $injector.invoke(transformers.global[i], undefined);

                realTransformers.global.push(realFn);
            }

            for (var entityName in transformers.entity) {

                realTransformers.entity[entityName] = [];

                for (var i = 0; i < transformers.entity[entityName].length; i++) {
                    var realFn = $injector.invoke(transformers.entity[entityName][i], undefined);

                    realTransformers.entity[entityName].push(realFn);
                }

            }

            var locals = {
                transformers: realTransformers
            };
            return $injector.instantiate(RichModel, locals);
        }];

}

app.provider("richModel", RichModelProvider);