class No {
    constructor() {
        this.conteudo = null;
        this.prox = null;
        this.ant = null
    }
}

class LDE {
    constructor(){
        this.cabeca = null;
        this.cauda = null;
        this.nElementos = 0;
}
    vazia(){
        if(this.nElementos == 0){
            return("Lista vazia!")
        }
    }

    tamanho() {
        return this.nElementos;
}
    elemento(pos) {
    if (this.vazia()) {
        return -1;
    }

    if (pos < 1 || pos > this.tamanho()) {
        return -1;
    }

    let aux = this.cabeca;
    let cont = 1;
    
    while(cont<pos){
        aux = aux.prox();
        cont++;
    }
    return aux.conteudo();
}
    posicao(dado) {
    let aux = this.cabeca;
    let cont = 1;
    if(this.vazia()){
        alert("Lista vazia!");
    }
    
    while(this.aux != null){
        if(aux.conteudo() == this.number){
            return this.cont;
        }
        aux = aux.prox();
        cont++;
    }
  }

  insere() {
    if (this.vazia() && parseInt(document.getElementById("posInput").value) !== 1) {
        return false;
    }

    if (parseInt(document.getElementById("posInput").value) <= 0 || parseInt(document.getElementById("posInput").value) > this.nElementos + 1) {
        return false;
    }

    if (parseInt(document.getElementById("posInput").value) === 1) {
        alert("Deu certo1");
        return this.insereInicioLista();
    } else {
        alert("Deu certo2");
        return this.insereMeioLista();
    }
}
  
insereInicioLista(){
    let novoNo = new No();
    let inicio = this.cabeca;
    novoNo.conteudo = parseInt(document.getElementById("numberInput").value);
    novoNo.ant = null;
    novoNo.prox = inicio;
    if(this.vazia()){
         this.cauda = novoNo;
    } else {
        inicio.ant(novoNo);
    }
    inicio = novoNo;
    nElementos++;
}

insereFimLista(){
    let novoNo = new No();
    novoNo.conteudo = parseInt(document.getElementById("numberInput").value);
    let fim = this.cauda;
    novoNo.prox(null);
    fim.prox(novoNo);
    fim = novoNo;
    nElementos++;
}

  


}

