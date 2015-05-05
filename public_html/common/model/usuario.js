app.config(['richModelProvider', function(richModelProvider) {

  richModelProvider.addEntityTransformer('usuario',['departamentoService',function(departamentoService) {

      function getNombreCompleto() {
        return this.nombre + " " + this.ape1 + " " + this.ape2;
      }

      function getNombreDepartamento () {
        return departamentoService.getNombre(this.departamento);
      }

      return function (object) {
        object.getNombreCompleto = getNombreCompleto;
        if (object.tipoUsuario === "PROFESOR") {
          object.getNombreDepartamento = getNombreDepartamento;
        }

        object.fechaNacimiento = new Date(object.fechaNacimiento);
      };
    }]);

}]);