

function departamentoService() {
    
    this.getNombre=function(id) {
        if (id===3) {
            return "Informatica"
        } else {
            return "Desconocido";
        }
            
    }
    
}

app.service("departamentoService",departamentoService);