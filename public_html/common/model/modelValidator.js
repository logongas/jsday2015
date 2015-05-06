ModelValidator.$inject = ['$injector', '$q', '$interpolate'];
function ModelValidator($injector, $q, $interpolate) {

    this.validate = function (domainObject) {
        var deferred = $q.defer();
        var businessMessages;

        if ((domainObject) && (Array.isArray(domainObject.$validators))) {
            for (var i = 0; i < domainObject.$validators.length; i++) {
                var validator = domainObject.$validators[i];
                var businessMessage = executeValidator(domainObject, validator);
                if (businessMessage) {

                    //Solo creamos el array si hay algún mensaje.
                    //Se hace pq si no hay mensajes se debe retornar "undefined"
                    if (!businessMessages) {
                        businessMessages = [];
                    }

                    businessMessages.push(businessMessage);
                }

            }
        }

        if (businessMessages) {
            deferred.reject(businessMessages);
        } else {
            deferred.resolve();
        }


        return deferred.promise;

    };


    function executeValidator(domainObject, validator) {


        var success = $injector.invoke(validator.rule, domainObject);

        if (success === false) {
            var businessMessage = {
                propertyName: getTextFromInterpolateStringOrFunction(validator.propertyName, domainObject),
                message: getTextFromInterpolateStringOrFunction(validator.message, domainObject)
            };

            return businessMessage;
        } else {
            return;
        }

    }

    function getTextFromInterpolateStringOrFunction(stringOrFunction, thisObject) {
        var text;
        if (stringOrFunction) {
            if ((typeof (stringOrFunction) === 'function') || (Array.isArray(stringOrFunction))) {
                text = $injector.invoke(stringOrFunction, thisObject);
            } else if (typeof (stringOrFunction) === 'string') {
                text = $interpolate(stringOrFunction)(thisObject);
            } else {
                throw new Error("El argumento sfn debe ser una función o un String pero es de tipo:" + typeof (stringOrFunction) + " valor:" + stringOrFunction);
            }
        } else {
            //Si no hay nada , no hay texto
            text = "";
        }

        return text;
    }



}



app.service("modelValidator", ModelValidator);