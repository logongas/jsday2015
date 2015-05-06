app.config(['richModelProvider', function (richModelProvider) {

        richModelProvider.addEntityTransformer('usuario', ['departamentoService', function (departamentoService) {


                var Usuario = {
                    getNombreCompleto: function () {
                        return this.nombre + " " + this.ape1 + " " + this.ape2;
                    },
                    getNombreDepartamento: function () {
                        return departamentoService.getNombre(this.departamento);
                    },
                    $validators: [
                        {
                            propertyName: function () {
                                return "Confirmar Contraseña"
                            },
                            message: 'El valor de "{{password}}" no  es  igual  al de "{{confirmPassword}}"',
                            rule: function () {
                                if (this.password === this.confirmPassword) {
                                    return  true;
                                } else {
                                    return  false;
                                }
                            }
                        }
                    ]
                }

                return function (object) {
                    
                    angular.extend(object, Usuario);
                    object.fechaNacimiento = new Date(object.fechaNacimiento);

                };
            }]);

    }]);