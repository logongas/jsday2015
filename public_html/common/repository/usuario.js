
UsuarioRepository.$inject=['usuarioDAO'];
function UsuarioRepository(usuarioDAO) {
    
    
    this.find=function() {

        var promise = usuarioDAO.find();
        return promise;
        
    };
    
    this.get=function(id) {

        var promise =usuarioDAO.get(id);
        return promise;
        
    };    
    
}

app.service("usuarioRepository",UsuarioRepository);