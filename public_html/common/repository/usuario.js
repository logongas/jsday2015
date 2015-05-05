
UsuarioRepository.$inject=['usuarioRemoteDAO'];
function UsuarioRepository(usuarioRemoteDAO) {
    
    
    this.find=function() {

        var promise = usuarioRemoteDAO.find();
        return promise;
        
    };
    
    this.get=function(id) {

        var promise =usuarioRemoteDAO.get(id);
        return promise;
        
    };    
    
}

app.service("usuarioRepository",UsuarioRepository);