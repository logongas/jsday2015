
UsuarioService.$inject=['usuarioRepository'];
function UsuarioService(usuarioRepository) {
    
    
    this.find=function() {

        var promise = usuarioRepository.find();
        return promise;
        
    };
    
    this.get=function(id) {

        var promise =usuarioRepository.get(id);
        return promise;
        
    };    
    
}

app.service("usuarioService",UsuarioService);